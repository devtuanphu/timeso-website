import { Col, Row } from 'antd';
import Image from 'next/image';
import PropTypes, { InferProps } from 'prop-types';

const CareerChoose = (props: ChooseTypes) => {
  return (
    <div className='career-choose'>
      <div className='container'>
        <Row gutter={24}>
          <Col xs={24} lg={10}>
            <p className='text-preamble career-choose-preamble' dangerouslySetInnerHTML={{ __html: props.preamble || '' }}></p>
            <h3 className='career-choose-title'>{props.data.chooseTitle}</h3>
            <div className='career-choose-image'>
              {props.image?.data?.attributes?.url && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${props.image.data.attributes.url}`}
                  alt='chooseImage'
                  width={props.image.data.attributes.width}
                  height={props.image.data.attributes.height}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
              )}
            </div>
          </Col>
          <Col xs={24} lg={14}>
            <div className='career-choose-list'>
              {props.data.career_chooses &&
                props.data.career_chooses.data.map((item, index) => (
                  <div key={index} className='career-choose-item'>
                    <div className='career-choose-item__image'>
                      {item?.attributes.image.data && (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item?.attributes.image.data.attributes.url}`}
                          width={71}
                          height={71}
                          alt=''
                        />
                      )}
                    </div>
                    <div>
                      <p className='career-choose-item__title'>{item?.attributes.title}</p>
                      <p className='career-choose-item__content'>{item?.attributes.content}</p>
                    </div>
                  </div>
                ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const choosePropTypes = {
  preamble: PropTypes.string,
  image: PropTypes.any,
  data: PropTypes.shape({
    chooseTitle: PropTypes.string,
    career_chooses: PropTypes.any,
  }).isRequired,
};

type ChooseTypes = InferProps<typeof choosePropTypes>;

export { CareerChoose };
