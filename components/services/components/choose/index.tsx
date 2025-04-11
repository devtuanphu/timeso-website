import { Col, Row } from 'antd';
import Image from 'next/image';
import PropTypes, { InferProps } from 'prop-types';

const Choose = (props: ChooseTypes) => {
  return (
    <div className='service-choose'>
      <div className='container'>
        <Row gutter={24}>
          <Col xs={24} md={10} lg={12}>
            <div data-aos='fade-right'>
              <h2 className='text-preamble service-choose-preamble'>{props.preamble}</h2>
              <p className='service-choose-title'>{props.title}</p>
              <div className='service-choose-image'>
                <Image src='https://via.placeholder.com/500x600.png' width={546} height={451} alt='' />
              </div>
            </div>
          </Col>
          {props.data && (
            <Col xs={24} md={14} lg={12}>
              <div className='service-choose-list'>
                <div className='service-choose-column'>
                  {props.data.map((item, index) => {
                    if (index % 2 === 0) {
                      return (
                        <div key={item?.id} className='service-choose-item' data-aos='fade-up' data-aos-duration='1000'>
                          <Image src='https://via.placeholder.com/71x71.png' width={71} height={71} alt='' />
                          <p className='service-choose-item__title'>
                            {index + 1}. {item?.title}
                          </p>
                          <p className='service-choose-item__content'>{item?.content}</p>
                        </div>
                      );
                    }
                  })}
                </div>
                <div className='service-choose-column'>
                  {props.data.map((item, index) => {
                    if (index % 2 !== 0) {
                      return (
                        <div key={item?.id} className='service-choose-item' data-aos='fade-up' data-aos-duration='1000'>
                          <Image
                            className='service-choose-item__image'
                            src='https://via.placeholder.com/71x71.png'
                            width={71}
                            height={71}
                            alt=''
                          />
                          <p className='service-choose-item__title'>
                            {index + 1}. {item?.title}
                          </p>
                          <p className='service-choose-item__content'>{item?.content}</p>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
};

const choosePropTypes = {
  preamble: PropTypes.element,
  title: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      image: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.string,
    })
  ),
};

type ChooseTypes = InferProps<typeof choosePropTypes>;

export { Choose };
