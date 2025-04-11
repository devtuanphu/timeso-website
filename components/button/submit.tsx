import { Button, Form } from 'antd';
import type { FormInstance } from 'antd';
import { useEffect, useState } from 'react';

const SubmitButton = ({
  text,
  form,
  isVerified,
  className,
}: {
  text: string;
  form: FormInstance;
  isVerified: boolean;
  className?: string;
}) => {
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
      className={className ? className : `sh-button qq-button btn-submit ${!submittable ? 'ant-btn-disabled' : ''}`}
      disabled={!submittable}
    >
      {text}
    </Button>
  );
};

export { SubmitButton };
