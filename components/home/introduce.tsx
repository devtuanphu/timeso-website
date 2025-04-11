import { Col, Row } from 'antd';
import Image from 'next/image';

export type IntroduceProps = {
  image: Single<StrapiMedia>;
  preamble: string;
  title: string;
  content: string;
};

const Introduce = (props: IntroduceProps) => {
  const { image, preamble, title, content } = props;

  return (
    <div className='home-introduce'>
      <div className='container'>
        <Row gutter={24}>
          <Col sm={24} md={12} className='home-introduce-left'>
            <div className='home-introduce-image' data-aos='fade-right' data-aos-duration='1000'>
              {image.data && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${image.data.attributes.url}`}
                  alt={image.data.attributes.alternativeText || ''}
                  height='546'
                  width='546'
                  quality={100}
                />
              )}
            </div>
          </Col>
          <Col sm={24} md={12} className='home-introduce-right'>
            <span
              className='text-preamble home-introduce-preamble'
              data-aos='fade-left'
              data-aos-duration='1000'
              dangerouslySetInnerHTML={{ __html: preamble }}
            />
            <h3 className='home-introduce-title' data-aos='fade-left'>
              {title}
            </h3>
            <p className='home-introduce-content' data-aos='fade-left'>
              {content}
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Introduce;
