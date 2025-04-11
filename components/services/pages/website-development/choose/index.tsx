import { Col, Row } from 'antd';
import Image from 'next/image';
import PropTypes, { InferProps } from 'prop-types';
import Carousel from 'react-multi-carousel';
import { useWindowSize } from 'usehooks-ts';

const Choose = (props: ChooseTypes) => {
  const { width, height } = useWindowSize();

  return (
    <div className='service-choose service-choose-offshore'>
      <div className='container'>
        <Row gutter={24}>
          <Col xs={24} md={24} lg={12}>
            <div data-aos='fade-right'>
              <h2
                className='text-preamble service-choose-preamble'
                dangerouslySetInnerHTML={{ __html: props.preamble || '' }}
              ></h2>
              <h3 className='service-choose-title'>{props.title}</h3>
              <div className='service-choose-image'>
                {props?.image?.data?.attributes?.url && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${props.image.data.attributes.url}`}
                    alt='chooseImage'
                    width={532}
                    height={401}
                  />
                )}
              </div>
            </div>
          </Col>
          {width > 767 ? (
            <Col md={24} lg={12}>
              {width > 1023 ? (
                <div className='service-choose-list'>
                  <div className='service-choose-column'>
                    {props.data &&
                      props.data.map((item, index) => {
                        if (index % 2 === 0) {
                          return (
                            <div key={item?.id} className='service-choose-item' data-aos='fade-up' data-aos-duration='1000'>
                              <p className='service-choose-item__title'>
                                {index + 1}. {item?.title}
                              </p>
                              <p className='service-choose-item__content'>{item?.content}</p>
                            </div>
                          );
                        }
                      })}
                  </div>
                  <div className='service-choose-column'>
                    {props.data &&
                      props.data.map((item, index) => {
                        if (index % 2 !== 0) {
                          return (
                            <div key={item?.id} className='service-choose-item' data-aos='fade-up' data-aos-duration='1000'>
                              <p className='service-choose-item__title'>
                                {index + 1}. {item?.title}
                              </p>
                              <p className='service-choose-item__content'>{item?.content}</p>
                            </div>
                          );
                        }
                      })}
                  </div>
                </div>
              ) : (
                <div className='service-choose-list'>
                  <div className='service-choose-column'>
                    {props.data &&
                      props.data.map((item, index) => (
                        <div key={item?.id} className='service-choose-item' data-aos='fade-up' data-aos-duration='1000'>
                          <p className='service-choose-item__title'>
                            {index + 1}. {item?.title}
                          </p>
                          <p className='service-choose-item__content'>{item?.content}</p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </Col>
          ) : (
            <Col span={24} className='service-choose-carousel'>
              <Carousel
                responsive={responsive}
                infinite={true}
                focusOnSelect={false}
                arrows={false}
                ssr={true}
                containerClass='service-choose-carousel__container'
                itemClass='service-choose-carousel__item'
                keyBoardControl={true}
                centerMode={false}
              >
                {props.data &&
                  props.data.map((item, index) => (
                    <div key={index} className='service-choose-item' data-aos='fade-up' data-aos-duration='1000'>
                      <p className='service-choose-item__title'>
                        {index + 1}. {item?.title}
                      </p>
                      <p className='service-choose-item__content'>{item?.content}</p>
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

const choosePropTypes = {
  preamble: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.any,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      image: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.string,
    })
  ),
};

type ChooseTypes = InferProps<typeof choosePropTypes>;

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4.5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3.5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2.5,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 1,
  },
};

export { Choose };
