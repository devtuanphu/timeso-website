import type { GetServerSideProps } from 'next';

import Contact from '@components/contact';
import { SEO } from '@components/seo';
import { Banner } from '@components/services/components/banner';
import { WorkingProcess } from '@components/services/components/working-process';
import { Choose } from '@components/services/pages/website-development/choose';
import { Introduce } from '@components/services/pages/website-development/introduce';
import { OffshoreService } from '@components/services/pages/website-development/offshore-service';
import { Axios } from '@shared/modules/axios';

const OffshoreDevelopmentCenterPage = (props: PropType) => {
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
      <Introduce data={data.introduces} />
      <OffshoreService title={<>{data.offshoreTitle}</>} description={data.offshoreContent} content={data.offshores} />
      <WorkingProcess
        bgStep={data?.processImage?.data?.attributes.url}
        content={data.process}
        title={data.processTitle}
        description={data.processContent}
      />
      <Choose data={data.choose} image={data.chooseImage} preamble={data.choosePreamble} title={data.chooseTitle} />
      <Contact data={dataContact} />
    </>
  );
};

export default OffshoreDevelopmentCenterPage;

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => {
  const response = await Axios(
    'service-offshore',
    'populate=bannerBackground,introduces,introduces.image,offshores,offshores.image,processImage,process,process.image,choose,chooseImage,customers,customers.logo,seo',
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
