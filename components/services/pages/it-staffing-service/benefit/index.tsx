import { Col, Row } from 'antd';
import Image from 'next/image';

type PropTypes = {
  itstaff: any;
  title: string;
  preamble: string;
  content: string;
};

const Benefit = (props: PropTypes) => {
  const { itstaff, preamble, title, content } = props;
  return (
    <div className='service-itstaffBenefit'>
      <div className='container'>
        <Row gutter={24}>
          <Col md={12} sm={24} className='service-itstaffBenefit-left'>
            <h2 className='text-preamble service-itstaffBenefit-preamble' dangerouslySetInnerHTML={{ __html: preamble }}></h2>
            <h3 className='service-itstaffBenefit-title'>{title}</h3>
            <p className='service-itstaffBenefit-description'>{content}</p>
          </Col>
          <Col md={12} sm={24} className='service-itstaffBenefit-right'>
            {itstaff &&
              itstaff.map((item: IBenefit, index: number) => (
                <div key={index} className='service-itstaffBenefit-item'>
                  <div className='card'>
                    <div className='card-image'>
                      {item.image?.data && (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image.data.attributes.url}`}
                          width={56}
                          height={56}
                          alt={item.title}
                        />
                      )}
                    </div>
                    <p className='card-content' dangerouslySetInnerHTML={{ __html: item.title }}></p>
                  </div>
                </div>
              ))}
          </Col>
        </Row>
      </div>
    </div>
  );
};

type IBenefit = {
  id: number;
  image: any;
  title: string;
};
export { Benefit };
