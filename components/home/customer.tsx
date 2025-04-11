import { Col, Row } from 'antd';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';

export type CustomerProps = {
  preamble: string;
  title: string;
  description: string;
  customers: Multiple<{ logo: Single<StrapiMedia>; name: string }>;
};

const Customer = (props: CustomerProps) => {
  const { preamble, title, description, customers } = props;

  return (
    <div className='home-customer'>
      <div className='container'>
        <Row gutter={24} justify='center'>
          <Col xs={24} xl={18} className='home-customer-content'>
            <h2 className='text-preamble home-customer-preamble' dangerouslySetInnerHTML={{ __html: preamble }}></h2>
            <h2 className='home-customer-title'>{title}</h2>
            <p className='home-customer-description'>{description}</p>
          </Col>
          <Col span={24} className='home-customer-carousel'>
            <Carousel
              responsive={responsive}
              infinite
              autoPlay
              autoPlaySpeed={2000}
              arrows={false}
              ssr={true}
              keyBoardControl={true}
              draggable={false}
              swipeable={false}
              containerClass='home-customer-carousel__container'
              sliderClass='home-customer-carousel__slider'
              centerMode={false}
              partialVisible={false}
            >
              {customers.data?.map((item) => (
                <div className='home-customer-carousel__item' key={item.id}>
                  {item.attributes.logo.data && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.attributes.logo.data.attributes.url}`}
                      alt={item.attributes.name || ''}
                      quality={100}
                      fill
                      sizes='(min-width: 0px) 100vw'
                    />
                  )}
                </div>
              ))}
            </Carousel>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Customer;

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1920 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1920, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 3,
  },
};
