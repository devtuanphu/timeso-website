import { DownOutlined, GlobalOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import { Button } from '@components/button';
import { Axios } from '@shared/modules/axios';

type NavigationProps = {
  data: StrapiNavigator[];
  activeMobile: boolean;
  button: StrapiButton;
  closeMenu: () => void;
};

const Navigation = (props: NavigationProps) => {
  const { data, activeMobile, button, closeMenu } = props;
  const [locales, setLocales] = useState<StrapiLanguage[]>([]);
  const router = useRouter();
  const { width, height } = useWindowSize();

  const fetchLocaleData = async () => {
    const response = await Axios('i18n/locales');
    setLocales(response || []);
  };

  useEffect(() => {
    fetchLocaleData();
  }, []);

  const activePathname = (path: string) => {
    return router.asPath.includes(path);
  };

  const handleChangeLanguage = (locale: string) => {
    router.push(router.asPath, router.asPath, { locale });
  };

  const languageMenu = {
    items: locales.map((item) => ({
      key: item.code,
      label: <p className='header-language-content'>{item.name}</p>,
      className: router.locale === item.code ? 'language-active' : '',
      onClick: () => handleChangeLanguage(item.code),
    })),
    className: 'header-language-menu',
  };

  const dataDropdownMenu = data
    .filter((item) => item.subItems)[0]
    ?.subItems?.map((data, index) => ({
      key: 'item' + index,
      label: (
        <Link prefetch={false} href={data.url}>
          {data.title}
        </Link>
      ),
      className: `${router.pathname === data.url || activePathname(data.url) ? 'router-link-active' : ''}`,
      onClick: () => closeMenu(),
    }));

  const dataMenu = [
    ...data.map((item: any) => {
      if (!!item.subItems) {
        return {
          key: item.id,
          label: (
            <Dropdown
              menu={{
                className: 'header-menu-dropdown',
                items: dataDropdownMenu,
              }}
              placement={width < 1024 ? 'bottom' : 'bottomLeft'}
              arrow={{ pointAtCenter: true }}
              getPopupContainer={(triggerNode) => triggerNode.parentElement || triggerNode}
              trigger={[width < 1024 ? 'click' : 'hover']}
            >
              <a className={activePathname('/services') ? 'router-link-active' : ''}>
                {item.title} <DownOutlined style={{ fontSize: '10px', minWidth: '10px' }} />
              </a>
            </Dropdown>
          ),
          className: 'header-menuDropdown',
        };
      } else {
        return {
          key: item.id,
          label: (
            <Link
              prefetch={false}
              href={item.url}
              className={router.pathname === item.url || activePathname(item.url) ? 'router-link-active' : ''}
            >
              {item.title}
            </Link>
          ),
          onClick: () => closeMenu(),
        };
      }
    }),
    {
      key: 'item-7',
      label: (
        <Link prefetch={false} href={button.url}>
          <Button type='primary'>{button.text}</Button>
        </Link>
      ),
      onClick: () => closeMenu(),
      className: 'header-menuButton',
    },
  ];

  return (
    <>
      <Menu
        mode='horizontal'
        items={width < 1024 ? dataMenu : dataMenu.slice(0, dataMenu.length - 1)}
        className={`header-menu ${activeMobile ? 'active' : ''}`}
      />
      {/* <Dropdown
        menu={languageMenu}
        placement='bottom'
        arrow={{ pointAtCenter: true }}
        getPopupContainer={(triggerNode) => triggerNode.parentElement || triggerNode}
        trigger={[width < 1024 ? 'click' : 'hover']}
      >
        <div className='header-language'>
          <p className='header-language-content language-acronym'>
            <GlobalOutlined /> {router.locale === 'ko' ? '한' : router.locale}
          </p>
        </div>
      </Dropdown> */}
    </>
  );
};

export default Navigation;
