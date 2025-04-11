import { Col, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes, { InferProps } from 'prop-types';
import { useWindowSize } from 'usehooks-ts';

import { Button } from '@components/button';

const Solutions = (props: SolutionsTypes) => {
  const { width, height } = useWindowSize();
  const handleOpenDownload = (slugs: any) => {
    slugs?.map((slug: any, index: number) => {
      window.open(`${process.env.NEXT_PUBLIC_STRAPI_URL}${slug.attributes.url}`);
    });
  };

  return (
    <div className='serivce-solutions'>
      <Row gutter={24} justify='center'>
        <Col xs={24} lg={16} className='serivce-solutions-top'>
          <h2
            className='text-preamble serivce-solutions-preamble'
            dangerouslySetInnerHTML={{ __html: props.preamble || '' }}
          ></h2>
          <h2 className='serivce-solutions-title'>{props.title}</h2>
        </Col>
      </Row>
      {props.content?.map((item: any, index) => (
        <div key={index} className={`serivce-solutions-item ${index % 2 != 0 ? 'item-odd' : ''}`}>
          <Row gutter={24} className='container'>
            <Col xs={24} md={12} order={width > 767 ? (index % 2 != 0 ? 1 : 0) : 2}>
              <h3 className='serivce-solutions-item__title'>{item?.title}</h3>
              <p className='serivce-solutions-item__solution'>{item?.subtitle}</p>
              <p className='serivce-solutions-item__content'>{item?.content}</p>
              <div className='serivce-solutions-item__button'>
                <Button size='large' onClick={() => handleOpenDownload(item?.proposal.data)}>
                  {props.dataNoCMS?.button_left?.title}
                </Button>
                <Link prefetch={false} href={`${props.dataNoCMS?.button_right?.slug}`}>
                  <Button size='large' className='btn-border'>
                    {props.dataNoCMS?.button_right?.title}
                  </Button>
                </Link>
              </div>
            </Col>
            <Col xs={24} md={12} className='serivce-solutions-item__image'>
              <div>
                {item?.image?.data && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image.data.attributes.url}`}
                    width={item.image.data.attributes.width}
                    height={item.image.data.attributes.height}
                    alt=''
                    quality={80}
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                )}
              </div>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
};

const solutionsPropTypes = {
  preamble: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.any,
      title: PropTypes.string,
      content: PropTypes.string,
      subtitle: PropTypes.string,
      url: PropTypes.string,
    })
  ).isRequired,
  dataNoCMS: PropTypes.any,
};

type SolutionsTypes = InferProps<typeof solutionsPropTypes>;

export { Solutions };
