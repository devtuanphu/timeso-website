import { Col, Row } from 'antd';
import Image from 'next/image';

const SolutionBenefit = (props: SolutionBenefitPropTypes) => {
  return (
    <div className='service-solutionBenefit'>
      <div className='container'>
        <Row gutter={24}>
          <Col span={24}>
            <h2 className='service-solutionBenefit-title'>{props.title}</h2>
          </Col>
          {props.content?.map((item: IBenefit, index: number) => (
            <Col key={index} xs={12} md={6} className='service-solutionBenefit-item'>
              <div className='service-solutionBenefit-image'>
                {item?.image?.data && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image.data.attributes.url}`}
                    width={168}
                    height={168}
                    alt=''
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                )}
              </div>
              <span className='service-solutionBenefit-line'></span>
              <p className='service-solutionBenefit-content' dangerouslySetInnerHTML={{ __html: item.title }}></p>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

type SolutionBenefitPropTypes = {
  title: string;
  content: any;
};
interface IBenefit {
  id: number;
  title: string;
  image: any;
}

export { SolutionBenefit };
