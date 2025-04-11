import { Col, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes, { InferProps } from 'prop-types';

import { Button } from '@components/button';

const AboutBackdrop = (props: BackdropTypes) => {
  const { data, dataNoCMS } = props;

  const backgroundImage = data?.backdropBackground?.data?.attributes?.url
    ? `url(${process.env.NEXT_PUBLIC_STRAPI_URL}${data.backdropBackground.data.attributes.url})`
    : undefined;

  return (
    <div className='aboutUs-backdrop' style={{ backgroundImage }}>
      <div className='container'>
        <Row gutter={24}>
          <Col xs={24} md={16} xl={14}>
            <h2 className='aboutUs-backdrop-title'>{data?.backdropTitle}</h2>
            <p className='aboutUs-backdrop-description'>{data?.backdropDescription}</p>
            <div className='aboutUs-backdrop-groupBtn'>
              <Link prefetch={false} href={data?.moreUrl || ''} target='_blank'>
                <Button type='primary' size='large' className='btn-border'>
                  {dataNoCMS?.view_more}
                </Button>
              </Link>
            </div>
          </Col>
          <Col xs={24} md={8} xl={10}>
            {data?.backdropImage?.data?.attributes?.url && (
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data.backdropImage.data.attributes.url}`}
                alt={data.backdropImage.data.attributes.alternativeText || ''}
                width={data.backdropImage.data.attributes.width}
                height={data.backdropImage.data.attributes.height}
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
  );
};

const backdropPropTypes = {
  data: PropTypes.shape({
    backdropTitle: PropTypes.string,
    backdropDescription: PropTypes.string,
    backdropBackground: PropTypes.any,
    backdropImage: PropTypes.any,
    moreUrl: PropTypes.string,
  }),
  dataNoCMS: PropTypes.shape({
    view_more: PropTypes.string,
  }),
};

type BackdropTypes = InferProps<typeof backdropPropTypes>;

export { AboutBackdrop };
