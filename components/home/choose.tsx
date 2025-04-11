import { Card, Col, Row } from 'antd';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import { useWindowSize } from 'usehooks-ts';

export type ChooseProps = {
  preamble: string;
  title: string;
  chooses: Multiple<{
    image: Single<StrapiMedia>;
    title: string;
    description: string;
    url: string;
  }>;
};

const Choose = (props: ChooseProps) => {
  const { preamble, title, chooses } = props;
  const { width } = useWindowSize();

  return (
    <div className='home-choose'>
      <div className='container'>
        <Row gutter={[24, 24]}>
          <Col span={24} className='home-choose-content' data-aos='fade-right'>
            <h2 className='text-preamble home-choose-preamble' dangerouslySetInnerHTML={{ __html: preamble }}></h2>
            <h2 className='home-choose-title'>{title}</h2>
          </Col>
        </Row>
        <Row gutter={width > 1023 ? [24, 24] : 0}>
          {width > 1023 ? (
            chooses.data?.map((item, index) => (
              <Col key={item.id} xs={24} md={12} xl={6} className='home-choose-card' data-aos='fade-up' data-aos-duration='1500'>
                <Card
                  hoverable
                  cover={
                    item.attributes.image.data && (
                      <Image
                        alt={item.attributes.image.data.attributes.alternativeText || ''}
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.attributes.image.data.attributes.url}`}
                        quality={100}
                        fill
                        sizes='(min-width: 0px) 100vw'
                      />
                    )
                  }
                >
                  <Card.Meta
                    title={
                      <span className='home-choose-card-title'>
                        {index + 1}. {item.attributes.title}
                      </span>
                    }
                    description={<span className='home-choose-card-description'>{item.attributes.description}</span>}
                  />
                </Card>
              </Col>
            ))
          ) : (
            <Col span={24}>
              <Carousel
                responsive={responsive}
                infinite={true}
                focusOnSelect={true}
                arrows={false}
                ssr={true}
                keyBoardControl={true}
                centerMode={false}
                containerClass='home-choose-slide__container'
                itemClass='home-choose-slide__item'
              >
                {chooses.data?.map((item, index) => (
                  <div key={item.id} className='home-choose-card'>
                    <Card
                      hoverable
                      cover={
                        item.attributes.image.data && (
                          <Image
                            alt={item.attributes.image.data.attributes.alternativeText || ''}
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.attributes.image.data.attributes.url}`}
                            quality={100}
                            fill
                            sizes='(min-width: 0px) 100vw'
                          />
                        )
                      }
                    >
                      <Card.Meta title={`${index + 1}. ${item.attributes.title}`} description={item.attributes.description} />
                    </Card>
                  </div>
                ))}
              </Carousel>
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
};

export default Choose;

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 1,
    partialVisibilityGutter: 50,
  },
};
