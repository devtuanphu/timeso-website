import { BannerQQ } from '@components/quick-quotes/banner';
import FeedbackQQ from '@components/quick-quotes/feedback';
import { SEO } from '@components/seo';
import { Axios, AxiosSubmitForm } from '@shared/modules/axios';
import { Button, Card, Col, ConfigProvider, Form, Input, Radio, Row, Select, Space } from 'antd';
import type { GetServerSideProps } from 'next';
import type { FormInstance } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Slider from 'react-slick';
import Link from 'next/link';
import Snow from "@assets/quick-quotes/snowflakes.png";
import Arrow from "@assets/quick-quotes/arrow-right.png";
import { ThemeContext } from '@pages/_app';
import QQSnowing from '@components/quick-quotes/snowing';

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
          popupClassName='Page-QuickQuotes-dropdown'
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
            minRows: 6,
            maxRows: 12,
          }}
          rows={6}
        />
      );
    case 'text':
    case 'email':
      return <Input {...props} autoComplete='off' type={answerType} placeholder={placeholder} />;
    default:
      return null;
  }
};

const SubmitButton = ({ text, form, isVerified }: { text: string; form: FormInstance; isVerified: boolean }) => {
  const [submittable, setSubmittable] = useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        if (isVerified) {
          setSubmittable(true);
        } else {
          setSubmittable(false);
        }
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values, isVerified, form]);

  return (
    <Button
      type='primary'
      htmlType='submit'
      className={`sh-button qq-button qq-chrismas-btn btn-submit ${!submittable ? 'ant-btn-disabled' : ''}`}
      disabled={!submittable}
    >
      {text}
    </Button>
  );
};

const sitekey = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY;

const QuickQuotesPage = (props: PropType) => {
  const { questions, testimonials, toolAISupport, resultQuote, ...quote } = props.response.data.attributes;
  const { data: customers } = props.customers;
  const locale = props.locale;

  const router = useRouter();
  const [form] = Form.useForm();

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsverified] = useState<boolean>(false);
  const [recaptchaScale, setRecaptchaScale] = useState('1');

  const feedbackRef = useRef<HTMLDivElement>(null);

  const scrollFeedbacks = (next: boolean) => {
    if (feedbackRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = feedbackRef.current;
      const oneBlock = 380;
      const totalBlock = testimonials.feedbacks.data.length;
      const isLeftMost = scrollLeft <= oneBlock;
      const isRightMost = scrollLeft + clientWidth >= scrollWidth - oneBlock;

      if (isLeftMost) {
        feedbackRef.current.scrollBy({
          top: 0,
          left: totalBlock * oneBlock,
          behavior: 'instant',
        });
      } else if (isRightMost) {
        feedbackRef.current.scrollBy({
          top: 0,
          left: -(totalBlock * oneBlock),
          behavior: 'instant',
        });
      }

      feedbackRef.current.scrollBy({
        top: 0,
        left: next ? oneBlock : -oneBlock,
        behavior: 'smooth',
      });
    }
  };

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
    if (feedbackRef.current) {
      feedbackRef.current.scrollTo({
        top: 0,
        left: testimonials.feedbacks.data.length * 380,
        behavior: 'instant',
      });
    }
  }, [testimonials.feedbacks.data.length]);

  let scrollTimer = setInterval(() => {
    scrollFeedbacks(true);
  }, 4000);
  const handleLeaveFeedback = () => {
    scrollTimer = setInterval(() => {
      scrollFeedbacks(true);
    }, 4000);
  };

  const handleEnterFeedback = () => {
    clearInterval(scrollTimer);
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

  const onFinish = async (values) => {
    const result = await AxiosSubmitForm('quick-quotes', { data: values });
    if (result.data) {
      router.push(
        {
          pathname: `/quick-quotes/result`,
          query: { ...result.data },
        },
        `/quick-quotes/result`
      );
    }
  };

  const backgroundImage = quote.bgObj?.image?.data?.attributes?.url
    ? `url(${process.env.NEXT_PUBLIC_STRAPI_URL}${quote.bgObj?.image?.data?.attributes?.url})`
    : undefined;

  const theme = useContext(ThemeContext);

  return (
    <>
      <SEO title={quote.seo.title} description={quote.seo.description} />
      <div className='qq-chrismas'>
        <QQSnowing theme={theme} />
        <BannerQQ
          class='career qq-banner'
          bg={`${process.env.NEXT_PUBLIC_STRAPI_URL}${quote.background?.data?.attributes?.url}`}
          title={quote.title}
          content={quote.description}
          locale={locale}
        />
        <Row
          className='Page-QuickQuotes'
          justify='center'
          style={{
            backgroundColor: quote?.bgObj?.color || '#20d3e7',
            backgroundImage,
          }}
        >
          <Col xs={20} sm={20} md={15} lg={14} xl={10} className='qq-card-col'>
            <Card className='sh-card qq-card'>
              <Form className='sh-form' layout='vertical' name='validateOnly' requiredMark={true} form={form} onFinish={onFinish}>
                <Row className='informations qq-form' gutter={24}>
                  <Col span={24}>
                    <h5 className='sh-title qq-title qq-chrismas-text18 qq-chrismas-linearGreen'>{quote.formTitle}</h5>
                    <br />
                  </Col>
                  {questions.map((question) => (
                    <Col xs={24} md={question.key == 'requirement' ? 24 : 12} key={question.key}>
                      <Form.Item
                        className='qq-form-item'
                        name={question.key}
                        label={question.question}
                        rules={[
                          {
                            required: question.isRequired,
                            message: question.requireMessage,
                          },
                        ]}
                      >
                        <Answers answerType={question.answerType} answers={question.answers} placeholder={question.placeholder} />
                      </Form.Item>
                    </Col>
                  ))}
                  <Col span={24}>
                    <div className='qq-form-note qq-chrismas-formNote qq-chrismas-linearGreen'>
                      <i>{quote.formNote}</i>
                    </div>
                  </Col>
                </Row>
                <Row align='middle' className='qq-button-row' gutter={[0, 12]}>
                  <Col>
                    <div className='qq-recaptcha' style={{ scale: recaptchaScale }}>
                      <ReCAPTCHA sitekey={sitekey} ref={recaptchaRef} onChange={handleCaptchaSubmission} />
                    </div>
                  </Col>
                  <Col>
                    <SubmitButton text={quote.submitButtonText} form={form} isVerified={isVerified} />
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
          <Col xs={24} sm={0} className='qq-results-col'>
            <div className='qq-results mobile'>
              <div className='qq-results-item'>
                <h3 className='qq-results-item1'>{quote.totalResults}+</h3>
                <p>{resultQuote.title1}</p>
              </div>
              <div className='qq-results-item'>
                <h3 className='qq-results-item2'>{resultQuote.quoteToday}+</h3>
                <p>{resultQuote.title2}</p>
              </div>
            </div>
          </Col>
          <Col xs={20} sm={20} md={8} lg={7} xl={5}>
            <h5 className='qq-text-center qq-chrismas-text18 qq-chrismas-linearGreen'>{toolAISupport.title}</h5>
            <div className='qq-ai-container'>
              {toolAISupport.toolAI?.map((tool) => (
                <div key={tool.id} className='qq-ai-item'>
                  <h6>{tool.title}</h6>
                  <div className='qq-ai'>
                    <Image
                      className='qq-ai-img'
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${tool.icon?.data?.attributes.url}`}
                      width={56}
                      height={56}
                      alt={tool.subTitle}
                    />
                    <p>{tool.subTitle}</p>
                    <Link prefetch={false} href={tool?.buttonUrl || ''} target='_blank'>
                      <Button type='primary' size='large' className='btn-border qq-chrismas-aibtn'>
                        <>
                        {tool?.buttonText || 'Read more'}
                        <Image src={Arrow} alt="arrow" height={19} width={19} />
                        </>
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Col>
          <Col xs={24} sm={22} md={18} lg={14} xl={3} className='qq-customers-carousel'>
            <h5 className='qq-text-center qq-chrismas-text18 qq-chrismas-linearGreen'>{quote.customerTitle}</h5>
            <Slider {...sliderSettings} className='qq-carousel'>
              {customers?.map(
                (img) =>
                  img?.attributes.logo?.data?.attributes && (
                    <div className='qq-customer' key={img?.attributes.logo?.data.id}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${img.attributes.logo.data.attributes.url}`}
                        width={160}
                        height={80}
                        alt={img.attributes.name}
                        quality={100}
                        style={{
                          width: 'auto',
                          maxWidth: '100%',
                          height: 'auto',
                          maxHeight: '100px',
                          margin: 'auto',
                        }}
                      />
                    </div>
                  )
              )}
            </Slider>
          </Col>
          <Col xs={0} sm={24} className='qq-results-col'>
            <div className='qq-results'>
              <div className='qq-results-item'>
                <h3 className='qq-results-item1'>{quote.totalResults}+</h3>
                <p>{resultQuote.title1}</p>
              </div>
              <div className='qq-results-item'>
                <h3 className='qq-results-item2'>{resultQuote.quoteToday}+</h3>
                <p>{resultQuote.title2}</p>
              </div>
            </div>
          </Col>
          <Col xs={20} sm={20} md={20} lg={20} xl={18} className='qq-testimonials-col'>
            <div>
              <h5 className='qq-chrismas-linearGreen qq-chrismas-text18'>{testimonials.title}</h5>
            </div>
            <div className='qq-testimonials'>
              <Slider {...feedbackSettings}>
                {testimonials.feedbacks.data.map((feedback) => (
                  <FeedbackQQ
                    key={feedback.id}
                    avatar={feedback.attributes.avatar?.data}
                    name={feedback.attributes.name}
                    title={feedback.attributes.title}
                    rate={feedback.attributes.rate}
                    feedback={feedback.attributes.feedback}
                    maxLength={testimonials?.descLength || 195}
                    readMore={testimonials?.readMore || 'Read more'}
                  />
                ))}
              </Slider>
            </div>
          </Col>
        </Row>
      </div>
      <Row></Row>
    </>
  );
};

export default QuickQuotesPage;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const response = await Axios(
    'quick-quotes-form',
    'populate=seo,background,bgObj.image,questions,testimonials.feedbacks.avatar,toolAISupport.toolAI.icon,resultQuote',
    locale
  );

  const customers = await Axios('customers', 'populate=*', locale);

  return {
    props: {
      response,
      customers,
      locale
    },
  };
};

type PropType = {
  response: any;
  customers: any;
  locale: string
};

const sliderSettings = {
  dots: false,
  arrows: false,
  infinite: true,
  draggable: false,
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  vertical: true,
  verticalSwiping: true,
  responsive: [
    {
      breakpoint: 2560,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: false,
        verticalSwiping: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 2,
        vertical: false,
        verticalSwiping: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: false,
        verticalSwiping: false,
      },
    },
  ],
};

const feedbackSettings = {
  dots: false,
  arrows: true,
  infinite: true,
  draggable: false,
  autoplay: false,
  autoplaySpeed: 2000,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 2560,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
