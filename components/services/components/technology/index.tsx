import { Col, Row } from 'antd';
import Image from 'next/image';
import PropTypes, { InferProps } from 'prop-types';

const Technology = (props: TechTypes) => {
  return (
    <div className={`service-technology ${props.noBackground ? 'noBackground' : ''}`}>
      <div className='container'>
        <Row gutter={24} justify='center'>
          <Col xs={24} md={24} data-aos='zoom-in'>
            <h2 className='service-technology-title'>{props.title}</h2>
          </Col>
          <Col xs={24} lg={20} data-aos='zoom-in'>
            <p className='service-technology-content'>{props.description}</p>
          </Col>
        </Row>
      </div>
      <div className='container'>
        <Row className='technologies'>
          <Col span={24} data-aos='fade-up' data-aos-duration='1000'>
            <div className='service-technology-list'>
              {props.technology?.map((img, index) => (
                <div className='service-technology-item' key={index}>
                  <div className='service-technology-item__image'>
                    {img.attributes.logo?.data && (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${img.attributes.logo.data.attributes.url}`}
                        width={60}
                        height={60}
                        alt={`Icon ${img.attributes.name}`}
                      />
                    )}
                  </div>
                  <p className='service-technology-item__name'>{img.attributes.name}</p>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const techPropTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  technology: PropTypes.any,
  noBackground: PropTypes.bool,
};

type TechTypes = InferProps<typeof techPropTypes>;

export { Technology };
