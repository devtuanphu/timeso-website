import { Col, Row } from 'antd';
import Image from 'next/image';
import PropTypes, { InferProps } from 'prop-types';
import { useWindowSize } from 'usehooks-ts';

const Introduce = (props: IntroduceTypes) => {
  const { width, height } = useWindowSize();
  const { data } = props;
  return (
    <div className='aboutUs-introduce'>
      <div className='container'>
        <Row gutter={[24, width > 767 ? 16 : 0]}>
          <Col xs={24} md={8} lg={10} xl={10} data-aos='fade-right' data-aos-offset='300'>
            <div className='aboutUs-introduce-image'>
              {data?.bannerBackground?.data && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data?.introduceImage?.data?.attributes?.url}`}
                  alt=''
                  quality={100}
                  fill
                  sizes='(min-width: 0px) 100vw'
                />
              )}
            </div>
          </Col>
          <Col xs={24} md={16} lg={14} xl={14} className='aboutUs-introduce-right'>
            <div className='aboutUs-introduce-box'>
              <h2 className='aboutUs-introduce-title' data-aos='zoom-in'>
                <div>{data?.introduceTitle2}</div>
                {data?.introduceTitle1}
              </h2>
              <p className='aboutUs-introduce-content' data-aos='zoom-in'>
                {data?.introduceContent}
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const introducePropTypes = {
  sub_title: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  data: PropTypes.shape({
    introduceTitle1: PropTypes.string,
    introduceTitle2: PropTypes.string,
    introduceContent: PropTypes.string,
    introduceImage: PropTypes.shape({
      data: PropTypes.shape({
        id: PropTypes.number,
        attributes: PropTypes.shape({
          url: PropTypes.string,
          alternativeText: PropTypes.string,
        }),
      }),
    }),
    bannerBackground: PropTypes.any,
  }),
};

type IntroduceTypes = InferProps<typeof introducePropTypes>;

export { Introduce };
