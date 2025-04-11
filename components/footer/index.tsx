import { Col, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import PopupDetail from '@components/case-studies/_popup-detail';
import { Axios } from '@shared/modules/axios';

type FooterData = StrapiObject<{
  logo: Single<StrapiMedia>;
  locations: StrapiComponent<{
    icon: Single<StrapiMedia>;
    url: string;
    title: string;
    detail: string;
  }>[];
  contact: StrapiComponent<{
    icon: Single<StrapiMedia>;
    items: StrapiComponent<{ url: string; displayText: string }>[];
  }>;
  navigators: StrapiNavigator[];
}> | null;

const FooterDefault = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [projectSlug, setProjectSlug] = useState<string>('');
  const [data, setData] = useState<FooterData>(null);

  const router = useRouter();
  const { width, height } = useWindowSize();

  const fetchFooterData = async (lang: string = 'en') => {
    const response = await Axios(
      'footer',
      'populate=locations,locations.icon,logo,contact,contact.icon,contact.items,navigators,navigators.subItems,navigators.iconLinks,navigators.iconLinks.icon',
      lang
    );
    setData(response.data || null);
  };

  useEffect(() => {
    fetchFooterData(router.locale);
  }, [router.locale]);

  const showModal = async (slug) => {
    if (width < 768) {
      await router.push(`/case-studies/${slug}`);
    } else {
      setIsModalOpen(true);
      setProjectSlug(slug);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (!data) {
    return null;
  }

  const { logo, locations, contact, navigators } = data.attributes;

  return (
    <div className='container'>
      <Row gutter={24} className='footer-top'>
        <Col xs={24} lg={8} xl={6} className='footer-top-logo'>
          {logo.data && (
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${logo.data.attributes.url}`}
              width={261}
              height={80}
              alt='logo-amit'
              quality={100}
            />
          )}
        </Col>
        <Col xs={24} lg={16} xl={18}>
          <Row gutter={[0, 24]} className='footer-top-location'>
            {locations.map((location) => (
              <Col key={location.id} xs={24} sm={12} order={1}>
                <Link
                  prefetch={false}
                  href={location.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='footer-top-location__item'
                >
                  <div className='footer-top-location__item--image'>
                    {location.icon.data && (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${location.icon.data.attributes.url}`}
                        quality={100}
                        width={40}
                        height={40}
                        alt=''
                      />
                    )}
                  </div>
                  <div className='footer-top-location__item--text'>
                    <p className='location-name'>{location.title}</p>
                    <p className='location-address'>{location.detail}</p>
                  </div>
                </Link>
              </Col>
            ))}
            <Col xs={24} sm={12} order={width < 768 ? 0 : 3}>
              <div className='footer-top-location__item'>
                <div className='footer-top-location__item--image'>
                  {contact.icon.data && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${contact.icon.data.attributes.url}`}
                      quality={100}
                      width={40}
                      height={40}
                      alt=''
                    />
                  )}
                </div>
                <div className='footer-top-location__item--text'>
                  {contact.items.map((item) => (
                    <p key={item.id} className='location-address mail'>
                      <Link prefetch={false} href={item.url}>
                        {item.displayText}
                      </Link>
                    </p>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={24} className='footer-body'>
        <Col xs={24} md={16} xl={8}>
          <h6 className='title'>{navigators[0]?.title}</h6>
          <ul>
            {navigators[0].subItems.map((item, index) => (
              <li key={index}>
                <Link prefetch={false} href={item.url}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </Col>
        <Col xs={24} md={16} xl={8} order={width > 767 && width < 1024 ? 2 : 1}>
          <h6 className='title'>{navigators[1]?.title}</h6>
          <ul>
            {navigators[1]?.subItems.map((item: any, index: number) => (
              <li key={index} onClick={() => showModal(item?.url)}>
                <a>{item.title}</a>
              </li>
            ))}
          </ul>
          <PopupDetail open={isModalOpen} cancel={handleCancel} projectSlug={projectSlug} />
        </Col>
        <Col xs={24} md={8} xl={4} order={width > 767 && width < 1024 ? 1 : 2}>
          <h6 className='title'>{navigators[2]?.title}</h6>
          <ul>
            {navigators[2]?.subItems.map((item, index) => (
              <li key={index}>
                <Link
                  prefetch={false}
                  href={`${item.url}`}
                  className={router.pathname == `${item.url}` ? 'router-link-active' : ''}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </Col>
        <Col xs={24} md={8} xl={4} order={width > 767 && width < 1024 ? 3 : 3}>
          <h6 className='title'>{navigators[3]?.title}</h6>
          <div className='icons'>
            {navigators[3]?.iconLinks.map((item, index) => (
              <Link key={index} prefetch={false} href={item.url} target='_blank' rel='noopener noreferrer'>
                {item.icon.data && (
                  <Image
                    width={33}
                    height={33}
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.icon.data.attributes.url}`}
                    alt={item.icon.data.attributes.alternativeText || ''}
                    quality={100}
                  />
                )}
              </Link>
            ))}
          </div>
        </Col>
      </Row>
      <div className='footer-bottom'>
        <hr />
        <p className='footer-bottom-copyRight'>
          Copyright © 2025 <b>TIMESO</b>. All Rights Reserved | Design by <b>TIMESO</b>
        </p>
      </div>
    </div>
  );
};

export default FooterDefault;
