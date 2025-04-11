import { Col, Row } from 'antd';
import PropTypes, { InferProps } from 'prop-types';

import { FlipCardItem } from '../../software-development-outsourcing/development-service/_flip-card-item';

const UXUIProcess = (props: ProcessTypes) => {
  return (
    <div className='service-uxuiProcess'>
      <div className='container'>
        <Row gutter={24}>
          <Col xs={24} lg={24} data-aos='zoom-in'>
            <h2 className='text-preamble service-uxuiProcess-preamble'>{props.preamble}</h2>
            <h2 className='service-uxuiProcess-title'>{props.title}</h2>
            <p className='service-uxuiProcess-content'>{props.content}</p>
          </Col>
        </Row>
      </div>
      <Row gutter={[24, 24]} className='container service-uxuiProcess-list' data-aos='fade-up' data-aos-duration='500'>
        {props.data?.map((item, index) => (
          <Col key={index} xs={24} md={12} lg={8} data-aos='fade-up' data-aos-duration='1000'>
            <FlipCardItem index={index} data={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

const processPropTypes = {
  data: PropTypes.any,
  preamble: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
};

type ProcessTypes = InferProps<typeof processPropTypes>;

export { UXUIProcess };
