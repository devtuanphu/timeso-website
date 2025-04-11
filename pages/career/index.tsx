import type { GetServerSideProps } from 'next';

import { Banner } from '@components/banner';
import { CareerChoose } from '@components/career/choose';
import { Introduce } from '@components/career/introduce';
import { CareerJobSeeking } from '@components/career/job-seeking';
import { SEO } from '@components/seo';
import dataJsonEn from '@data/career/en.json';
import dataJsonKo from '@data/career/ko.json';
import dataJsonVi from '@data/career/vi.json';
import { Axios } from '@shared/modules/axios';
import { Button } from '@components/button';

const ContactPage = (props: PropType) => {
  const { data, listJobs, locale } = props;

  const dataJson = {
    vi: dataJsonVi,
    ko: dataJsonKo,
    en: dataJsonEn,
  }[locale];

  return (
    <>
      <SEO title={data.seo.title} description={data.seo.description} />
      <Banner
        class='career'
        bg={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data.bannerBackground.data.attributes.url}`}
        title={data.bannerTitle}
        content={data.bannerContent}
      >
        <a href='mailto:hr@amitgroup.vn'>
          <Button type='primary' size='large'>
            {data.bannerButton}
          </Button>
        </a>
      </Banner>
      <Introduce data={data} />
      <CareerChoose preamble={data.choosePreamble} data={data} image={data.chooseImage} />
      <CareerJobSeeking data={data} listJobs={listJobs} dataNoCMS={dataJson?.jobs} />
    </>
  );
};

export default ContactPage;

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => {
  const response = await Axios(
    'career',
    'populate=seo,career_chooses.image,bannerBackground,introduceImage1,introduceImage2,chooseImage,job_levels',
    locale
  );
  const listJobs = await Axios('jobs', 'pagination[pageSize]=3&pagination[page]=1', locale);

  return {
    props: {
      data: response?.data?.attributes || {},
      listJobs,
      locale,
    },
  };
};

type PropType = {
  data: any;
  listJobs: any;
  locale: string;
};
