import type { GetServerSideProps } from 'next';

import { Banner } from '@components/banner';
import ContactFollow from '@components/contact-page/contact-follow';
import { ContactForm } from '@components/contact-page/contact-form';
import { ContactLocation } from '@components/contact-page/location';
import { SEO } from '@components/seo';
import dataJsonEn from '@data/contact/en.json';
import dataJsonKo from '@data/contact/ko.json';
import dataJsonVi from '@data/contact/vi.json';
import { Axios } from '@shared/modules/axios';

const ContactPage = (props: PropType) => {
  const { data, footerContact, locale } = props;

  const dataJson = {
    vi: dataJsonVi,
    ko: dataJsonKo,
    en: dataJsonEn,
  }[locale];

  return (
    <>
      <SEO title={data.seo.title} description={data.seo.description} />
      <Banner
        class='contact-banner'
        bg={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data.bannerBackground.data.attributes.url}`}
        title={data.bannerTitle}
        content={data.bannerContent}
      />
      <ContactForm contactForm={data} contactFormNoCMS={dataJson?.contactForm} />
      <ContactLocation contactLocation={data} />
      <ContactFollow title={data.footerTitle} data={data.footerIcons} background={footerContact?.background} />
    </>
  );
};

export default ContactPage;

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => {
  const response = await Axios('contact', '', locale);
  const footerContact = await Axios('footer-contact', 'populate=profile,background', locale);

  return {
    props: {
      data: response?.data?.attributes || {},
      footerContact: footerContact?.data?.attributes || {},
      locale,
    },
  };
};

type PropType = {
  data: any;
  footerContact: any;
  locale: string;
};
