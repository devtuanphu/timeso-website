import { Button, Card, Col, Form, Input, Radio, Row, Select, Space } from 'antd';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { SEO } from '@components/seo';
import { Axios, AxiosSubmitForm } from '@shared/modules/axios';
import { SubmitButton } from '@components/button/submit';

type AnswersProp = {
  answerType: string;
  answers: {
    id: string | number;
    label: string;
    value: string | number;
  }[];
  placeholder: string;
};

const Answers = ({ answerType, answers, placeholder, ...props }: AnswersProp) => {
  switch (answerType) {
    case 'radio':
      return (
        <Radio.Group {...props} size='large'>
          <Space direction='vertical' size={34}>
            {answers.map((answer) => (
              <Radio key={answer.value} value={answer.value}>
                <span className='answer'>{answer.label}</span>
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      );
    case 'select':
      return (
        <Select
          {...props}
          className='sh-select'
          size='large'
          showSearch
          placeholder={placeholder}
          optionFilterProp='children'
          popupClassName='Page-StaffHiring-dropdown'
          filterOption={(input, option) => ((option?.label as string) ?? '').toLowerCase().includes(input.toLowerCase())}
          options={answers}
        />
      );
    case 'textarea':
      return (
        <Input.TextArea
          {...props}
          className='sh-textarea'
          size='large'
          placeholder={placeholder}
          autoSize={{
            minRows: 3,
            maxRows: 6,
          }}
          rows={3}
        />
      );
    default:
      return null;
  }
};

const StaffHiringPage = (props: PropType) => {
  const { roleQuestion, levelQuestion, ...staffHiring } = props.response.data.attributes;
  const staffRates = props.staffRateResponse.data;

  const router = useRouter();
  const [form] = Form.useForm();
  const roleId = Form.useWatch(roleQuestion.key, form);

  const [levels, setLevels] = useState([]);

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsverified] = useState<boolean>(false);
  const [recaptchaScale, setRecaptchaScale] = useState('1');

  useEffect(() => {
    const scaleRecaptcha = () => {
      setRecaptchaScale(Math.min(window.innerWidth / 470, 1).toFixed(2));
    };
    window.addEventListener('resize', () => {
      setRecaptchaScale(Math.min(window.innerWidth / 470, 1).toFixed(2));
    });
    return () => {
      window.removeEventListener('resize', scaleRecaptcha);
    };
  }, []);

  useEffect(() => {
    form.setFieldValue(levelQuestion.key, null);
    setLevels(
      roleId
        ? staffRates
            .find((staffRate) => staffRate.id === roleId)
            ?.attributes?.hourlyRate?.map((rate) => ({
              value: rate.id,
              label: `${rate.title} (${rate.yearsOfExperience})`,
            }))
        : levelQuestion.answers
    );
  }, [roleId, staffRates, levelQuestion, form]);

  const onFinish = async (values) => {
    const result = await AxiosSubmitForm('staff-hirings', { data: values });
    if (result.data) {
      router.push(
        {
          pathname: `/staff-hiring/result/${result.data.uid}`,
          query: { ...result.data },
        },
        `/staff-hiring/result/${result.data.uid}`
      );
    }
  };

  const handleCaptchaSubmission = async (token: string | null) => {
    try {
      const res = await AxiosSubmitForm(`quick-quotes/verifyCaptcha`, { token });
      if (res) {
        setIsverified(true);
      } else {
        setIsverified(false);
      }
    } catch (err) {
      throw err;
    }
  };

  const backgroundImage = staffHiring.bgObj?.image?.data?.attributes?.url
    ? `url(${process.env.NEXT_PUBLIC_STRAPI_URL}${staffHiring.bgObj?.image?.data?.attributes?.url})`
    : undefined;

  const sitekey = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY;

  return (
    <>
      <SEO title={staffHiring.seo.title} description={staffHiring.seo.description} />
      <Row
        className='Page-StaffHiring'
        justify='center'
        style={{
          backgroundColor: staffHiring?.bgObj?.color || '#20d3e7',
          backgroundImage,
        }}
      >
        <Col xs={24} sm={24} md={20} lg={18} xl={14}>
          <Row className='sh-banner'>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <h1 className='sh-title'>{staffHiring.title}</h1>
              <p className='sh-description'>{staffHiring.description}</p>
            </Col>
          </Row>
          <Card className='sh-card'>
            <Form className='sh-form' layout='vertical' requiredMark={false} form={form} onFinish={onFinish}>
              <Row className='questions' gutter={24}>
                <Col span={24}>
                  <div className='sh-qna'>
                    <p className='sh-question'>1. {roleQuestion.question}</p>
                    <Form.Item
                      name={roleQuestion.key}
                      rules={[
                        {
                          required: roleQuestion.isRequired,
                          message: roleQuestion.requireMessage,
                        },
                      ]}
                    >
                      <Answers
                        answerType={roleQuestion.answerType}
                        answers={staffRates.map((staffRate) => ({
                          id: staffRate.id,
                          value: staffRate.id,
                          label: staffRate.attributes.role,
                        }))}
                        placeholder={roleQuestion.placeholder}
                      />
                    </Form.Item>
                  </div>
                  <div className='sh-qna'>
                    <p className='sh-question'>2. {levelQuestion.question}</p>
                    <Form.Item
                      name={levelQuestion.key}
                      rules={[
                        {
                          required: levelQuestion.isRequired,
                          message: levelQuestion.requireMessage,
                        },
                      ]}
                    >
                      <Answers answerType={levelQuestion.answerType} answers={levels} placeholder={levelQuestion.placeholder} />
                    </Form.Item>
                  </div>
                  {staffHiring.otherQuestions.map((question, idx) => (
                    <div key={question.id} className='sh-qna'>
                      <p className='sh-question'>
                        {idx + 3}. {question.question}
                      </p>
                      {question.note && <p className='sh-note'>{question.note}</p>}
                      <Form.Item
                        name={question.key}
                        rules={[
                          {
                            required: question.isRequired,
                            message: question.requireMessage,
                          },
                        ]}
                      >
                        <Answers answerType={question.answerType} answers={question.answers} placeholder={question.placeholder} />
                      </Form.Item>
                    </div>
                  ))}
                </Col>
              </Row>
              <Row className='informations' gutter={24}>
                {staffHiring.informations.map((information) => (
                  <Col xs={24} xl={12} key={information.key}>
                    <Form.Item
                      name={information.key}
                      label={information.label}
                      rules={[
                        {
                          required: information.isRequired,
                          message: information.requireMessage,
                        },
                      ]}
                    >
                      <Input autoComplete='off' placeholder={information.placeholder} />
                    </Form.Item>
                  </Col>
                ))}
              </Row>
              <Row justify={'space-between'}>
                <Col>
                  <div className='qq-recaptcha' style={{ scale: recaptchaScale }}>
                    <ReCAPTCHA sitekey={sitekey} ref={recaptchaRef} onChange={handleCaptchaSubmission} />
                  </div>
                </Col>
                <Col>
                  <SubmitButton text={staffHiring.submitButtonText} form={form} isVerified={isVerified} />
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default StaffHiringPage;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const response = await Axios(
    'staff-hiring-form',
    'populate=seo,background,informations,roleQuestion,levelQuestion.answers,otherQuestions.answers,bgObj.image',
    locale
  );
  const staffRateResponse = await Axios('staff-rates', '', locale);
  return {
    props: {
      response,
      staffRateResponse,
    },
  };
};

type PropType = {
  response: any;
  staffRateResponse: any;
};
