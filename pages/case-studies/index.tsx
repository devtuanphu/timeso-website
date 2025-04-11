import type { GetServerSideProps } from 'next';

import { Banner } from '@components/banner';
import { CaseStudiesCategories } from '@components/case-studies';
import Contact from '@components/contact';
import { SEO } from '@components/seo';
import dataJsonEn from '@data/case-studies/en.json';
import dataJsonKo from '@data/case-studies/ko.json';
import dataJsonVi from '@data/case-studies/vi.json';
import { Axios } from '@shared/modules/axios';

const CaseStudiesPage = (props: PropType) => {
  const { dataCaseStudies, dataProjects, dataContact, locale } = props;

  const dataJson = {
    vi: dataJsonVi,
    ko: dataJsonKo,
    en: dataJsonEn,
  }[locale];

  if (!dataCaseStudies) {
    return null;
  }

  return (
    <>
      <SEO title={dataCaseStudies.seo.title} description={dataCaseStudies.seo.description} />
      <Banner
        class='case-studies'
        bg={`${process.env.NEXT_PUBLIC_STRAPI_URL}${dataCaseStudies.bannerBackground.data.attributes.url}`}
        data={dataCaseStudies}
      />
      <CaseStudiesCategories dataCategories={dataCaseStudies} dataProjects={dataProjects} dataNoCMS={dataJson?.dataNoCMS} />
      <Contact data={dataContact} />
    </>
  );
};

export default CaseStudiesPage;

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => {
  const responseCaseStudies = await Axios('case-study', 'seo,project_categories,bannerBackground', locale);
  const responseProjects = await Axios('projects', 'pagination[page]=1&pagination[pageSize]=6', locale);
  const responseContact = await Axios('footer-contact', 'populate=profile,background,buttonContact', locale);

  return {
    props: {
      dataCaseStudies: responseCaseStudies?.data?.attributes || null,
      dataProjects: responseProjects,
      dataContact: responseContact?.data,
      locale,
    },
  };
};

type PropType = {
  dataCaseStudies: any;
  dataProjects: any;
  dataContact: any;
  locale: string;
};
