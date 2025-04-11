import { Col, Row } from 'antd';
import PropTypes, { InferProps } from 'prop-types';

const BlogDetailBanner = (props: BlogDetailTypes) => {
  const { className, data } = props;

  return (
    <div
      className={`blogdetail-banner ${className}`}
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_STRAPI_URL}${data?.attributes?.banner?.data?.attributes?.url})`,
      }}
    >
      <div className='container'>
        <Row gutter={24}>
          <Col span={24}>
            <p className='blogdetail-banner-hashtag'>#{data?.attributes?.blog_category?.data?.attributes?.name}</p>
            <h1 className='blogdetail-banner-title'>{data?.attributes?.title}</h1>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const blogDetailPropTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    id: PropTypes.number,
    attributes: PropTypes.shape({
      title: PropTypes.string,
      banner: PropTypes.shape({
        data: PropTypes.shape({
          id: PropTypes.number,
          attributes: PropTypes.shape({
            alternativeText: PropTypes.string,
            url: PropTypes.string,
          }),
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
    }),
  }),
};

type BlogDetailTypes = InferProps<typeof blogDetailPropTypes>;

export { BlogDetailBanner };
