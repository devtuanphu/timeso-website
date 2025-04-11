import { Col, Row } from 'antd';
import PropTypes from 'prop-types';

const ITStaffChoose = (props: any) => {
  const { itstaff, title, preamble } = props;

  return (
    <div className='service-itstaffChoose'>
      <div className='container'>
        <Row gutter={24}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <h2 className='text-preamble service-itstaffChoose-preamble' dangerouslySetInnerHTML={{ __html: preamble }}></h2>
            <h2 className='service-itstaffChoose-title'>{title}</h2>
          </Col>
        </Row>
        <Row gutter={[24, 24]} justify='center' className='service-itstaffChoose-list'>
          {itstaff?.map((item: IChoose, index: number) => (
            <Col md={12} sm={24} key={index} className={`gutter-row service-itstaffChoose-item ${index % 2 == 0 ? 'odd' : ''}`}>
              <div className='card'>
                <div className='card-border'>
                  <p className='card-title'>{item.title}</p>
                  <p className='card-content'>{item.content}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

ITStaffChoose.propTypes = {
  itstaff: PropTypes.any,
  title: PropTypes.string,
  preamble: PropTypes.string,
};

interface IChoose {
  id: number;
  title: string;
  content: string;
}

export { ITStaffChoose };
