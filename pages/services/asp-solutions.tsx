import type { GetServerSideProps } from 'next';

import Contact from '@components/contact';
import { SEO } from '@components/seo';
import { Banner } from '@components/services/components/banner';
import { SolutionBenefit } from '@components/services/pages/asp-solutions/benefit';
import { Introduce } from '@components/services/pages/asp-solutions/introduce';
import { Solutions } from '@components/services/pages/asp-solutions/solutions';
import dataJsonEn from '@data/services/en.json';
import dataJsonKo from '@data/services/ko.json';
import dataJsonVi from '@data/services/vi.json';
import { Axios } from '@shared/modules/axios';

const AvailableSolutionsPage = (props: PropType) => {
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
        bannerTitle={data.bannerTitle}
        subtitle={data.bannerSubtitle}
        background={data.bannerBackground?.data?.attributes.url}
        customers={data.customers.data}
      />
      <Introduce data={data.introduce} />
      <SolutionBenefit title={data.benefitTitle} content={data.benefits} />
      <Solutions
        preamble={data.solutionPreamble}
        title={data.solutionTitle}
        content={data.solutions}
        dataNoCMS={dataJson?.solution?.posts}
      />
      <Contact data={dataContact} />
    </>
  );
};

export default AvailableSolutionsPage;

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => {
  const response = await Axios(
    'service-solution',
    'populate=bannerBackground,introduce,solutions,solutions.image,customers,customers.logo,benefits,benefits.image,solutions.proposal,seo',
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
