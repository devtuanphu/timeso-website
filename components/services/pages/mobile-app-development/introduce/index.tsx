import { Col, Row } from 'antd';
import Image from 'next/image';
import PropTypes, { InferProps } from 'prop-types';

const Introduce = (props: IntroduceTypes) => {
  return (
    <>
      {props.data?.map((item, index) => (
        <div key={index} className={`service-introduce service-introduce-uxui ${index % 2 != 0 ? 'uxui-odd' : 'uxui-even'}`}>
          <div className='container'>
            <Row gutter={[24, 24]}>
              <Col
                xs={24}
                md={10}
                order={index % 2 != 0 ? 0 : 1}
                className='service-introduce-image'
                data-aos={index % 2 != 0 ? 'fade-right' : 'fade-left'}
                data-aos-duration='500'
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item?.image.data.attributes.url}`}
                  width={item?.image.data.attributes.width}
                  height={item?.image.data.attributes.height}
                  alt=''
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
              </Col>
              <Col
                xs={24}
                md={14}
                className='service-introduce-text'
                data-aos={index % 2 != 0 ? 'fade-left' : 'fade-right'}
                data-aos-duration='500'
              >
                <h3 className='service-introduce-title'>{item?.title}</h3>
                <p className='service-introduce-content'>{item?.content}</p>
              </Col>
            </Row>
          </div>
        </div>
      ))}
    </>
  );
};

const introducePropTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.any,
      title: PropTypes.string,
      content: PropTypes.string,
    })
  ).isRequired,
};

type IntroduceTypes = InferProps<typeof introducePropTypes>;

export { Introduce };
