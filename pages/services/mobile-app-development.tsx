import type { GetServerSideProps } from 'next';

import Contact from '@components/contact';
import { SEO } from '@components/seo';
import { Banner } from '@components/services/components/banner';
import { Technology } from '@components/services/components/technology';
import { Introduce } from '@components/services/pages/mobile-app-development/introduce';
import { UXUIChoose } from '@components/services/pages/mobile-app-development/uxui-choose';
import { UXUIProcess } from '@components/services/pages/mobile-app-development/uxui-process';
import { UXUISolution } from '@components/services/pages/mobile-app-development/uxui-solution';
import { Axios } from '@shared/modules/axios';

const UXUIDesignPage = (props: PropType) => {
  const { data, dataContact } = props;

  if (!data) {
    return null;
  }

  return (
    <>
      <SEO title={data.seo.title} description={data.seo.description} />
      <Banner
        customers={data.customers.data}
        bannerTitle={data.bannerTitle}
        subtitle={data.bannerSubtitle}
        background={data.bannerBackground?.data?.attributes.url}
      />
      <Introduce data={data.introduce} />
      <UXUIProcess preamble={data.processPreamble} title={data.processTitle} content={data.processContent} data={data.process} />
      <UXUISolution preamble={data.solutionPreamble} title={data.solutionTitle} content={data.solutions} />
      <Technology title={data.toolTitle} technology={data.technologies.data} />
      <UXUIChoose
        preamble={data.choosePreamble}
        title={data.chooseTitle}
        description={data.chooseContent}
        content={data.choose}
      />
      <Contact data={dataContact} />
    </>
  );
};

export default UXUIDesignPage;

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => {
  const response = await Axios(
    'service-design',
    'populate=introduce,introduce.image,solutions,process,process.image,choose,choose.image,customers,customers.logo,bannerBackground,seo,technologies.logo',
    locale
  );
  const responseContact = await Axios('footer-contact', 'populate=profile,background,buttonContact', locale);

  return {
    props: {
      data: response?.data?.attributes || null,
      dataContact: responseContact?.data,
    },
  };
};

type PropType = {
  data: any;
  dataContact: any;
};
