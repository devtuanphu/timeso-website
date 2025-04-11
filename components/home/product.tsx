import { Col, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@components/button';

export type ProductProps = {
  preamble: string;
  title: string;
  content: string;
  image: Single<StrapiMedia>;
  button: StrapiButton;
  products: Multiple<{
    image: Single<StrapiMedia>;
    title: string;
    content: string;
  }>;
};

const Product = (props: ProductProps) => {
  const { preamble, title, content, image, products, button } = props;

  return (
    <div className='home-product' id='homeProducts'>
      <div className='container'>
        <Row gutter={24}>
          <Col xs={24} md={12} xl={14} className='home-product-left'>
            <div className='home-product-left__box' data-aos='fade-right' data-aos-duration='1000'>
              <h2 className='text-preamble home-product-left__preamble' dangerouslySetInnerHTML={{ __html: preamble }}></h2>
              <h3 className='home-product-left__title'>{title}</h3>
              <p className='home-product-left__content'>{content}</p>
              <Link prefetch={false} href={button?.url ?? ''}>
                <Button type='primary' size='large' className='home-product-left__button'>
                  {button?.text}
                </Button>
              </Link>
            </div>
            <div className='home-product-left__image'>
              {image.data && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${image.data.attributes.url}`}
                  alt='productImage'
                  width={image.data.attributes.width || 200}
                  height={image.data.attributes.height || 200}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
              )}
            </div>
          </Col>
          <Col xs={24} md={12} xl={10} className='home-product-right'>
            <div className='home-product-right__list' data-aos='fade-left' data-aos-duration='1000'>
              {products.data?.map((item, index) => (
                <div className='home-product-right__item' key={index}>
                  <div className='home-product-right__item--image'>
                    {item.attributes.image.data && (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.attributes.image.data.attributes.url}`}
                        alt={item.attributes.image.data.attributes.alternativeText || ''}
                        fill
                        sizes='(min-width: 0px) 100vw'
                      />
                    )}
                  </div>
                  <div>
                    <p className='home-product-right__item--title'>{item.attributes.title}</p>
                    <p className='home-product-right__item--content'>{item.attributes.content}</p>
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

export default Product;
