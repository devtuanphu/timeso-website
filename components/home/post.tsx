import { ArrowRightOutlined } from '@ant-design/icons';
import { Button } from '@components/button';
import { Card, Col, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes, { InferProps } from 'prop-types';

const Post = (props: PostTypes) => {
  return (
    <div className='home-post'>
      <div className='container'>
        <Row gutter={24}>
          <Col span={24}>
            <div className='home-post-top'>
              <h2 className='home-post-title'>{props.title}</h2>
              <Button type='primary' size='large'>
                <Link prefetch={false} href='/blog'>
                  {props.button_name}
                </Link>
              </Button>
            </div>
          </Col>
        </Row>
        <Row gutter={[24, 24]} className='home-post-card__list'>
          <Col xs={24} sm={8} className='home-post-card__item'>
            <Card
              hoverable
              className='card-post'
              cover={
                <div className='card-post-image'>
                  <Image alt='example' src='https://via.placeholder.com/500x400.png' fill sizes='(min-width: 0px) 100vw' />
                  <Link prefetch={false} href='/' className='card-post-hashtag'>
                    Hashtag
                  </Link>
                </div>
              }
            >
              <p className='card-post-timeView'>10 ngày trước</p>
              <Card.Meta
                title={
                  <Link prefetch={false} href='/' className='card-post-title'>
                    Trách nhiệm với từng giải pháp
                  </Link>
                }
                description={
                  <>
                    <div className='card-post-link'>
                      <Link prefetch={false} href='/'>
                        Xem thêm <ArrowRightOutlined />
                      </Link>
                    </div>
                  </>
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={8} className='home-post-card__item'>
            <Card
              hoverable
              className='card-post'
              cover={
                <div className='card-post-image'>
                  <Image alt='example' src='https://via.placeholder.com/500x400.png' fill sizes='(min-width: 0px) 100vw' />
                  <Link prefetch={false} href='/' className='card-post-hashtag'>
                    Hashtag
                  </Link>
                </div>
              }
            >
              <p className='card-post-timeView'>10 ngày trước</p>
              <Card.Meta
                title={
                  <Link prefetch={false} href='/' className='card-post-title'>
                    Trách nhiệm với từng giải pháp
                  </Link>
                }
              />
              <div className='card-post-link'>
                <Link prefetch={false} href='/'>
                  Xem thêm <ArrowRightOutlined />
                </Link>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8} className='home-post-card__item'>
            <Card
              hoverable
              className='card-post'
              cover={
                <div className='card-post-image'>
                  <Image alt='example' src='https://via.placeholder.com/500x400.png' fill sizes='(min-width: 0px) 100vw' />
                  <Link prefetch={false} href='/' className='card-post-hashtag'>
                    Hashtag
                  </Link>
                </div>
              }
            >
              <p className='card-post-timeView'>10 ngày trước</p>
              <Card.Meta
                title={
                  <Link prefetch={false} href='/' className='card-post-title'>
                    Trách nhiệm với từng giải pháp
                  </Link>
                }
              />
              <div className='card-post-link'>
                <Link prefetch={false} href='/'>
                  Xem thêm <ArrowRightOutlined />
                </Link>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const postPropTypes = {
  title: PropTypes.string,
  button_name: PropTypes.string,
};
type PostTypes = InferProps<typeof postPropTypes>;

export { Post };
