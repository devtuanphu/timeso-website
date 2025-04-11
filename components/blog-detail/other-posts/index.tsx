import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes, { InferProps } from 'prop-types';
import Carousel from 'react-multi-carousel';
import { useWindowSize } from 'usehooks-ts';

const OtherPosts = (props: OtherPostsTypes) => {
  const { dataBlog } = props;

  const { locale = 'en' } = useRouter();
  const { width, height } = useWindowSize();

  return (
    <>
      {dataBlog?.data && dataBlog?.data.length > 0 ? (
        <div className='blogdetail-otherposts'>
          <div className='container'>
            <Row gutter={[24, 24]} className='blogdetail-otherposts-list'>
              <Col span={24} className='blogdetail-otherposts-top'>
                <p className='blogdetail-otherposts-title'>{props.other_blog?.title}</p>
                <Link prefetch={false} href={props.other_blog?.slug || ''}>
                  <Button type='primary' size={width > 767 ? 'large' : 'small'}>
                    {props.other_blog?.button}
                  </Button>
                </Link>
              </Col>
            </Row>
            {width > 767 ? (
              <Row gutter={24}>
                {dataBlog?.data.slice(0, 3).map((item, index: number) => (
                  <Col key={index} xs={24} sm={8} className='blogdetail-otherposts-card__item'>
                    <Card
                      hoverable
                      className='card-post'
                      cover={
                        <div className='card-post-image'>
                          {item?.attributes?.thumbnail?.data && (
                            <Image
                              alt={item?.attributes?.thumbnail?.data?.attributes?.alternativeText || ''}
                              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item?.attributes?.thumbnail?.data?.attributes?.url}`}
                              quality={100}
                              fill
                              sizes='(min-width: 0px) 100vw'
                            />
                          )}
                          <a className='card-post-hashtag'>{item?.attributes?.blog_category?.data?.attributes?.name}</a>
                        </div>
                      }
                    >
                      <p className='card-post-timeView'>
                        {dayjs(item?.attributes?.createdAt).locale(locale).startOf('hour').fromNow()}
                      </p>
                      <Card.Meta
                        title={
                          <Link prefetch={false} href='/' className='card-post-title'>
                            {item?.attributes?.title}
                          </Link>
                        }
                        description={
                          <>
                            <div className='card-post-link'>
                              <Link prefetch={false} href={`/blog/${decodeURIComponent(`${item?.attributes?.slug}`)}`}>
                                {props.other_blog?.view_detail} <ArrowRightOutlined />
                              </Link>
                            </div>
                          </>
                        }
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <Row>
                <Col span={24}>
                  <Carousel
                    responsive={responsive}
                    focusOnSelect
                    arrows={false}
                    ssr={true}
                    containerClass='blogdetail-otherposts-carousel__container'
                    itemClass='blogdetail-otherposts-carousel__item'
                    keyBoardControl={true}
                    centerMode={false}
                  >
                    {dataBlog.data.map((item, index: number) => (
                      <Col key={index} className='blogdetail-otherposts-card__item'>
                        <Card
                          hoverable
                          className='card-post'
                          cover={
                            <div className='card-post-image'>
                              {item?.attributes?.thumbnail?.data && (
                                <Image
                                  alt={item?.attributes?.thumbnail?.data?.attributes?.alternativeText || ''}
                                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item?.attributes?.thumbnail?.data?.attributes?.url}`}
                                  quality={100}
                                  fill
                                  sizes='(min-width: 0px) 100vw'
                                />
                              )}
                              <a className='card-post-hashtag'>{item?.attributes?.blog_category?.data?.attributes?.name}</a>
                            </div>
                          }
                        >
                          <p className='card-post-timeView'>
                            {dayjs(item?.attributes?.createdAt).locale(locale).startOf('hour').fromNow()}
                          </p>
                          <Card.Meta
                            title={
                              <Link prefetch={false} href='/' className='card-post-title'>
                                {item?.attributes?.title}
                              </Link>
                            }
                            description={
                              <>
                                <div className='card-post-link'>
                                  <Link prefetch={false} href={`/blog/${decodeURIComponent(item?.attributes?.slug || '')}`}>
                                    {props.other_blog?.view_detail} <ArrowRightOutlined />
                                  </Link>
                                </div>
                              </>
                            }
                          />
                        </Card>
                      </Col>
                    ))}
                  </Carousel>
                </Col>
              </Row>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

const otherPostsPropTypes = {
  dataBlog: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        attributes: PropTypes.shape({
          title: PropTypes.string,
          description: PropTypes.string,
          content: PropTypes.string,
          keywords: PropTypes.arrayOf(PropTypes.string),
          slug: PropTypes.string,
          createdAt: PropTypes.string,
          banner: PropTypes.shape({
            id: PropTypes.number,
            attributes: PropTypes.shape({
              alternativeText: PropTypes.string,
              url: PropTypes.string,
            }),
          }),
          blog_category: PropTypes.shape({
            data: PropTypes.shape({
              id: PropTypes.number,
              attributes: PropTypes.shape({
                name: PropTypes.string,
              }),
            }),
          }),
          thumbnail: PropTypes.shape({
            data: PropTypes.shape({
              id: PropTypes.number,
              attributes: PropTypes.shape({
                alternativeText: PropTypes.string,
                url: PropTypes.string,
              }),
            }),
          }),
        }),
      })
    ),
    meta: PropTypes.shape({
      pagination: PropTypes.shape({
        page: PropTypes.number.isRequired,
        pageSize: PropTypes.number.isRequired,
        pageCount: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
      }),
    }),
  }),
  other_blog: PropTypes.shape({
    title: PropTypes.string,
    button: PropTypes.string,
    view_detail: PropTypes.string,
    slug: PropTypes.string,
  }),
};

type OtherPostsTypes = InferProps<typeof otherPostsPropTypes>;

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 767 },
    items: 1.75,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 1.25,
  },
};

export { OtherPosts };
