import { AlignLeftOutlined, CloseOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import { Button } from '@components/button';
import { Axios } from '@shared/modules/axios';
import Navigation from './_navigation';
import { ThemeContext } from '@pages/_app';
import { theme } from 'antd';

type HeaderData = StrapiObject<{
  logo: Single<StrapiMedia>;
  navItem: StrapiNavigator[];
  button: StrapiButton;
  logoSubtitle: string;
}> | null;

const HeaderDefault = ({ theme }) => {
  const { width, height } = useWindowSize();
  const [activeMobile, setActiveMobile] = useState<boolean>(false);
  const [data, setData] = useState<HeaderData>(null);
  const router = useRouter();

  const fetchHeaderData = async (locale: string) => {
    const response = await Axios('header', '', locale);
    setData(response.data || null);
  };

  useEffect(() => {
    fetchHeaderData(router.locale || 'en');
  }, [router.locale]);

  if (!data) {
    return null;
  }

  const toggleMenu = (active: boolean) => {
    setActiveMobile(active);
    if (width < 1024 && active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  };

  const { logo, navItem, button, logoSubtitle } = data.attributes;

  return (
    <div className='header'>
      <nav className='container header-nav'>
        <Link prefetch={false} href='/' className='header-logo' onClick={() => toggleMenu(false)}>
          {logo.data && (
            <div className='qq-chrismas-header'>
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${logo.data.attributes.url}`}
                alt={logo.data.attributes.alternativeText || ''}
                width='166'
                height='44'
                quality={100}
                unoptimized={true}
              />
              <span className='qq-chrismas-header-text qq-chrismas-linearGreen'>{logoSubtitle}</span>
            </div>
          )}
        </Link>
        <div className={`header-navigation ${activeMobile ? 'active' : ''}`}>
          <Navigation data={navItem} activeMobile={activeMobile} button={button} closeMenu={() => toggleMenu(false)} />
          {width > 1023 ? (
            <div className='header-button'>
              <Link prefetch={false} href={button.url}>
                <Button type='primary'>{button.text}</Button>
              </Link>
            </div>
          ) : (
            <button className='header-btnMobile' onClick={() => toggleMenu(!activeMobile)}>
              {activeMobile ? (
                <CloseOutlined style={{ fontSize: '24px', color: '#fff' }} />
              ) : (
                <AlignLeftOutlined style={{ fontSize: '24px', color: '#333', transform: 'rotate(180deg)' }} />
              )}
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default HeaderDefault;
