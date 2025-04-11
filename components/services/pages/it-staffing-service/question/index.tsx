import { Col, Row } from 'antd';

type PropType = {
  leftTitle: string;
  rightTitle: string;
  solution: string;
};

const Question = (props: PropType) => {
  return (
    <div className='service-itstaffQuestion'>
      <div className='container'>
        <Row className='service-itstaffQuestion-list' justify='center'>
          <Col xs={14} md={12} lg={11} xl={10} className='service-itstaffQuestion-item'>
            <div className='box'>
              <p className='service-itstaffQuestion-item__title'>{props.leftTitle}</p>
            </div>
          </Col>
          <Col xs={14} md={12} lg={11} xl={10} className='service-itstaffQuestion-item'>
            <div className='box'>
              <p className='service-itstaffQuestion-item__title'>{props.rightTitle}</p>
            </div>
          </Col>
        </Row>
        <Row className='service-itstaffQuestion-solution'>
          <Col span={24}>
            <p className='service-itstaffQuestion-solution_content'>{props.solution}</p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export { Question };
