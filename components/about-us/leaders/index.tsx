/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import Image from 'next/image';
import PropTypes, { InferProps } from 'prop-types';
import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import { useWindowSize } from 'usehooks-ts';

import { Button } from '@components/button';

const Leaders = (props: LeaderTypes) => {
  const { width, height } = useWindowSize();
  const { data } = props;
  const [cardActive, setCardActive] = useState(data?.leaders?.data[0]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setCardActive(data?.leaders?.data[currentSlide]);
  }, [data]);

  const handleBeforeChange = (next: number, current: number) => {
    if (next > current) {
      changeData(next);
    }
  };
  const handleAfterChange = (prev: number, current: number) => {
    if (prev > current) {
      changeData(current);
    }
  };

  const changeData = (index: number) => {
    setCurrentSlide(index);
    setCardActive(data?.leaders?.data[index]);
  };

  const ButtonArrowGroup = ({ next, previous, goToSlide, ...rest }: any) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <div className='carousel-button-group'>
        <Button
          type='primary'
          className='arrow arrow-left'
          onClick={() => previous()}
          aria-label='left-arrow-click'
          disabled={currentSlide === 0}
        >
          <ArrowLeftOutlined className='arrow-icon' />
        </Button>

        <Button
          type='primary'
          className='arrow arrow-right'
          onClick={() => next()}
          aria-label='right-arrow-click'
          disabled={data?.leaders?.data && currentSlide === data?.leaders?.data.length - 1}
        >
          <ArrowRightOutlined className='arrow-icon' />
        </Button>
      </div>
    );
  };
  return (
    <div className='aboutUs-leaders'>
      <div className='container'>
        <Row gutter={24} justify='center'>
          <Col xs={24} md={20}>
            <h2 className='aboutUs-leaders-title'>{data?.leaderTitle}</h2>
          </Col>
        </Row>
        {width > 1023 ? (
          <Row className='aboutUs-leaders-carousel'>
            <Col span={8}>
              <Carousel
                responsive={responsive}
                arrows={false}
                ssr={true}
                focusOnSelect
                draggable={false}
                keyBoardControl={true}
                centerMode={false}
                beforeChange={(nextSlide, { currentSlide }) => {
                  handleBeforeChange(nextSlide, currentSlide);
                }}
                afterChange={(prevSlide, { currentSlide }) => {
                  handleAfterChange(prevSlide, currentSlide);
                }}
                infinite={false}
                customButtonGroup={width > 1023 ? <ButtonArrowGroup /> : <></>}
                containerClass='aboutUs-leaders-carousel__container'
                sliderClass='aboutUs-leaders-carousel__slider'
                itemClass='aboutUs-leaders-carousel__item'
                transitionDuration={300}
                customTransition='transform 300ms ease-in-out'
              >
                {data?.leaders?.data.map((item, index) => (
                  <div key={index} className='card'>
                    <div className='card-top'>
                      <div className='card-top-image'>
                        {item?.attributes?.image?.data && (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item?.attributes?.image?.data?.attributes?.url}`}
                            height='261'
                            width='261'
                            alt={item?.attributes?.image?.data?.attributes?.alternativeText || ''}
                            quality={100}
                            style={{
                              maxWidth: '100%',
                              height: 'auto',
                            }}
                          />
                        )}
                      </div>
                    </div>
                    <div className='card-body'>
                      <p className='card-body-gender'>{item?.attributes?.title}</p>
                      <h6 className='card-body-name'>{item?.attributes?.name}</h6>
                      <div className='card-body-position'>
                        <p className='card-body-position__item'>{item?.attributes?.position}</p>
                        <p className='card-body-position__item'>{item?.attributes?.jobTitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </Col>
            <p
              className='aboutUs-leaders-carousel__content'
              dangerouslySetInnerHTML={{ __html: cardActive?.attributes?.description || '' }}
            />
          </Row>
        ) : (
          <Row className='aboutUs-leaders-carousel'>
            <Col span={24}>
              <Row gutter={width > 767 ? 12 : 0}>
                <Col xs={24} md={12}>
                  <Carousel
                    responsive={responsive}
                    arrows={false}
                    ssr={true}
                    focusOnSelect
                    keyBoardControl={true}
                    centerMode={false}
                    infinite={false}
                    beforeChange={(nextSlide, { currentSlide }) => {
                      handleBeforeChange(nextSlide, currentSlide);
                    }}
                    afterChange={(prevSlide, { currentSlide }) => {
                      handleAfterChange(prevSlide, currentSlide);
                    }}
                    customButtonGroup={<ButtonArrowGroup />}
                    containerClass='aboutUs-leaders-carousel__carousel'
                    itemClass='aboutUs-leaders-carousel__item'
                  >
                    {data?.leaders?.data.map((item, index) => (
                      <div key={index}>
                        <div className='card'>
                          <div className='card-top'>
                            <div className='card-top-image'>
                              {item?.attributes?.image?.data && (
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item?.attributes?.image?.data?.attributes?.url}`}
                                  height='261'
                                  width='261'
                                  alt={item?.attributes?.image?.data?.attributes?.alternativeText || ''}
                                  quality={100}
                                />
                              )}
                            </div>
                          </div>
                          <div className='card-body'>
                            <p className='card-body-gender'>{item?.attributes?.title}</p>
                            <h6 className='card-body-name'>{item?.attributes?.name}</h6>
                            <div className='card-body-position'>
                              <p key={index} className='card-body-position__item'>
                                {item?.attributes?.position}
                              </p>
                              <p className='card-body-position__item'>{item?.attributes?.jobTitle}</p>
                            </div>
                          </div>
                        </div>
                        <p className='information' dangerouslySetInnerHTML={{ __html: item?.attributes?.description || '' }} />
                      </div>
                    ))}
                  </Carousel>
                </Col>
                {width > 767 && width < 1024 ? (
                  <Col md={12}>
                    <p className='information' dangerouslySetInnerHTML={{ __html: cardActive?.attributes?.description || '' }} />
                  </Col>
                ) : null}
              </Row>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

const leaderPropTypes = {
  data: PropTypes.shape({
    leaderTitle: PropTypes.string,
    leaders: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          attributes: PropTypes.shape({
            name: PropTypes.string,
            title: PropTypes.string,
            position: PropTypes.string,
            jobTitle: PropTypes.string,
            description: PropTypes.string,
            image: PropTypes.shape({
              data: PropTypes.shape({
                id: PropTypes.number,
                attributes: PropTypes.shape({
                  alternativeText: PropTypes.string,
                  url: PropTypes.string,
                }),
              }),
            }),
          }),
        })
      ).isRequired,
    }),
  }),
};

type LeaderTypes = InferProps<typeof leaderPropTypes>;

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 1,
  },
};

export { Leaders };
