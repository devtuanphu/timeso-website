import { Col, Row } from 'antd';
import Image from 'next/image';
import PropTypes, { InferProps } from 'prop-types';

const OffshoreService = (props: ServiceTypes) => {
  return (
    <div className='service-offshoreService'>
      <div className='container'>
        <Row gutter={24} justify='center'>
          <Col xs={24} md={24} lg={16} data-aos='zoom-in'>
            <h3 className='service-offshoreService-title'>{props.title}</h3>
            <p className='service-offshoreService-content'>{props.description}</p>
          </Col>
        </Row>
        <Row gutter={[24, 24]} className='service-offshoreService-list' justify='center'>
          {props.content?.map((item, index) => (
            <Col key={index} xs={12} md={8} lg={6} data-aos='fade-up' data-aos-duration='1000'>
              <div className='service-offshoreService-item'>
                <div className='service-offshoreService-item__image'>
                  {item?.image?.data && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image.data.attributes.url}`}
                      width='70'
                      height='70'
                      alt={item?.title ?? ''}
                    />
                  )}
                </div>
                <p className='service-offshoreService-item__content'>{item?.title}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

const servicePropTypes = {
  title: PropTypes.element,
  description: PropTypes.string,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      image: PropTypes.any,
      title: PropTypes.string,
    })
  ).isRequired,
};

type ServiceTypes = InferProps<typeof servicePropTypes>;

export { OffshoreService };
