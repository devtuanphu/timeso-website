import { Col, Row } from 'antd';
import PropTypes, { InferProps } from 'prop-types';
import { useWindowSize } from 'usehooks-ts';
import { FlipCardItem } from './_flip-card-item';

const DevelopmentService = (props: DevelopmentTypes) => {
  const { width, height } = useWindowSize();
  return (
    <div className='service-developmentService'>
      <div className='container'>
        <Row gutter={[24, width > 767 ? 24 : 16]}>
          <Col span={24} data-aos='zoom-in'>
            <h2
              className='text-preamble service-developmentService-preamble'
              dangerouslySetInnerHTML={{ __html: props.preamble || '' }}
            ></h2>
            <h2 className='service-developmentService-title'>{props.title}</h2>
            <p className='service-developmentService-content'>{props.description}</p>
          </Col>
          {props.content?.map((item, index) => (
            <Col key={index} xs={24} md={12} lg={8} data-aos='fade-up' data-aos-duration='1000'>
              <FlipCardItem index={index} data={item} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

const developmentPropTypes = {
  preamble: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.any).isRequired,
};

type DevelopmentTypes = InferProps<typeof developmentPropTypes>;

export { DevelopmentService };
