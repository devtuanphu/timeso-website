import 'react-multi-carousel/lib/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'antd/dist/reset.css';

import 'aos/dist/aos.css';
import '../styles/sass/index.scss';

import 'dayjs/locale/ko';
import 'dayjs/locale/vi';

import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { ConfigProvider } from 'antd';
import AOS from 'aos';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { createContext, useEffect, useRef, useState } from 'react';

import Layout from '@components/layout';
import { SEO } from '@components/seo';
import { Axios } from '@shared/modules/axios';

dayjs.extend(relativeTime);

export const ThemeContext = createContext('christmas');

function App({ Component, pageProps }: AppProps) {
  const tawkMessengerRef = useRef<HTMLElement>(null);

  const [isChristmas, setIsChristmas] = useState<boolean>();

  const fetchHeaderData = async (locale: string) => {
    const response = await Axios('header', '', locale);
    setIsChristmas(response.data.attributes.isChristmas);
  };

  useEffect(() => {
    fetchHeaderData('vi');
    AOS.init({ once: true });
  }, []);

  return (
    <>
      <NextNProgress color='#08BED5' startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
      <SEO />
      <ConfigProvider
        theme={{
          token: {
            colorError: '#ff5938',
            colorInfo: '#1e6ffc',
            colorPrimary: '#08bed5',
            colorSuccess: '#4aaf28',
            colorWarning: '#f9bb00',
            fontFamily: 'Montserrat, sans-serif',
          },
        }}
      >
        <ThemeContext.Provider value={isChristmas ? 'christmas' : ''}>
          <Layout>
            <Component language='vi' {...pageProps} />
            <TawkMessengerReact
              propertyId={process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID}
              widgetId={process.env.NEXT_PUBLIC_TAWK_WIDGET_ID}
              ref={tawkMessengerRef}
            />
          </Layout>
        </ThemeContext.Provider>
      </ConfigProvider>
    </>
  );
}

export default App;
