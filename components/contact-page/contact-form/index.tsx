import { Col, Form, Input, Radio, Row, Slider } from 'antd';
import { useEffect, useState } from 'react';

import { Button } from '@components/button';
import { NotificationPlacement, openNotification } from '@components/nofitication';
import { AxiosSubmitForm } from '@shared/modules/axios';
import { handleOnBlur, handleOnChange, handleOnFocus } from '@shared/modules/form';

type ICurrency = 'VNĐ' | 'USD' | 'KRW';

interface IForm {
  demand: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  content: string;
  slider: [number, number];
  currency: ICurrency;
}

const ContactForm = (props: any) => {
  const { contactForm, contactFormNoCMS } = props;
  const htmlFor = 'htmlFor_form_contact';
  const [loading, setLoading] = useState<boolean>(false);
  const [currency, setCurrency] = useState<ICurrency>('USD');
  const [rangeVal, setRangeVal] = useState<[number, number]>([contactForm.minBudget, contactForm.defaultBudget]);
  const [form] = Form.useForm();

  const formatter = (value: any) => {
    if (value === contactForm.maxBudget) {
      return `${value?.toLocaleString('de-DE')} ${currency} +`;
    }
    return `${value?.toLocaleString('de-DE')} ${currency}`;
  };

  const [disabledSave, setDisabledSave] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, []);

  const onFinish = async (values: IForm) => {
    const data = {
      message: contactFormNoCMS.message.title,
      description: contactFormNoCMS.message.description,
      placement: 'bottomRight' as NotificationPlacement,
    };
    const dataWarning = {
      message: contactFormNoCMS.message.title_warning,
      description: contactFormNoCMS.message.description_warning,
      placement: 'bottomRight' as NotificationPlacement,
    };

    const dataError = {
      message: contactFormNoCMS.message.title_error,
      description: contactFormNoCMS.message.description_error,
      placement: 'bottomRight' as NotificationPlacement,
    };

    const rawData = {
      data: {
        ...values,
        currency: 'USD',
        minBudget: values.slider[0],
        maxBudget: values.slider[1],
      },
    };

    const response = await AxiosSubmitForm('customer-contacts', rawData);
    const result = await response;
    if (result.data) {
      openNotification(data, 'success');
      setFormDefaults();
    } else {
      openNotification(dataError, 'error');
    }
  };

  const setFormDefaults = () => {
    form.setFieldValue(['demand'], '');
    form.setFieldValue(['name'], '');
    form.setFieldValue(['phone'], '');
    form.setFieldValue(['email'], '');
    form.setFieldValue(['company'], '');
    form.setFieldValue(['content'], '');
    document
      .querySelectorAll('.contactForm-form-item > .ant-form-item-row > .ant-form-item-label')
      .forEach((item) => item?.classList.remove('active'));
  };

  const onFinishFailed = (errorInfo: any) => {};

  const onChangeSlider = (values: [number, number]) => {
    setRangeVal(values);
  };

  const handleFormChange = () => {
    const hasErrors =
      form.getFieldsError().some(({ errors }) => errors.length) ||
      !form.isFieldsTouched(['demand', 'name', 'phone', 'email', 'company'], true);
    setDisabledSave(hasErrors);
  };

  return (
    <div className='contactForm'>
      <div className='container'>
        <Row gutter={24}>
          <Col lg={{ span: 16, offset: 4 }} md={{ span: 22, offset: 1 }} xs={{ span: 24, offset: 0 }}>
            {contactForm.formFields?.length > 0 && (
              <Form
                form={form}
                name={htmlFor}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onFieldsChange={handleFormChange}
                autoComplete='off'
                className='contactForm-form'
                initialValues={{
                  demand: '',
                  name: '',
                  phone: '',
                  email: '',
                  company: '',
                  content: '',
                  slider: rangeVal,
                }}
              >
                <Row gutter={24}>
                  <Col span={24}>
                    <p className='contactForm-form-title'>{contactForm.formTitle}</p>
                    <p className='contactForm-form-subtitle'>{contactForm.formSubtitle}</p>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name='demand'
                      rules={[{ required: true, message: contactFormNoCMS?.demand?.message || '' }]}
                      className='contactForm-form-item contactForm-form-groupBtn'
                    >
                      <Radio.Group>
                        {contactForm.formFields &&
                          contactForm.workingFields.map((item: any, index: number) => (
                            <Radio.Button value={item} className='contactForm-form-radioBtn' key={index}>
                              {item}
                            </Radio.Button>
                          ))}
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col sm={15} xs={24}>
                    {contactForm.formFields[0].key && (
                      <Form.Item
                        name={contactForm.formFields[0].key}
                        label={contactForm.formFields[0].label}
                        rules={[{ required: true, message: contactFormNoCMS?.form?.name?.messageRequired || '' }]}
                        className='contactForm-form-item'
                      >
                        <Input onFocus={handleOnFocus} onBlur={handleOnBlur} autoComplete='off' onChange={handleOnChange} />
                      </Form.Item>
                    )}
                  </Col>
                  <Col sm={9} xs={24}>
                    {contactForm.formFields[1].key && (
                      <Form.Item
                        name={contactForm.formFields[1].key}
                        label={contactForm.formFields[1].label}
                        rules={[
                          {
                            type: 'string',
                            message: contactFormNoCMS?.form?.phoneNumber?.messageError || '',
                            pattern: new RegExp(/^(\+|0)(?:[1-9] ?){6,14}[0-9]$/),
                          }, ///^\+(?:[0-9] ?){6,14}[0-9]$/
                          { required: true, message: contactFormNoCMS?.form?.phoneNumber?.messageRequired || '' },
                        ]}
                        className='contactForm-form-item'
                      >
                        <Input onFocus={handleOnFocus} onBlur={handleOnBlur} autoComplete='off' onChange={handleOnChange} />
                      </Form.Item>
                    )}
                  </Col>
                  <Col span={24}>
                    {contactForm.formFields[2].key && (
                      <Form.Item
                        name={contactForm.formFields[2].key}
                        label={contactForm.formFields[2].label}
                        rules={[
                          {
                            type: 'email',
                            message: contactFormNoCMS?.form?.email?.messageError || '',
                          },
                          { required: true, message: contactFormNoCMS?.form?.email?.messageRequired || '' },
                        ]}
                        className='contactForm-form-item'
                      >
                        <Input onFocus={handleOnFocus} onBlur={handleOnBlur} autoComplete='off' onChange={handleOnChange} />
                      </Form.Item>
                    )}
                  </Col>
                  <Col span={24}>
                    {contactForm.formFields[3].key && (
                      <Form.Item
                        name={contactForm.formFields[3].key}
                        label={contactForm.formFields[3].label}
                        rules={[
                          {
                            required: true,
                            type: 'string',
                            message: contactFormNoCMS?.form?.company?.messageRequired || '',
                          },
                        ]}
                        className='contactForm-form-item'
                      >
                        <Input onFocus={handleOnFocus} onBlur={handleOnBlur} autoComplete='off' onChange={handleOnChange} />
                      </Form.Item>
                    )}
                  </Col>
                  <Col span={24}>
                    {contactForm.formFields[4].key && (
                      <Form.Item
                        name={contactForm.formFields[4].key}
                        label={contactForm.formFields[4].label}
                        className='contactForm-form-item'
                      >
                        <Input.TextArea
                          onFocus={handleOnFocus}
                          onBlur={handleOnBlur}
                          autoSize={false}
                          style={{ minHeight: 176 }}
                          autoComplete='off'
                          onChange={handleOnChange}
                        />
                      </Form.Item>
                    )}
                  </Col>
                  <Col span={24}>
                    <Form.Item name='slider' label={contactFormNoCMS?.form?.budget?.label} className='contactForm-form-slider'>
                      <Slider
                        range
                        min={0}
                        max={contactForm?.maxBudget}
                        step={1000}
                        tooltip={{
                          open: loading ? true : false,
                          formatter,
                          getPopupContainer: (triggerNode: HTMLElement) => {
                            return triggerNode.parentNode as HTMLElement;
                          },
                        }}
                        onChange={onChangeSlider}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <div className='contactForm-form-slider-range'>
                      <span>0 {currency}</span>
                      <span>
                        {contactForm?.maxBudget?.toLocaleString('de-DE')} {currency} +
                      </span>
                    </div>
                  </Col>
                  <Col span={24}>
                    <Form.Item className='contactForm-form-item contactForm-form-submit '>
                      <Button
                        type='primary'
                        size='large'
                        htmlType='submit'
                        className='contactForm-form-button'
                        disabled={disabledSave}
                      >
                        {/** !form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length > 0 */}
                        {contactFormNoCMS?.button}
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export { ContactForm };
