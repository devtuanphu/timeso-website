import { Col, Row } from 'antd';
import Image from 'next/image';
import PropTypes, { InferProps } from 'prop-types';

const Introduce = (props: IntroTypes) => {
  return (
    <div className='service-introduce service-introduce-custom'>
      <div className='container'>
        <Row gutter={[30, 30]}>
          <Col xs={24} md={12} data-aos='fade-right' data-aos-offset='300'>
            <div className='service-introduce-image'>
              {props.introduceImage?.data && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${props.introduceImage.data.attributes.url}`}
                  width={props.introduceImage.data.attributes.width}
                  height={props.introduceImage.data.attributes.height}
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
          <Col xs={24} md={12} className='service-introduce-text' data-aos='fade-left' data-aos-offset='300'>
            <h3 className='service-introduce-title'>{props.title}</h3>
            <p className='service-introduce-content'>{props.description}</p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const introPropTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  introduceImage: PropTypes.any,
};

type IntroTypes = InferProps<typeof introPropTypes>;

export { Introduce };
