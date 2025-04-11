import { Col, Row } from 'antd';
import Image from 'next/image';

const Introduce = ({ data }: any) => {
  const handleClickImageFirst = () => {
    document.querySelector('.career-introduce-image__first')?.classList.remove('hidden');
    document.querySelector('.career-introduce-image__first')?.classList.add('show');
    document.querySelector('.career-introduce-image__second')?.classList.remove('show');
    document.querySelector('.career-introduce-image__second')?.classList.add('hidden');
  };
  const handleClickImageSecond = () => {
    document.querySelector('.career-introduce-image__second')?.classList.remove('hidden');
    document.querySelector('.career-introduce-image__second')?.classList.add('show');
    document.querySelector('.career-introduce-image__first')?.classList.remove('show');
    document.querySelector('.career-introduce-image__first')?.classList.add('hidden');
  };

  return (
    <div className='career-introduce'>
      <div className='container'>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12} lg={10} className='career-introduce-left'>
            <h3 className='career-introduce-title'>{data.introduceTitle}</h3>
            <div className='career-introduce-description' dangerouslySetInnerHTML={{ __html: data.introduceDescription }}></div>
          </Col>
          <Col xs={24} md={12} lg={14} className='career-introduce-right'>
            <div className='career-introduce-gallery'>
              <div className='career-introduce-image career-introduce-image__first show' onClick={handleClickImageFirst}>
                {data.introduceImage1?.data && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data.introduceImage1?.data.attributes.url}`}
                    width={546}
                    height={410}
                    alt=''
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                )}
              </div>

              <div className='career-introduce-image career-introduce-image__second hidden' onClick={handleClickImageSecond}>
                {data.introduceImage2?.data && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data.introduceImage2?.data.attributes.url}`}
                    width={546}
                    height={410}
                    alt=''
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export { Introduce };
