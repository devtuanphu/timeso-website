import type { GetServerSideProps } from 'next';

import { CareerDetailBanner } from '@components/career-detail/banner';
import { CareerDetailContent } from '@components/career-detail/content';
import { SEO } from '@components/seo';
import dataJsonEn from '@data/career/en.json';
import dataJsonKo from '@data/career/ko.json';
import dataJsonVi from '@data/career/vi.json';
import { Axios } from '@shared/modules/axios';

const CareerDettailPage = (props: PropType) => {
  const { jobDetail, locale } = props;

  const dataJson = {
    vi: dataJsonVi,
    ko: dataJsonKo,
    en: dataJsonEn,
  }[locale];

  return (
    <>
      <SEO title='Career - AMIT - Transform Digi Together' description='' />
      <CareerDetailBanner
        subtitle={locale == 'vi' ? 'TUYỂN DỤNG' : locale == 'en' ? 'WE ARE HIRING' : '채용'}
        title={jobDetail.attributes.title}
        location={jobDetail.attributes.location}
        work_time={jobDetail.attributes.time}
        level={jobDetail.attributes.position}
        backdrop={`${process.env.NEXT_PUBLIC_STRAPI_URL}${jobDetail.attributes.banner.data.attributes.url}`}
      />
      <CareerDetailContent
        id={jobDetail.id}
        data={jobDetail.attributes}
        career_detailContent={dataJson?.career_detailContent}
        application={dataJson?.application}
      />
    </>
  );
};

export default CareerDettailPage;

type PropType = {
  jobDetail: any;
  locale: string;
};

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en', params = {} }) => {
  const jobDetail = await Axios('jobs', `filters[slug]=${params.slug || ''}`, locale);
  if (jobDetail.data.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      jobDetail: jobDetail.data[0],
      locale,
    },
  };
};
