import { ArrowRightOutlined } from '@ant-design/icons';
import { Card, Col } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import PopupDetail from './_popup-detail';

const CardItem = (props: any) => {
  const { data, dataNoCMS } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectSlug, setProjectSlug] = useState<string>('');
  const { width, height } = useWindowSize();
  const router = useRouter();

  const showModal = (slug: string, e: React.MouseEvent<HTMLElement> | null) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (slug && width < 768) {
      router.push(`/case-studies/${slug}`);
    } else {
      setIsModalOpen(true);
      setProjectSlug(slug || '');
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {data?.map((item) => {
        return (
          <Col
            xs={24}
            md={12}
            lg={8}
            key={item.id}
            className='caseStudies-product-item'
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              showModal(item.attributes.slug, e);
            }}
          >
            <Card
              hoverable
              className='card-post caseStudies-product-card'
              cover={
                <div className='caseStudies-product-card__image'>
                  {!!item.attributes.image?.data && (
                    <Image
                      alt={item.attributes.image?.data?.attributes.alternativeText || ''}
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.attributes.image?.data?.attributes.url}`}
                      placeholder='blur'
                      blurDataURL='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMzAwIj4KICAgIDxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjYmZiZmJmIj48L3JlY3Q+CiAgICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIyNnB4IiBmaWxsPSIjMzMzMzMzIj40MDB4MzAwPC90ZXh0PiAgIAo8L3N2Zz4='
                      quality={100}
                      fill
                      sizes='(min-width: 0px) 100vw'
                    />
                  )}
                  <p className='category'>{item.attributes.project_category?.data?.attributes.name}</p>
                </div>
              }
            >
              <Card.Meta
                title={
                  <>
                    <p>
                      {dataNoCMS?.category_type &&
                        (item.attributes.isSaas ? dataNoCMS?.category_type[1] : dataNoCMS?.category_type[0])}
                    </p>
                    <p className='caseStudies-product-card__name'>{item.attributes.name}</p>
                  </>
                }
                description={<p className='caseStudies-product-card__content'>{item.attributes.description}</p>}
              />
              <div className='card-post-link caseStudies-product-card__link'>
                <a role='button' onClick={(e: React.MouseEvent<HTMLElement>) => showModal(item.attributes.slug, e)}>
                  {dataNoCMS?.view_detail} <ArrowRightOutlined />
                </a>
              </div>
            </Card>
          </Col>
        );
      })}

      <PopupDetail open={isModalOpen} cancel={handleCancel} projectSlug={projectSlug} />
    </>
  );
};

export { CardItem };
