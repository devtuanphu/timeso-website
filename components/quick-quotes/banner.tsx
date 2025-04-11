import { Col, Row } from 'antd';
import Image from 'next/image';
import PropTypes from 'prop-types';

const BannerQQ = (props: any) => {
  return (
    <div className={`banner ${props.class}`}>
      {/* <Image
        src={props.bg || '/assets/career/banner.png'}
        alt={`background banner ${props.class}`}
        className='banner-background'
        quality={100}
        fill
        sizes='(min-width: 0px) 100vw'
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      /> */}
      <div className='default-banner'>
        <div className='container' data-aos='zoom-in'>
          <Row gutter={24}>
            <Col span={24} className='home-choose-content qq-banner-content'>
              <h2 className='default-banner-title qq-banner-title qq-chrismas-linearGreen' dangerouslySetInnerHTML={{ __html: props.title }}></h2>
              <h2
                className={`text-preamble qq-banner-subtitle ${props.locale}`}
                dangerouslySetInnerHTML={{ __html: props.content }}
              ></h2>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

BannerQQ.propTypes = {
  class: PropTypes.string,
  bg: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  content: PropTypes.string,
  locale: PropTypes.string,
};

export { BannerQQ };
