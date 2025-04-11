import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import Image from 'next/image';
import PropTypes, { InferProps } from 'prop-types';
import { useEffect, useRef } from 'react';
import Carousel from 'react-multi-carousel';
import { useWindowSize } from 'usehooks-ts';

import { Button } from '@components/button';

const WorkingProcess = (props: WorkingProcessTypes) => {
  const { width, height } = useWindowSize();
  const ref = useRef(null);

  const handleBeforeActiveCard = (nextSlide: number, currentSlide: number) => {
    if (nextSlide !== currentSlide) {
      setTimeout(() => {
        (document.querySelectorAll(`.service-workingProcess-carousel__item`)[nextSlide] as HTMLElement)?.classList.add('active');
        (document.querySelectorAll(`.service-workingProcess-carousel__item`)[currentSlide] as HTMLElement)?.classList.remove(
          'active'
        );
      });
    }
  };

  const handleAfterActiveCard = (prevSlide: number, currentSlide: number) => {};

  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) {
      return () => {
        handleActiveCarousel();
      };
    } else {
      handleActiveCarousel();
    }
  });

  const handleActiveCarousel = () => {
    let el2: any = ref.current;

    if (el2?.props.itemClass) {
      setTimeout(() => {
        document.querySelectorAll(`.service-workingProcess-carousel__item`)[0]?.classList.add('active');
      });
    }
  };

  const ButtonArrowGroup = ({ next, previous, goToSlide, ...rest }: any) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <div className='carousel-button-group'>
        <Button type='primary' className='arrow arrow-left' onClick={() => previous()} aria-label='left-arrow-click'>
          <ArrowLeftOutlined className='arrow-icon' />
        </Button>
        <Button type='primary' className='arrow arrow-right' onClick={() => next()} aria-label='left-arrow-click'>
          <ArrowRightOutlined className='arrow-icon' />
        </Button>
      </div>
    );
  };

  return (
    <div className='service-workingProcess'>
      <div className='container'>
        <Row gutter={24} justify='center' className='service-workingProcess-top'>
          <Col xs={24} lg={18} data-aos='zoom-in'>
            <h3 className='service-workingProcess-title'>{props.title}</h3>
            <p className='service-workingProcess-content'>{props.description}</p>
          </Col>
        </Row>
      </div>
      <div className='container container-fixed'>
        {width > 833 ? (
          <Row className='service-workingProcess-bottom'>
            <Col span={24} data-aos='fade-up' style={{ overflow: 'hidden' }}>
              <div className='service-workingProcess-carousel'>
                <Carousel
                  ssr={true}
                  responsive={responsive}
                  focusOnSelect
                  arrows={false}
                  transitionDuration={300}
                  beforeChange={(nextSlide, { currentSlide }) => handleBeforeActiveCard(nextSlide, currentSlide)}
                  afterChange={(prevSlide, { currentSlide }) => handleAfterActiveCard(prevSlide, currentSlide)}
                  centerMode={true}
                  customTransition='transform 500ms linear'
                  containerClass='service-workingProcess-carousel__container'
                  sliderClass='service-workingProcess-carousel__list'
                  itemClass='service-workingProcess-carousel__item'
                  ref={ref}
                  draggable={false}
                >
                  {props.content?.map((item, index) => (
                    <div key={index} className='card'>
                      <div className='card-left'>
                        <div
                          className={`card-left-number card-left-number__${index + 1}`}
                          style={{
                            backgroundImage: `url(/assets/number/number-${index + 1}.svg)`,
                          }}
                        ></div>
                      </div>
                      <div className='card-right'>
                        <div className='card-right-head'>
                          <div className='card-right-head__image'>
                            {item.image?.data && (
                              <Image
                                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image.data.attributes.url}`}
                                width={71}
                                height={71}
                                alt=''
                                style={{
                                  maxWidth: '100%',
                                  height: 'auto',
                                }}
                              />
                            )}
                          </div>
                          <h6 className='card-right-head__title'>{item?.title}</h6>
                        </div>
                        <div className={`card-right-body card-right-body__w--${index}`}>
                          <p className='card-right-body__content'>{item?.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </Col>
          </Row>
        ) : (
          <Row gutter={24}>
            <Col span={24}>
              <Carousel
                ssr={true}
                infinite
                responsive={responsive}
                containerClass='service-workingProcess-mobile__carousel--container'
                focusOnSelect
                customButtonGroup={<ButtonArrowGroup />}
                arrows={false}
              >
                {props.content?.map((item, index) => (
                  <div key={index} className='card'>
                    <div className='card-left'>
                      <div
                        className={`card-left-number card-left-number__${index + 1}`}
                        style={{
                          backgroundImage: `url(/assets/number/number-${index + 1}.svg)`,
                        }}
                      ></div>
                    </div>
                    <div className='card-right'>
                      <div className='card-right-head'>
                        <div className='card-right-head__image'>
                          {item.image?.data && (
                            <Image
                              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image.data.attributes.url}`}
                              width={71}
                              height={71}
                              alt=''
                              style={{
                                maxWidth: '100%',
                                height: 'auto',
                              }}
                            />
                          )}
                        </div>
                        <h6 className='card-right-head__title'>{item?.title}</h6>
                      </div>
                      <div className={`card-right-body card-right-body__w--${index}`}>
                        <p className='card-right-body__content'>{item?.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

const workingProcessPropTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  bgStep: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.any).isRequired,
};

type WorkingProcessTypes = InferProps<typeof workingProcessPropTypes>;

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1200 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1199, min: 1023 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1023, min: 834 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 834, min: 0 },
    items: 1,
  },
};

export { WorkingProcess };
