import { ArrowRightOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CardItem = (props: any) => {
  const { locale = 'en' } = useRouter();
  const pathLink = `/${locale}/blog/`;
  const { dataCard, dataNoCMS } = props;

  return (
    <>
      {dataCard && dataCard[0] && (
        <Row gutter={24} key={dataCard[0]?.id} className='blog-post-large'>
          <Col xs={24} md={12} className='blog-post-large__image'>
            {dataCard[0]?.attributes?.thumbnail?.data && (
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${dataCard[0].attributes.thumbnail.data.attributes.url}`}
                alt={dataCard[0].attributes.thumbnail.data.attributes.alternativeText || ''}
                placeholder='blur'
                blurDataURL='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NTAgNDMwIj4NCiAgICA8cmVjdCB3aWR0aD0iNTUwIiBoZWlnaHQ9IjQzMCIgZmlsbD0iI2JmYmZiZiI+PC9yZWN0Pg0KICAgIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjI2cHgiIGZpbGw9IiMzMzMzMzMiPjU1MHg0MzA8L3RleHQ+ICAgDQo8L3N2Zz4='
                width={560}
                height={320}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            )}
          </Col>
          <Col xs={24} md={12} className='blog-post-large__content'>
            <p className='text-preamble blog-post-large__content--hashtag'>
              #{dataCard[0].attributes?.blog_category?.data?.attributes?.name}
            </p>
            <Link
              prefetch={false}
              href={`${pathLink}${decodeURIComponent(`${dataCard[0]?.attributes?.slug}`)}`}
              role='button'
              className='blog-post-large__content--title'
            >
              {dataCard[0].attributes?.title}
            </Link>
            <p className='blog-post-large__content--description'>{dataCard[0].attributes?.description}</p>
            <div className='blog-post-large__content--link'>
              <Link prefetch={false} href={`${pathLink}${decodeURIComponent(`${dataCard[0]?.attributes?.slug}`)}`} role='button'>
                {dataNoCMS?.view_more} <ArrowRightOutlined />
              </Link>
            </div>
          </Col>
        </Row>
      )}
      <Row gutter={[24, 24]} className='blog-post-small'>
        {dataCard?.slice(1, dataCard.length).map((item) => (
          <Col xs={24} md={12} lg={8} key={item?.id} className='blog-post-small__card'>
            <Card
              hoverable
              className='card-post'
              cover={
                <>
                  {item?.attributes?.thumbnail?.data && (
                    <Image
                      alt={item.attributes.thumbnail.data.attributes.alternativeText || ''}
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item?.attributes?.thumbnail?.data?.attributes?.url}`}
                      placeholder='blur'
                      blurDataURL='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMzAwIj4KICAgIDxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjYmZiZmJmIj48L3JlY3Q+CiAgICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIyNnB4IiBmaWxsPSIjMzMzMzMzIj40MDB4MzAwPC90ZXh0PiAgIAo8L3N2Zz4='
                      fill
                      sizes='(min-width: 0px) 100vw'
                    />
                  )}
                  <a className='card-post-hashtag'>{item?.attributes?.blog_category?.data?.attributes?.name}</a>
                </>
              }
            >
              <p className='card-post-timeView'>{dayjs(item?.attributes?.createdAt).locale(locale).startOf('hour').fromNow()}</p>
              <Card.Meta
                title={
                  <Link
                    prefetch={false}
                    href={`${pathLink}${decodeURIComponent(`${item?.attributes?.slug}`)}`}
                    title={item?.attributes?.title}
                  >
                    {item?.attributes?.title}
                  </Link>
                }
                description={
                  <div className='card-post-link'>
                    <Link prefetch={false} href={`${pathLink}${decodeURIComponent(`${item?.attributes?.slug}`)}`}>
                      {dataNoCMS?.view_more} <ArrowRightOutlined />
                    </Link>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export { CardItem };
