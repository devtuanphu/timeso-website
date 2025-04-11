import type { GetServerSideProps } from 'next';

import Contact from '@components/contact';
import { SEO } from '@components/seo';
import { Banner } from '@components/services/components/banner';
import { Technology } from '@components/services/components/technology';
import { Benefit } from '@components/services/pages/it-staffing-service/benefit';
import { ITStaffChoose } from '@components/services/pages/it-staffing-service/choose';
import { Introduce } from '@components/services/pages/it-staffing-service/introduce';
import { ITStaffProcess } from '@components/services/pages/it-staffing-service/process';
import { Question } from '@components/services/pages/it-staffing-service/question';
import { Axios } from '@shared/modules/axios';

const ITStaffingPage = (props: PropType) => {
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
      <Question leftTitle={data.question1} rightTitle={data.question2} solution={data.solutionContent} />
      <Introduce data={data.introduce} />
      <ITStaffChoose preamble={data.choosePreamble} title={data.chooseTitle} itstaff={data.choose} />
      <ITStaffProcess title={data.processTitle} itstaff={data.process} />
      <Technology
        title={data.technologyTitle}
        description={data.technologyContent}
        technology={data.technologies.data}
        noBackground
      />
      <Benefit preamble={data.benefitPreamble} title={data.benefitTitle} content={data.benefitContent} itstaff={data.benefits} />
      <Contact data={dataContact} />
    </>
  );
};

export default ITStaffingPage;

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => {
  const response = await Axios(
    'service-staff',
    'populate=bannerBackground,introduce,introduce.image,choose,process,process.image,benefits,benefits.image,technologies,technologies.logo,customers,customers.logo,seo',
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
