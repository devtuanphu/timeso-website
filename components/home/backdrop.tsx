import { Col, Row } from 'antd';
import Image from 'next/image';

export type BackdropProps = {
  background: Single<StrapiMedia>;
  topIcons: Multiple<StrapiMedia>;
  bottomIcons: Multiple<StrapiMedia>;
  title: string;
};

const Backdrop = (props: BackdropProps) => {
  const { background, title, topIcons, bottomIcons } = props;

  return (
    <div className='home-backdrop'>
      {background.data && (
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${background.data.attributes.url}`}
          alt={background.data.attributes.alternativeText || ''}
          quality={100}
          fill
          sizes='(min-width: 0px) 100vw'
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      )}
      <div className='container home-backdrop-container'>
        <Row gutter={24} className='home-backdrop-top'>
          <Col span={24} className='home-backdrop-top__list'>
            {topIcons.data?.map((icon, idx) => (
              <Image
                className='home-backdrop-top__item'
                key={icon.id}
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${icon.attributes.url}`}
                alt={icon.attributes.alternativeText || `topIcon${icon.id}`}
                width={100}
                height={100}
                quality={100}
                data-aos='fade-down'
                data-aos-delay={idx * 50}
                data-aos-duration={idx * 500}
              />
            ))}
          </Col>
        </Row>
        <Row gutter={24} className='home-backdrop-middle'>
          <Col span={24}>
            <h2 className='home-backdrop-title' data-aos='fade-left' data-aos-delay='100' data-aos-duration='500'>
              {title}
            </h2>
          </Col>
        </Row>
        <Row gutter={24} className='home-backdrop-bottom'>
          <Col span={24} className='home-backdrop-bottom__list'>
            {bottomIcons.data?.map((icon, idx) => (
              <Image
                className='home-backdrop-bottom__item'
                key={icon.id}
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${icon.attributes.url}`}
                alt={icon.attributes.alternativeText || `bottomIcon${icon.id}`}
                width={100}
                height={100}
                quality={100}
                data-aos='fade-up'
                data-aos-delay={idx * 50}
                data-aos-duration={idx * 500}
              />
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Backdrop;
