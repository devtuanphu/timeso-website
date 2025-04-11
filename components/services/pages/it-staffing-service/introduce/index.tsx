import { Col, Row } from 'antd';
import Image from 'next/image';
import PropTypes, { InferProps } from 'prop-types';

const Introduce = (props: IntroduceTypes) => {
  return (
    <div className='service-introduce'>
      <div className='container'>
        <Row gutter={[24, 24]}>
          <Col sm={24} md={12} data-aos='fade-right' data-aos-offset='300'>
            {props.data?.image?.data && (
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${props.data.image.data.attributes.url}`}
                width={546}
                height={470}
                alt=''
              />
            )}
          </Col>
          <Col sm={24} md={12} className='service-introduce-text' data-aos='fade-left' data-aos-offset='300'>
            <h3 className='service-introduce-title' dangerouslySetInnerHTML={{ __html: props.data?.title ?? '' }}></h3>
            <p className='service-introduce-content'>{props.data?.content}</p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const introducePropTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    image: PropTypes.any,
  }),
};

type IntroduceTypes = InferProps<typeof introducePropTypes>;

export { Introduce };
