import { ArrowUpOutlined } from '@ant-design/icons';
import { Col, Form, Input, Row } from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { Button } from '@components/button';
import IconPDF from '@components/icon/pdf';
import IconTrash from '@components/icon/trash';
import IconWord from '@components/icon/word';
import { NotificationPlacement, openNotification } from '@components/nofitication';
import { AxiosSubmitFile, AxiosSubmitForm } from '@shared/modules/axios';
import { handleOnBlur, handleOnChange, handleOnFocus } from '@shared/modules/form';

interface IForm {
  name: string;
  phone: string;
  email: string;
  content: string;
  upload?: string;
}

const CareerApplication = (props: any) => {
  const { application, id, title } = props;
  const htmlFor = 'htmlFor_form_career';
  const [uploadFile, setUploadFile] = useState<any>();
  const [disabledSave, setDisabledSave] = useState(true);
  const [errorUploadFile, setErrorUploadFile] = useState('');
  const [isTypePDF, setIsTypePDF] = useState(false);

  const [form] = Form.useForm();

  const onSubmitFile = (file: any) => {
    return new Promise((resolve, reject) => {
      const response = AxiosSubmitFile(file);
      if (response) {
        resolve(response);
      } else {
        reject(response);
      }
    });
  };

  const onFinish = async (values: IForm) => {
    const data = {
      message: application?.notification?.title,
      description: application?.notification?.message,
      placement: 'bottomRight' as NotificationPlacement,
    };

    const formData = new FormData();
    formData.append('files', uploadFile);
    const rsFile: any = await onSubmitFile(formData);
    delete values['upload'];
    const dataForm = {
      data: {
        ...values,
        title: title,
        cv: rsFile[0]?.id,
        job: id,
      },
    };
    const response = AxiosSubmitForm('job-applicants', dataForm);
    const result = await response;
    if (result.data) {
      openNotification(data, 'success');
      setFormDefaults();
    } else {
      openNotification(
        {
          message: 'Submit fail',
          description: result.error.message,
          placement: 'bottomRight' as NotificationPlacement,
        },
        'error'
      );
    }
  };

  const setFormDefaults = () => {
    form.setFieldValue(['name'], '');
    form.setFieldValue(['phone'], '');
    form.setFieldValue(['email'], '');
    form.setFieldValue(['content'], '');
    setUploadFile(null);
    form.resetFields(['upload']);
    setDisabledSave(true);
  };

  const onFinishFailed = (errorInfo: any) => {};

  const handleFormChange = () => {
    const dataErrors =
      !form.isFieldsTouched(['name', 'phone', 'email', 'upload'], true) ||
      form.getFieldsError().filter(({ errors }) => errors.length).length > 0;
    setDisabledSave(dataErrors);
  };

  const handleUploadFile = (e: any) => {
    if (e.target.files[0]) {
      const type = e.target.files[0].name.split('.')[e.target.files[0].name.split('.').length - 1]?.toUpperCase();
      setErrorUploadFile('');
      setUploadFile(e.target.files[0]);
      if (type === 'PDF') {
        setIsTypePDF(true);
      } else {
        setIsTypePDF(false);
      }
    }
  };

  const handleRemoveUpload = () => {
    setUploadFile(null);
    form.resetFields(['upload']);
    setErrorUploadFile(application?.upload?.messageRequired);
    setDisabledSave(true);
  };

  return (
    <h1 ref={props.scrollRef}>
      <div className='careerdetail-application'>
        <div className='container'>
          <Row gutter={24} justify='center'>
            <Col md={18} lg={12}>
              <Form
                form={form}
                name={htmlFor}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onFieldsChange={handleFormChange}
                autoComplete='off'
                className='careerdetail-application-form'
              >
                <p className='careerdetail-application-title'>{application?.title}</p>
                <Form.Item
                  name='name'
                  label={application?.name?.label}
                  rules={[{ required: true, message: application?.name?.messageRequired }]}
                  className='careerdetail-application-item'
                >
                  <Input onFocus={handleOnFocus} onBlur={handleOnBlur} autoComplete='off' onChange={handleOnChange} />
                </Form.Item>
                <Form.Item
                  name='phone'
                  label={application?.phone?.label}
                  rules={[
                    {
                      type: 'string',
                      message: application?.phone?.messageError,
                      pattern: new RegExp(/^(\+|0)(?:[1-9] ?){6,14}[0-9]$/),
                    }, //^\+(?:[0-9] ?){6,14}[0-9]$
                    { required: true, message: application?.phone?.messageRequired },
                  ]}
                  className='careerdetail-application-item'
                >
                  <Input onFocus={handleOnFocus} onBlur={handleOnBlur} autoComplete='off' onChange={handleOnChange} />
                </Form.Item>
                <Form.Item
                  name='email'
                  label={application?.email?.label}
                  rules={[
                    {
                      type: 'email',
                      message: application?.email?.messageError,
                    },
                    { required: true, message: application?.email?.messageRequired },
                  ]}
                  className='careerdetail-application-item'
                >
                  <Input onFocus={handleOnFocus} onBlur={handleOnBlur} autoComplete='off' onChange={handleOnChange} />
                </Form.Item>
                <Form.Item name='content' label={application?.introduce?.label} className='careerdetail-application-item'>
                  <Input.TextArea
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    autoSize={false}
                    style={{ minHeight: 176 }}
                    autoComplete='off'
                    onChange={handleOnChange}
                  />
                </Form.Item>

                <Form.Item name='upload' className='careerdetail-application-item'>
                  <div className='careerdetail-application-upload'>
                    {uploadFile ? (
                      <div className='show-file-input'>
                        {isTypePDF ? <IconPDF /> : <IconWord />}
                        <span title={uploadFile?.name}>{uploadFile?.name}</span>
                        <button type='button' className='remove-file' title='Delete' onClick={handleRemoveUpload}>
                          <IconTrash />
                        </button>
                      </div>
                    ) : (
                      <div className='input-upload'>
                        <ArrowUpOutlined />
                        {application?.upload?.label}
                        <input
                          type='file'
                          accept='.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf'
                          onChange={(e) => handleUploadFile(e)}
                        />
                      </div>
                    )}
                    {errorUploadFile && <span className='error-upload'>{errorUploadFile}</span>}
                    <p className='guidline'>{application?.upload?.guidline}</p>
                  </div>
                </Form.Item>

                <Form.Item className='careerdetail-application-item careerdetail-application-submit '>
                  <Button type='primary' size='large' htmlType='submit' disabled={disabledSave}>
                    {application?.button}
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </h1>
  );
};

CareerApplication.prototype = {
  scrollRef: PropTypes.element,
};

export { CareerApplication };
