import { Col, Row } from 'antd';
import Image from 'next/image';

import { BgParticles } from '@components/bg-particles';
import Link from 'next/link';
import { Button } from '@components/button';

export type BannerProps = {
  background: Single<StrapiMedia>;
  preamble: string;
  title: string;
  description: string;
  content: string;
  button: StrapiButton | null;
  sideImage: Single<StrapiMedia>;
};

const Banner = (props: BannerProps) => {
  const { background, preamble, title, description, content, button, sideImage } = props;

  return (
    <div className='section-home'>
      {background.data && (
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${background.data.attributes.url}`}
          alt={background.data.attributes.alternativeText || ''}
          quality={100}
          fill
          sizes='(min-width: 0px) 100vw'
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      )}
      <BgParticles />
      <div className='home-banner'>
        <div className='container'>
          <Row gutter={24}>
            <Col xs={24} md={12} xl={14} className='home-banner-text' data-aos='zoom-in' data-aos-deplay='500'>
              <h2 className='text-preamble home-banner-preamble'>{preamble}</h2>
              <h1 className='home-banner-title'>{title}</h1>
              <h3 className='home-banner-description'>{description}</h3>
              <p className='home-banner-content'>{content}</p>
              {!!button && (
                <Link prefetch={false} href={process.env.NEXT_PUBLIC_STRAPI_URL + button.url} target='_blank'>
                  <Button type='primary' size='large'>
                    {button.text}
                  </Button>
                </Link>
              )}
            </Col>
            <Col xs={24} md={14} xl={12} className='home-banner-logo' data-aos='zoom-in'>
              {sideImage.data && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${sideImage.data.attributes.url}`}
                  width={sideImage.data.attributes.width || 0}
                  height={sideImage.data.attributes.height || 0}
                  quality={100}
                  alt={sideImage.data.attributes.alternativeText || ''}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
              )}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Banner;
