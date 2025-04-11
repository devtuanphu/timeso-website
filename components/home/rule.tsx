import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Collapse, Row } from 'antd';
import Image from 'next/image';

export type RuleProps = {
  preamble: string;
  title: string;
  description: string;
  image: Single<StrapiMedia>;
  rules: Multiple<{
    title: string;
    content: string;
  }>;
};

const Rule = (props: RuleProps) => {
  const { preamble, title, description, rules, image } = props;

  return (
    <div className='home-rule'>
      <div className='container'>
        <Row gutter={24} align='middle'>
          <Col sm={24} lg={16}>
            <div className='home-rule-box'>
              <h2 className='text-preamble home-rule-preamble' dangerouslySetInnerHTML={{ __html: preamble }}></h2>
              <h2 className='home-rule-title'>{title}</h2>
              <p className='home-rule-description'>{description}</p>
            </div>
            <div className='home-rule-collapse'>
              <Collapse
                bordered={false}
                accordion
                defaultActiveKey={['']}
                expandIconPosition='end'
                expandIcon={({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}
                items={rules.data?.map((content, index) => ({
                  key: index,
                  label: content.attributes.title,
                  children: content.attributes.content,
                }))}
              />
            </div>
          </Col>
          <Col sm={24} lg={8} className='home-rule-image'>
            {image.data && (
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${image.data.attributes.url}`}
                alt={image.data.attributes.alternativeText || ''}
                width={339}
                height={307}
              />
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Rule;
