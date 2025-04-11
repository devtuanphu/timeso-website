import { UserOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';

import { ClockIcon } from '../icons/clock';
import { LocationIcon } from '../icons/location';

const CareerDetailBanner = (props: any) => {
  const { subtitle, title, backdrop, location, work_time, level } = props;

  return (
    <div className='careerdetail-banner' style={{ backgroundImage: `url(${backdrop})` }}>
      <div className='container'>
        <Row gutter={24}>
          <Col span={24}>
            <p className='careerdetail-banner-subtitle'>{subtitle}</p>
            <h1 className='careerdetail-banner-title'>{title}</h1>
            <div className='careerdetail-banner-list'>
              <div className='careerdetail-banner-item'>
                <LocationIcon />
                <p>{location}</p>
              </div>
              <div className='careerdetail-banner-item'>
                <ClockIcon />
                <p>{work_time}</p>
              </div>
              <div className='careerdetail-banner-item'>
                <UserOutlined style={{ fontSize: '24px', color: '#FEFEFE' }} />
                <p>{level}</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

CareerDetailBanner.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string,
  backdrop: PropTypes.string,
  location: PropTypes.string,
  work_time: PropTypes.string,
  level: PropTypes.string,
};

export { CareerDetailBanner };
