import { Col, Row } from 'antd';
import Image from 'next/image';

const Banner = (props: any) => {
  return (
    <div className={`banner ${props.class}`}>
      <Image
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
      />
      <div className='default-banner'>
        <div className='container' data-aos='zoom-in'>
          <Row gutter={24}>
            <Col span={24}>
              <h1 className='default-banner-title'>{props?.data?.bannerTitle || props.title}</h1>
              <h2 className='default-banner-description'>{props?.data?.bannerDescription || props.description}</h2>
              <p className='default-banner-content'>{props?.data?.bannerContent || props.content}</p>
              {props.children}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export { Banner };
