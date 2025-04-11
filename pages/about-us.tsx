import type { GetServerSideProps } from 'next';

import { AboutBackdrop } from '@components/about-us/backdrop';
import { Culture } from '@components/about-us/culture';
import { Introduce } from '@components/about-us/introduce';
import { Leaders } from '@components/about-us/leaders';
import { Rule } from '@components/about-us/rule';
import { Target } from '@components/about-us/target';
import { Banner } from '@components/banner';
import Contact from '@components/contact';
import { SEO } from '@components/seo';
import dataJsonEn from '@data/about-us/en.json';
import dataJsonKo from '@data/about-us/ko.json';
import dataJsonVi from '@data/about-us/vi.json';
import { Axios } from '@shared/modules/axios';

const AboutUsPage = (props: PropType) => {
  const { data, dataContact, locale } = props;

  const dataJson = {
    vi: dataJsonVi,
    ko: dataJsonKo,
    en: dataJsonEn,
  }[locale];

  if (!data) {
    return null;
  }

  return (
    <>
      <SEO title={data.seo.title} description={data.seo.description} />
      <Banner
        class='about-us-banner'
        bg={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data.bannerBackground?.data?.attributes?.url}`}
        data={data}
      />
      <Introduce data={data} />
      <Target data={data} />
      <Rule data={data} />
      <AboutBackdrop data={data} dataNoCMS={dataJson?.backdrop} />
      <Leaders data={data} />
      <Culture preamble={data.culturePreamble} data={data} />
      <Contact data={dataContact} />
    </>
  );
};

export default AboutUsPage;

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => {
  const response = await Axios(
    'about-us',
    'populate=seo,bannerBackground,introduceImage,targetImage,home_rules,leaders.image,cultureImages,backdropBackground,backdropImage',
    locale
  );
  const responseContact = await Axios('footer-contact', 'populate=profile,background,buttonContact', locale);

  return {
    props: {
      data: response?.data?.attributes || null,
      dataContact: responseContact?.data,
      locale,
    },
  };
};

type PropType = {
  data: any;
  dataContact: any;
  locale: any;
};
