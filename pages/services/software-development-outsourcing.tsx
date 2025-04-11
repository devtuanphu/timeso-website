import type { GetServerSideProps } from 'next';

import Contact from '@components/contact';
import { SEO } from '@components/seo';
import { Banner } from '@components/services/components/banner';
import { Technology } from '@components/services/components/technology';
import { WorkingProcess } from '@components/services/components/working-process';
import { Choose } from '@components/services/pages/software-development-outsourcing/choose';
import { DevelopmentService } from '@components/services/pages/software-development-outsourcing/development-service';
import { Introduce } from '@components/services/pages/software-development-outsourcing/introduce';
import { Axios } from '@shared/modules/axios';

const CustomSoftwareDevelopmentPage = (props: PropType) => {
  const { data, dataContact } = props;

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
      <Introduce title={data.introduceTitle} description={data.introduceContent} introduceImage={data.introduceImage} />
      <DevelopmentService
        content={data.development}
        preamble={data.developmentPreamble}
        title={data.developmentTitle}
        description={data.developmentContent}
      />
      <Technology title={data.technologyTitle} description={data.technologyContent} technology={data.technologies.data} />
      <WorkingProcess
        bgStep={data.processImage?.data?.url}
        content={data.process}
        title={data.processTitle}
        description={data.processContent}
      />
      <Choose data={data.choose} title={data.chooseTitle} choosePreamble={data.choosePreamble} image={data.chooseImage} />
      <Contact data={dataContact} />
    </>
  );
};

export default CustomSoftwareDevelopmentPage;

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => {
  const response = await Axios(
    'service-development',
    'populate=seo,bannerBackground,customers.logo,introduceImage,technologies.logo,processImage,process.image,development.image,choose,chooseImage',
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
