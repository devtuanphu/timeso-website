import { Col, Row } from 'antd';
import Image from 'next/image';
import PropTypes, { InferProps } from 'prop-types';

const Introduce = (props: IntroduceTypes) => {
  return (
    <>
      <div className='service-introduce service-introduce-offshore__top'>
        <div className='container'>
          <Row gutter={[30, 30]}>
            <Col xs={24} md={8} data-aos='fade-right' data-aos-offset='300'>
              <div className='service-introduce-image'>
                {props.data?.[0]?.image?.data && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${props.data[0].image.data.attributes.url}`}
                    width={451}
                    height={468}
                    alt=''
                    quality={100}
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                )}
              </div>
            </Col>
            <Col xs={24} md={16} className='service-introduce-text' data-aos='fade-left' data-aos-offset='300'>
              <h3 className='service-introduce-title'>{props.data?.[0]?.title}</h3>
              <p className='service-introduce-content'>{props.data?.[0]?.content}</p>
            </Col>
          </Row>
        </div>
      </div>
      <div className='service-introduce service-introduce-offshore__bottom'>
        <div className='container'>
          <Row gutter={[30, 30]}>
            <Col xs={24} md={16} lg={16} className='service-introduce-text' data-aos='fade-right' data-aos-offset='300'>
              <h3 className='service-introduce-title'>{props.data?.[1]?.title}</h3>
              <p className='service-introduce-content'>{props.data?.[1]?.content}</p>
            </Col>
            <Col xs={24} md={8} lg={8} data-aos='fade-left' data-aos-offset='300'>
              <div className='service-introduce-image'>
                {props.data?.[1]?.image?.data && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${props.data?.[1].image.data.attributes.url}`}
                    width={451}
                    height={480}
                    alt=''
                    quality={100}
                  />
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

const introducePropTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};

type IntroduceTypes = InferProps<typeof introducePropTypes>;

export { Introduce };
