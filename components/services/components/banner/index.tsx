import { Col, Row } from 'antd';
import Image from 'next/image';
import PropTypes from 'prop-types';
import Carousel from 'react-multi-carousel';

const Banner = (props: any) => {
  return (
    <div className='banner-service'>
      <div className='banner-service-background'>
        {props.background && (
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${props.background}`}
            alt={`background banner ${props.title}`}
            quality={100}
            fill
            sizes='(min-width: 0px) 100vw'
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        )}
        <div className='container'>
          <Row gutter={24}>
            <Col span={24} className='banner-service-top' data-aos='zoom-in'>
              <h2 className='banner-service-top__subtitle'>{props.subtitle}</h2>
              <h1 className='banner-service-top__title' dangerouslySetInnerHTML={{ __html: props.bannerTitle }}></h1>
            </Col>
          </Row>
        </div>
      </div>
      <div className='container banner-service-fluid'>
        <Row gutter={{ xs: 0, md: 24 }}>
          <Col span={24} className='banner-service-bottom' data-aos='fade-up'>
            <div className='banner-service-bottom__carousel'>
              <Carousel
                responsive={responsive}
                infinite
                autoPlay
                autoPlaySpeed={2000}
                arrows={false}
                ssr={true}
                keyBoardControl={true}
                centerMode={false}
                swipeable={false}
                draggable={false}
                partialVisible={false}
                itemClass='banner-service-bottom__carousel--item'
              >
                {props.customers?.map(
                  (img) =>
                    img?.attributes.logo?.data?.attributes && (
                      <Image
                        key={img?.attributes.logo?.data.id}
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${img.attributes.logo.data.attributes.url}`}
                        width={208}
                        height={68}
                        alt={img.attributes.name}
                        quality={100}
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                        }}
                      />
                    )
                )}
              </Carousel>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

Banner.propTypes = {
  bannerTitle: PropTypes.any,
  subtitle: PropTypes.string,
  background: PropTypes.string,
  customers: PropTypes.arrayOf(PropTypes.any),
};

export { Banner };

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 575 },
    items: 3.5,
  },
  mobile: {
    breakpoint: { max: 574, min: 0 },
    items: 2.5,
  },
};
