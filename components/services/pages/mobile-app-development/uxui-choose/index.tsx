import { Col, Row } from 'antd';
import Image from 'next/image';
import PropTypes, { InferProps } from 'prop-types';

const UXUIChoose = (props: ChooseTypes) => {
  return (
    <div className='service-uxuiChoose'>
      <div className='container'>
        <Row gutter={24} justify='center'>
          <Col xs={24} md={24} lg={24} data-aos='zoom-in'>
            <h2
              className='text-preamble service-uxuiChoose-preamble'
              dangerouslySetInnerHTML={{ __html: props.preamble || '' }}
            />
            <h3 className='service-uxuiChoose-title'>{props.title}</h3>
          </Col>
          <Col xs={24} md={24} lg={16} data-aos='zoom-in'>
            <p className='service-uxuiChoose-content'>{props.description}</p>
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          {props.content?.map((item, index) => (
            <Col key={index} xs={12} md={6} data-aos='fade-up' data-aos-duration='500'>
              <div className='service-uxuiChoose-item'>
                <div className='service-uxuiChoose-item__image'>
                  {item?.image?.data && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image.data.attributes.url}`}
                      width={80}
                      height={80}
                      alt=''
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                      }}
                    />
                  )}
                </div>
                <p className='service-uxuiChoose-item__title' dangerouslySetInnerHTML={{ __html: item?.title ?? '' }}></p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

const chooseBenefitPropTypes = {
  preamble: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.any,
      title: PropTypes.string,
    })
  ).isRequired,
};

type ChooseTypes = InferProps<typeof chooseBenefitPropTypes>;

export { UXUIChoose };
