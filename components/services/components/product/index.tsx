import { ArrowRightOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { InferProps } from 'prop-types';

import { Button } from '@components/button';

const Product = (props: ProductTypes) => {
  return (
    <div className='service-product'>
      <div className='container'>
        <Row gutter={24}>
          <Col span={24} className='service-product-text' data-aos='zoom-in'>
            <h2 className='text-preamble service-product-preamble'>
              DỰ ÁN CỦA <span>AMIT</span>
            </h2>
            <p className='service-product-title'>Lorem ipsum dolor sit amet.</p>
          </Col>
        </Row>
        <Row gutter={[24, 24]} className='service-product-list' data-aos='fade-up' data-aos-duration='500'>
          <Col sm={24} xs={12} md={8} className='service-product-item'>
            <Card
              hoverable
              className='card-post service-product-card'
              cover={
                <div className='service-product-card__image'>
                  <Image alt='example' src='https://via.placeholder.com/500x400.png' fill sizes='(min-width: 0px) 100vw' />
                  <Link prefetch={false} href='/' className='service-product-card__image--icon'>
                    <EllipsisOutlined width={32} height={32} />
                  </Link>
                </div>
              }
            >
              <Card.Meta
                title={
                  <Link prefetch={false} href='/'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </Link>
                }
                description={
                  <>
                    <p className='service-product-card__content'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, veritatis.
                    </p>
                    <div className='card-post-link'>
                      <Link prefetch={false} href='/'>
                        Xem chi tiết <ArrowRightOutlined />
                      </Link>
                    </div>
                  </>
                }
              />
            </Card>
          </Col>
          <Col sm={24} xs={12} md={8} className='service-product-item'>
            <Card
              hoverable
              className='card-post service-product-card'
              cover={
                <div className='service-product-card__image'>
                  <Image alt='example' src='https://via.placeholder.com/500x400.png' fill sizes='(min-width: 0px) 100vw' />
                  <Link prefetch={false} href='/' className='service-product-card__image--icon'>
                    <EllipsisOutlined width={32} height={32} />
                  </Link>
                </div>
              }
            >
              <Card.Meta
                title={
                  <Link prefetch={false} href='/'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </Link>
                }
                description={
                  <>
                    <p className='service-product-card__content'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, veritatis.
                    </p>
                    <div className='card-post-link'>
                      <Link prefetch={false} href='/'>
                        Xem chi tiết <ArrowRightOutlined />
                      </Link>
                    </div>
                  </>
                }
              />
            </Card>
          </Col>
          <Col sm={24} xs={12} md={8} className='service-product-item'>
            <Card
              hoverable
              className='card-post service-product-card'
              cover={
                <div className='service-product-card__image'>
                  <Image alt='example' src='https://via.placeholder.com/500x400.png' fill sizes='(min-width: 0px) 100vw' />
                  <Link prefetch={false} href='/' className='service-product-card__image--icon'>
                    <EllipsisOutlined width={32} height={32} />
                  </Link>
                </div>
              }
            >
              <Card.Meta
                title={
                  <Link prefetch={false} href='/'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </Link>
                }
                description={
                  <>
                    <p className='service-product-card__content'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, veritatis.
                    </p>
                    <div className='card-post-link'>
                      <Link prefetch={false} href='/'>
                        Xem chi tiết <ArrowRightOutlined />
                      </Link>
                    </div>
                  </>
                }
              />
            </Card>
          </Col>
          <Button size='large' className='service-product-button'>
            <Link prefetch={false} href='/'>
              Xem thêm
            </Link>
          </Button>
        </Row>
      </div>
    </div>
  );
};

const productPropTypes = {};

type ProductTypes = InferProps<typeof productPropTypes>;

export { Product };
