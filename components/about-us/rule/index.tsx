import { Col, Row } from 'antd';
import PropTypes, { InferProps } from 'prop-types';
import { useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

const Rule = (props: RuleTypes) => {
  const [isHoverItemTop, setIsHoverItemTop] = useState(false);
  const [isHoverItemBottom, setIsHoverItemBottom] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const { width, height } = useWindowSize();
  const { data } = props;

  return (
    <div className='aboutUs-rule'>
      <div className='container'>
        <Row gutter={[24, 24]} justify='center'>
          <Col xs={24} xl={16} className='aboutUs-rule-top' data-aos='zoom-in'>
            <h2 className='text-preamble aboutUs-rule-preamble' dangerouslySetInnerHTML={{ __html: data?.rulePreamble || '' }} />
            <h2 className='aboutUs-rule-title'>{data?.ruleTitle}</h2>
            <p className='aboutUs-rule-description'>{data?.ruleDescription}</p>
          </Col>
          {data?.home_rules?.data && width > 767 ? (
            <Col span={24} className='aboutUs-rule-bottom'>
              <div className='aboutUs-rule-list__top' data-aos='fade-right' data-aos-duration='300'>
                <div
                  className={`aboutUs-rule-list__top--item ${isHoverItemTop ? '' : 'active'}`}
                  onClick={() => setIsHoverItemTop(false)}
                >
                  <p className='title'>{data?.home_rules?.data[0]?.attributes?.title}</p>
                  <p className='description'>{data?.home_rules?.data[0]?.attributes?.content}</p>
                </div>
                <div
                  className={`aboutUs-rule-list__top--item ${isHoverItemTop ? 'active' : ''}`}
                  onClick={() => setIsHoverItemTop(true)}
                >
                  <p className='title'>{data?.home_rules?.data[1]?.attributes?.title}</p>
                  <p className='description'>{data?.home_rules?.data[1]?.attributes?.content}</p>
                </div>
              </div>
              <div className='aboutUs-rule-list__bottom' data-aos='fade-left' data-aos-duration='300'>
                <div
                  className={`aboutUs-rule-list__bottom--item ${isHoverItemBottom ? '' : 'active'}`}
                  onClick={() => setIsHoverItemBottom(false)}
                >
                  <p className='title'>{data?.home_rules?.data[2]?.attributes?.title}</p>
                  <p className='description'>{data?.home_rules?.data[2]?.attributes?.content}</p>
                </div>
                <div
                  className={`aboutUs-rule-list__bottom--item ${isHoverItemBottom ? 'active' : ''}`}
                  onClick={() => setIsHoverItemBottom(true)}
                >
                  <p className='title'>{data?.home_rules?.data[3]?.attributes?.title}</p>
                  <p className='description'>{data?.home_rules?.data[3]?.attributes?.content}</p>
                </div>
              </div>
            </Col>
          ) : (
            <>
              {data?.home_rules?.data?.map((item, index) => (
                <Col key={index} span={24} onClick={() => activeIndex != index && setActiveIndex(index)}>
                  <div className={`aboutUs-rule-item ${activeIndex === index ? 'active' : ''}`}>
                    <p className='aboutUs-rule-item__title'>{item?.attributes?.title}</p>
                    <p className='aboutUs-rule-item__description'>{item?.attributes?.content}</p>
                  </div>
                </Col>
              ))}
            </>
          )}
        </Row>
      </div>
    </div>
  );
};

const rulePropTypes = {
  data: PropTypes.shape({
    rulePreamble: PropTypes.string,
    ruleTitle: PropTypes.string,
    ruleDescription: PropTypes.string,
    home_rules: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          attributes: PropTypes.shape({
            title: PropTypes.string,
            content: PropTypes.string,
          }),
        })
      ),
    }),
  }),
};

type RuleTypes = InferProps<typeof rulePropTypes>;

export { Rule };
