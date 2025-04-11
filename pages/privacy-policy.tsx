import dayjs from 'dayjs';
import { GetStaticProps } from 'next';

import { Banner } from '@components/banner';
import { SEO } from '@components/seo';
import { Axios } from '@shared/modules/axios';

type PrivacyPolicyProps = {
  data: {
    seo: {
      title: string;
      description: string;
    };
    banner: {
      preamble: string;
      title: string;
      content: string;
      background: any;
    };
    lastUpdatedLabel: string;
    policy: string;
  };
  lastUpdatedAt: string;
};

const PrivacyPolicy = (props: PrivacyPolicyProps) => {
  const { data, lastUpdatedAt } = props;

  if (!data) {
    return null;
  }

  const { seo, banner, lastUpdatedLabel, policy } = data;

  return (
    <div className='Page-PrivacyPolicy'>
      <SEO title={seo.title} description={seo.description} />
      <Banner bg={`${process.env.NEXT_PUBLIC_STRAPI_URL}${banner.background.data.attributes.url}`} title={banner.title} />
      <div className='container'>
        <h5 className='highlight'>
          {lastUpdatedLabel} {lastUpdatedAt}
        </h5>
        <div dangerouslySetInnerHTML={{ __html: policy }} />
      </div>
    </div>
  );
};

export default PrivacyPolicy;

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  const response = await Axios('privacy-policy', 'populate=seo,banner.background', locale);

  const data = response?.data?.attributes || null;
  const lastUpdatedAt = dayjs(data?.lastUpdatedAt)
    .locale(locale)
    .format(data?.lastUpdatedFormat || 'MMMM DD, YYYY');

  return {
    props: {
      data,
      lastUpdatedAt,
    },
  };
};
