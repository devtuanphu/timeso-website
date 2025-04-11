import { Col, Row } from 'antd';
import PropTypes, { InferProps } from 'prop-types';

const Introduce = (props: IntroduceTypes) => {
  return (
    <div className='service-solutionIntroduce '>
      <div className='container'>
        <Row gutter={[24, 24]}>
          {props.data?.map((item, index) => (
            <Col xs={24} md={12} key={index}>
              <div className='service-solutionIntroduce-item'>
                <p className='service-solutionIntroduce-subtitle'>{item?.subTitle}</p>
                <h3 className='service-solutionIntroduce-title'>{item?.title}</h3>
                <p className='service-solutionIntroduce-content'>{item?.content}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

const introducePropTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      subTitle: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.array,
    })
  ).isRequired,
};

type IntroduceTypes = InferProps<typeof introducePropTypes>;

export { Introduce };
