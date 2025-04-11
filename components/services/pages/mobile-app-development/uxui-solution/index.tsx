import { Col, Row } from 'antd';
import PropTypes, { InferProps } from 'prop-types';

const UXUISolution = (props: SolutionTypes) => {
  return (
    <div className='service-uxuiSolution'>
      <div className='container'>
        <Row gutter={24} justify='center'>
          <Col xs={24} md={24} lg={24} style={{ textAlign: 'center' }} data-aos='zoom-in'>
            <h2
              className='text-preamble service-uxuiSolution-preamble'
              dangerouslySetInnerHTML={{ __html: props.preamble || '' }}
            ></h2>
            <h3 className='service-uxuiSolution-title'>{props.title}</h3>
          </Col>
        </Row>
        <Row gutter={[24, 24]} className='service-uxuiSolution-list' data-aos='fade-up' data-aos-duration='500'>
          {props.content?.map((item, index) => (
            <Col xs={24} md={8} key={index}>
              <div className='service-uxuiSolution-item'>
                <p className='service-uxuiSolution-item__title'>{item?.title}</p>
                <p className='service-uxuiSolution-item__content'>{item?.content}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

const solutionPropTypes = {
  preamble: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string,
    })
  ).isRequired,
};

type SolutionTypes = InferProps<typeof solutionPropTypes>;

export { UXUISolution };
