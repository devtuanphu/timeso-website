import { Col, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

const ContactLocation = (props: any) => {
  const { contactLocation } = props;
  return (
    <div className='contactLocation'>
      <div className='container'>
        <Row gutter={24}>
          <Col lg={16} md={12} sm={24} xs={24} className='contactLocation-left'>
            {contactLocation?.infoMapSrc && (
              <iframe
                src={contactLocation?.infoMapSrc || ''}
                width='100%'
                style={{ border: '0' }}
                allowFullScreen={true}
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              ></iframe>
            )}
          </Col>
          <Col lg={8} md={12} sm={24} className='contactLocation-right'>
            <div className='contactLocation-card'>
              <div className='contactLocation-card-image'>
                {contactLocation?.infoLogo?.data?.attributes?.url && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${contactLocation?.infoLogo.data.attributes.url}`}
                    width={44}
                    height={44}
                    alt={contactLocation?.infoLogo.data.attributes.alternativeText || ''}
                  />
                )}
              </div>
              <ul>
                <li>
                  {contactLocation.info?.[0]?.url && (
                    <Link prefetch={false} href={contactLocation.info[0]?.url} passHref target='_blank' rel='noopener noreferrer'>
                      <div className='contactLocation-card-title'>
                        {contactLocation.info[0].icon?.data?.attributes?.url && (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${contactLocation.info[0].icon.data.attributes.url}`}
                            width={24}
                            height={24}
                            alt={contactLocation.info[0].icon.data.attributes.alternativeText || ''}
                          />
                        )}
                        <p>{contactLocation.info[0].title}</p>
                      </div>
                      <p className='contactLocation-card-content'>{contactLocation.info[0].detail}</p>
                    </Link>
                  )}
                </li>
                <li>
                  {contactLocation?.info?.[1]?.url && (
                    <Link prefetch={false} href={contactLocation.info[1].url} passHref>
                      <div className='contactLocation-card-title'>
                        {contactLocation.info[1].icon?.data?.attributes?.url && (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${contactLocation.info[1].icon.data.attributes.url}`}
                            width={24}
                            height={24}
                            alt={contactLocation.info[1].icon.data.attributes.alternativeText || ''}
                          />
                        )}
                        <p>{contactLocation.info[1].title}</p>
                      </div>
                      <p className='contactLocation-card-content'>{contactLocation.info[1].detail}</p>
                    </Link>
                  )}
                </li>
                <li>
                  <div className='contactLocation-card-title'>
                    {contactLocation?.info?.[2]?.icon?.data?.attributes?.url && (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${contactLocation.info[2].icon.data.attributes.url}`}
                        width={24}
                        height={24}
                        alt={contactLocation.info[2].icon.data.attributes.alternativeText || ''}
                      />
                    )}
                    <p>{contactLocation?.info?.[2]?.title}</p>
                  </div>
                  <p className='contactLocation-card-content'>{contactLocation.info?.[2]?.detail}</p>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export { ContactLocation };
