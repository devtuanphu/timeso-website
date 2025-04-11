import { ArrowRightOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

interface IService {
  image: Single<StrapiMedia>;
  title: string;
  description: string;
  url: string;
}

type ServiceProps = Omit<IService, 'url'> & {
  button: {
    url: string;
    text: string;
  };
};

const Service = (props: ServiceProps) => {
  const { image, title, description, button } = props;

  return (
    <Col xs={24} md={12} xl={8} className='home-service-item' data-aos='fade-up' data-aos-duration='1000'>
      <div className='home-service-item__box'>
        <div className='home-service-item__image'>
          {image.data && (
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${image.data.attributes.url}`}
              width={80}
              height={80}
              alt={image.data.attributes.alternativeText || ''}
              quality={100}
            />
          )}
        </div>
        <h6 className='home-service-item__title'>{title}</h6>
        <p className='home-service-item__description'>{description}</p>
        <div className='home-service-item__button'>
          <Link prefetch={false} href={button.url}>
            {button.text} <ArrowRightOutlined />
          </Link>
        </div>
      </div>
    </Col>
  );
};

export type ServicesProps = {
  title: string;
  description: string;
  services: Multiple<IService>;
  buttonText: string;
};

const Services = (props: ServicesProps) => {
  const { title, description, services, buttonText } = props;

  return (
    <div className='home-service'>
      <div className='container'>
        <Row gutter={24} justify='center'>
          <Col xs={24} xl={16}>
            <div className='home-service-text'>
              <h2 className='home-service-title'>{title}</h2>
              <p className='home-service-description' data-aos='zoom-in' data-aos-delay='300'>
                {description}
              </p>
            </div>
          </Col>
        </Row>
        <Row gutter={[24, 24]} justify='center' className='home-service-list'>
          {services.data?.map((service) => (
            <Service
              key={service.id}
              image={service.attributes.image}
              title={service.attributes.title}
              description={service.attributes.description}
              button={{
                url: service.attributes.url,
                text: buttonText,
              }}
            />
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Services;
