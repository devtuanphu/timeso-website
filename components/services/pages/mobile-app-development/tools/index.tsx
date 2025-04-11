import { Col, Row } from 'antd';
import Image from 'next/image';
import PropTypes, { InferProps } from 'prop-types';
import Carousel from 'react-multi-carousel';
import { useWindowSize } from 'usehooks-ts';

const Tools = (props: ToolsPropTypes) => {
  const { width, height } = useWindowSize();
  return (
    <div className='service-tools'>
      <div className='container'>
        <Row gutter={24}>
          <Col span={24} data-aos='zoom-in'>
            <p className='service-tools-title'>{props.title}</p>
          </Col>
        </Row>
        <Row gutter={width > 767 ? 24 : 0}>
          <Col span={24}>
            {width > 767 ? (
              <div className='service-tools-list'>
                {props.data &&
                  props.data.map((item, index) => (
                    <div key={index} className='service-tools-item'>
                      {item && (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.attributes.url}`}
                          width={208}
                          height={68}
                          alt=''
                          quality={100}
                        />
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              <Carousel
                responsive={responsive}
                infinite
                focusOnSelect={false}
                autoPlay={true}
                swipeable={false}
                draggable={false}
                arrows={false}
                ssr={true}
                keyBoardControl={true}
                centerMode={false}
                containerClass='service-tools-carousel__container'
                itemClass='service-tools-carousel__item'
              >
                {props.data &&
                  props.data.map((item, index) => (
                    <div key={index} className='service-tools-item'>
                      {item && (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.attributes.url}`}
                          width={208}
                          height={68}
                          alt=''
                          quality={100}
                        />
                      )}
                    </div>
                  ))}
              </Carousel>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

const toolsPropTypes = {
  title: PropTypes.string,
  data: PropTypes.any,
};

type ToolsPropTypes = InferProps<typeof toolsPropTypes>;

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 767 },
    items: 3.5,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 2.5,
  },
};

export { Tools };
