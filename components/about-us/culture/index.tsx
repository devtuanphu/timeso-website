import { Col, Row } from 'antd';
import Image from 'next/image';
import PropTypes, { InferProps } from 'prop-types';
import { useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { useWindowSize } from 'usehooks-ts';

const Culture = (props: CultureTypes) => {
  const { width, height } = useWindowSize();
  const { data } = props;

  useEffect(() => {
    const interval = setInterval(() => {
      document.querySelectorAll('.react-multi-carousel-item--active').forEach((item, index) => {
        const random0 = document.querySelectorAll(
          `.react-multi-carousel-item--active .aboutUs-culture-gallery__item.gallery-item-${index}0 > img`
        )[
          Math.floor(
            Math.random() *
              document.querySelectorAll(
                `.react-multi-carousel-item--active .aboutUs-culture-gallery__item.gallery-item-${index}0 > img`
              ).length
          )
        ];
        document
          .querySelectorAll(`.react-multi-carousel-item--active .gallery-random-${index}0`)
          .forEach((item) => item.classList.remove('active'));
        random0 && random0.classList.add('active');
        //
        const random1 = document.querySelectorAll(
          `.react-multi-carousel-item--active .aboutUs-culture-gallery__item.gallery-item-${index}1 > img`
        )[
          Math.floor(
            Math.random() * document.querySelectorAll(`.aboutUs-culture-gallery__item.gallery-item-${index}1 > img`).length
          )
        ];
        document
          .querySelectorAll(`.react-multi-carousel-item--active .gallery-random-${index}1`)
          .forEach((item) => item.classList.remove('active'));
        random1 && random1.classList.add('active');
        //
        const random2 = document.querySelectorAll(
          `.react-multi-carousel-item--active .aboutUs-culture-gallery__item.gallery-item-${index}2 > img`
        )[
          Math.floor(
            Math.random() *
              document.querySelectorAll(
                `.react-multi-carousel-item--active .aboutUs-culture-gallery__item.gallery-item-${index}2 > img`
              ).length
          )
        ];
        document
          .querySelectorAll(`.react-multi-carousel-item--active .gallery-random-${index}2`)
          .forEach((item) => item.classList.remove('active'));
        random2 && random2.classList.add('active');
        //
        const random3 = document.querySelectorAll(
          `.react-multi-carousel-item--active .aboutUs-culture-gallery__item.gallery-item-${index}3 > img`
        )[
          Math.floor(
            Math.random() *
              document.querySelectorAll(
                `.react-multi-carousel-item--active .aboutUs-culture-gallery__item.gallery-item-${index}3 > img`
              ).length
          )
        ];
        document
          .querySelectorAll(`.react-multi-carousel-item--active .gallery-random-${index}3`)
          .forEach((item) => item.classList.remove('active'));
        random3 && random3.classList.add('active');
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='aboutUs-culture'>
      <div className='container'>
        <Row gutter={24}>
          <Col xs={24} md={18}>
            <h2
              className='text-preamble aboutUs-culture-preamble'
              dangerouslySetInnerHTML={{ __html: data?.culturePreamble || '' }}
            />
            <h3 className='aboutUs-culture-title'>{data?.cultureTitle}</h3>
            <p className='aboutUs-culture-content'>{data?.cultureContent}</p>
          </Col>
        </Row>
      </div>
      <Row gutter={width > 767 ? 24 : 0}>
        <Col span={24} className='aboutUs-culture-fixed'>
          <div className='container aboutUs-culture-carousel'>
            <Carousel
              responsive={responsive}
              autoPlay
              autoPlaySpeed={3000}
              infinite={true}
              draggable={false}
              swipeable={false}
              focusOnSelect={false}
              pauseOnHover
              arrows={false}
              ssr={true}
              keyBoardControl={true}
              centerMode={false}
              // customTransition="transform 1000ms ease-in-out"
              containerClass='aboutUs-culture-carousel__container'
              sliderClass='aboutUs-culture-carousel__slider'
              itemClass='aboutUs-culture-carousel__item'
            >
              <div className='aboutUs-culture-gallery__list'>
                <div className='aboutUs-culture-gallery__item gallery-item-00'>
                  {data?.cultureImages?.data?.map((item, index) => (
                    <Image
                      key={index}
                      className={`gallery-random-00 ${index === 0 ? 'default' : ''}`}
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item?.attributes?.url}`}
                      alt={item?.attributes?.alternativeText || ''}
                      quality={30}
                      fill
                      sizes='(min-width: 0px) 100vw'
                    />
                  ))}
                </div>
                <div className='aboutUs-culture-gallery__item gallery-item-01'>
                  {data?.cultureImages?.data?.map((item, index) => (
                    <Image
                      key={index}
                      className={`gallery-random-01 ${index === 1 ? 'default' : ''}`}
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item?.attributes?.url}`}
                      alt={item?.attributes?.alternativeText || ''}
                      quality={30}
                      fill
                      sizes='(min-width: 0px) 100vw'
                    />
                  ))}
                </div>
                <div className='aboutUs-culture-gallery__item gallery-item-02'>
                  {data?.cultureImages?.data?.map((item, index) => (
                    <Image
                      key={index}
                      className={`gallery-random-01 ${index === 2 ? 'default' : ''}`}
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item?.attributes?.url}`}
                      alt={item?.attributes?.alternativeText || ''}
                      quality={30}
                      fill
                      sizes='(min-width: 0px) 100vw'
                    />
                  ))}
                </div>
                <div className='aboutUs-culture-gallery__item gallery-item-03'>
                  {data?.cultureImages?.data?.map((item, index) => (
                    <Image
                      key={index}
                      className={`gallery-random-01 ${index === 3 ? 'default' : ''}`}
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item?.attributes?.url}`}
                      alt={item?.attributes?.alternativeText || ''}
                      quality={30}
                      fill
                      sizes='(min-width: 0px) 100vw'
                    />
                  ))}
                </div>
              </div>
              <div className='aboutUs-culture-gallery__list'>
                <div className='aboutUs-culture-gallery__item gallery-item-10'>
                  {data?.cultureImages?.data?.map((item, index) => (
                    <Image
                      key={index}
                      className={`gallery-random-10 ${index === 4 ? 'default' : ''}`}
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item?.attributes?.url}`}
                      alt={item?.attributes?.alternativeText || ''}
                      quality={30}
                      fill
                      sizes='(min-width: 0px) 100vw'
                    />
                  ))}
                </div>
                <div className='aboutUs-culture-gallery__item gallery-item-11'>
                  {data?.cultureImages?.data?.map((item, index) => (
                    <Image
                      key={index}
                      className={`gallery-random-11 ${index === 5 ? 'default' : ''}`}
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item?.attributes?.url}`}
                      alt={item?.attributes?.alternativeText || ''}
                      quality={30}
                      fill
                      sizes='(min-width: 0px) 100vw'
                    />
                  ))}
                </div>
                <div className='aboutUs-culture-gallery__item gallery-item-12'>
                  {data?.cultureImages?.data?.map((item, index) => (
                    <Image
                      key={index}
                      className={`gallery-random-12 ${index === 6 ? 'default' : ''}`}
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item?.attributes?.url}`}
                      alt={item?.attributes?.alternativeText || ''}
                      quality={30}
                      fill
                      sizes='(min-width: 0px) 100vw'
                    />
                  ))}
                </div>
                <div className='aboutUs-culture-gallery__item gallery-item-13'>
                  {data?.cultureImages?.data?.map((item, index) => (
                    <Image
                      key={index}
                      className={`gallery-random-13 ${index === 7 ? 'default' : ''}`}
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item?.attributes?.url}`}
                      alt={item?.attributes?.alternativeText || ''}
                      quality={30}
                      fill
                      sizes='(min-width: 0px) 100vw'
                    />
                  ))}
                </div>
              </div>
            </Carousel>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const culturePropTypes = {
  preamble: PropTypes.element,
  data: PropTypes.shape({
    culturePreamble: PropTypes.string,
    cultureTitle: PropTypes.string,
    cultureContent: PropTypes.string,
    cultureImages: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          attributes: PropTypes.shape({
            alternativeText: PropTypes.string,
            url: PropTypes.string,
            width: PropTypes.number,
            height: PropTypes.number,
          }),
        })
      ),
    }),
  }),
};

type CultureTypes = InferProps<typeof culturePropTypes>;

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
    breakpoint: { max: 1024, min: 767 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 1,
  },
};

export { Culture };
