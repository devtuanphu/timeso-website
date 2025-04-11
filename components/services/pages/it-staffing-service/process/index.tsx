import { Col, Row } from 'antd';
import Image from 'next/image';

type PropTypes = {
  itstaff: any;
  title: string;
};

const ITStaffProcess = (props: PropTypes) => {
  const { itstaff, title } = props;
  return (
    <div className='service-itstaffProcess'>
      <div className='container'>
        <Row gutter={24}>
          <Col span={24}>
            <h2 className='service-itstaffProcess-title' dangerouslySetInnerHTML={{ __html: title }}></h2>
          </Col>
        </Row>
        <Row gutter={24} className='service-itstaffProcess-list'>
          {itstaff?.map((item: IProcess, index: number) => (
            <Col key={item.id} sm={6} xs={24} className='service-itstaffProcess-item'>
              <div className='card'>
                <div className='card-image'>
                  {item.image?.data && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image.data.attributes.url}`}
                      width={120}
                      height={120}
                      alt={item.title}
                      quality={100}
                    />
                  )}
                  <span className='card-image-number'>{index + 1}</span>
                </div>
                <p className='card-content' dangerouslySetInnerHTML={{ __html: item.title }}></p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

interface IProcess {
  id: number;
  title: string;
  image: any;
}

export { ITStaffProcess };
