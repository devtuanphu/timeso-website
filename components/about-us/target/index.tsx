import { Col, Row, Tabs } from 'antd';
import Image from 'next/image';
import PropTypes, { InferProps } from 'prop-types';

const Target = (props: TargetTypes) => {
  const { data } = props;
  const dataTab = [
    {
      title: data?.targetTitle1,
      content: data?.targetContent1,
    },
    {
      title: data?.targetTitle2,
      content: data?.targetContent2,
    },
    {
      title: data?.targetTitle3,
      content: data?.targetContent3,
    },
  ];

  const dataItems = dataTab.map((item, index) => ({
    label: item?.title,
    key: 'item-' + index,
    children: <p>{item.content}</p>,
    className: 'aboutUs-target-left__tab--item',
  }));

  return (
    <div className='aboutUs-target'>
      <div className='aboutUs-target-background' />
      <div className='container'>
        <Row gutter={24} className='aboutUs-target-container'>
          <Col xs={24} md={12} xl={12} data-aos='fade-right' style={{ zIndex: 1 }}>
            <div className='aboutUs-target-left'>
              <h2 className='aboutUs-target-left__title'>{data?.targetTitle}</h2>
              <Tabs items={dataItems} className='aboutUs-target-left__tab' />
            </div>
          </Col>
          <Col xs={24} md={12} xl={12} data-aos='fade-left' className='aboutUs-target-right'>
            {data?.targetImage?.data?.attributes?.url && (
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data.targetImage.data.attributes.url}`}
                alt={data.targetImage.data.attributes.alternativeText || ''}
                quality={100}
                fill
                sizes='(min-width: 0px) 100vw'
              />
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

const targetPropTypes = {
  data: PropTypes.shape({
    targetTitle: PropTypes.string,
    targetTitle1: PropTypes.string,
    targetTitle2: PropTypes.string,
    targetTitle3: PropTypes.string,
    targetContent1: PropTypes.string,
    targetContent2: PropTypes.string,
    targetContent3: PropTypes.string,
    targetImage: PropTypes.shape({
      data: PropTypes.shape({
        id: PropTypes.number,
        attributes: PropTypes.shape({
          url: PropTypes.string,
          alternativeText: PropTypes.string,
          width: PropTypes.number,
          height: PropTypes.number,
        }),
      }),
    }),
  }),
};

type TargetTypes = InferProps<typeof targetPropTypes>;

export { Target };
