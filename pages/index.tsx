import { GetServerSideProps } from 'next';

import Contact, { ContactProps } from '@components/contact';
import Backdrop, { BackdropProps } from '@components/home/backdrop';
import Banner, { BannerProps } from '@components/home/banner';
import Choose, { ChooseProps } from '@components/home/choose';
import Customer, { CustomerProps } from '@components/home/customer';
import Feedback, { FeedbackProps } from '@components/home/feedback';
import Introduce, { IntroduceProps } from '@components/home/introduce';
import Product, { ProductProps } from '@components/home/product';
import Projects, { ProjectProps } from '@components/home/projects';
import Rule, { RuleProps } from '@components/home/rule';
import Services, { ServicesProps } from '@components/home/service';
import { SEO } from '@components/seo';
import { Axios } from '@shared/modules/axios';

type HomeProps = {
  data: StrapiObject<{
    seo: StrapiSeo;
    bannerBackground: BannerProps['background'];
    bannerPreamble: BannerProps['preamble'];
    bannerTitle: BannerProps['title'];
    bannerDescription: BannerProps['description'];
    bannerContent: BannerProps['content'];
    bannerButton: BannerProps['button'];
    bannerLogo: BannerProps['sideImage'];
    introduceImage: IntroduceProps['image'];
    introducePreamble: IntroduceProps['preamble'];
    introduceTitle: IntroduceProps['title'];
    introduceContent: IntroduceProps['content'];
    serviceTitle: ServicesProps['title'];
    serviceDescription: ServicesProps['description'];
    serviceButtonText: ServicesProps['buttonText'];
    home_services: ServicesProps['services'];
    backdropBackground: BackdropProps['background'];
    backdropTitle: BackdropProps['title'];
    backdropTopIcons: BackdropProps['topIcons'];
    backdropBottomIcons: BackdropProps['bottomIcons'];
    choosePreamble: ChooseProps['preamble'];
    chooseTitle: ChooseProps['title'];
    home_chooses: ChooseProps['chooses'];
    rulePreamble: RuleProps['preamble'];
    ruleTitle: RuleProps['title'];
    ruleDescription: RuleProps['description'];
    ruleImage: RuleProps['image'];
    home_rules: RuleProps['rules'];
    projectPreamble: ProjectProps['preamble'];
    projectViewMore: ProjectProps['viewMore'];
    projectButton: ProjectProps['button'];
    projects: ProjectProps['projects'];
    customerPreamble: CustomerProps['preamble'];
    customerTitle: CustomerProps['title'];
    customerDescription: CustomerProps['description'];
    customers: CustomerProps['customers'];
    feedbackTitle: FeedbackProps['title'];
    feedbacks: FeedbackProps['feedbacks'];
    productPreamble: ProductProps['preamble'];
    productTitle: ProductProps['title'];
    productContent: ProductProps['content'];
    productImage: ProductProps['image'];
    productButton: ProductProps['button'];
    home_products: ProductProps['products'];
  }>;
  dataContact: ContactProps['data'];
};

const Home = (props: HomeProps) => {
  const { data, dataContact } = props;

  if (!data) {
    return null;
  }

  const {
    seo,
    bannerBackground,
    bannerPreamble,
    bannerTitle,
    bannerDescription,
    bannerContent,
    bannerButton,
    bannerLogo,
    introduceImage,
    introducePreamble,
    introduceTitle,
    introduceContent,
    serviceTitle,
    serviceDescription,
    serviceButtonText,
    home_services,
    backdropBackground,
    backdropTitle,
    backdropTopIcons,
    backdropBottomIcons,
    choosePreamble,
    chooseTitle,
    home_chooses,
    rulePreamble,
    ruleTitle,
    ruleDescription,
    ruleImage,
    home_rules,
    projectPreamble,
    projectViewMore,
    projectButton,
    projects,
    customerPreamble,
    customerTitle,
    customerDescription,
    customers,
    feedbackTitle,
    feedbacks,
    productPreamble,
    productTitle,
    productContent,
    productImage,
    productButton,
    home_products,
  } = data.attributes;

  if (!data) {
    return null;
  }

  return (
    <>
      <SEO title={seo.title} description={seo.description} />
      <Banner
        background={bannerBackground}
        preamble={bannerPreamble}
        title={bannerTitle}
        description={bannerDescription}
        content={bannerContent}
        button={bannerButton}
        sideImage={bannerLogo}
      />
      <Introduce image={introduceImage} preamble={introducePreamble} title={introduceTitle} content={introduceContent} />
      <Services title={serviceTitle} description={serviceDescription} services={home_services} buttonText={serviceButtonText} />
      <Backdrop
        background={backdropBackground}
        title={backdropTitle}
        topIcons={backdropTopIcons}
        bottomIcons={backdropBottomIcons}
      />
      <Choose preamble={choosePreamble} title={chooseTitle} chooses={home_chooses} />
      <Rule preamble={rulePreamble} title={ruleTitle} description={ruleDescription} rules={home_rules} image={ruleImage} />
      <Projects preamble={projectPreamble} projects={projects} viewMore={projectViewMore} button={projectButton} />
      <Customer preamble={customerPreamble} title={customerTitle} description={customerDescription} customers={customers} />
      <Feedback title={feedbackTitle} feedbacks={feedbacks} />
      <Product
        preamble={productPreamble}
        title={productTitle}
        content={productContent}
        image={productImage}
        products={home_products}
        button={productButton}
      />
      <Contact data={dataContact} />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ locale = 'vi' }) => {
  const dataPopulate = [
    'seo',
    'bannerLogo',
    'bannerBackground',
    'bannerButton',
    'introduceImage',
    'serviceBackground',
    'home_services.image',
    'backdropBackground',
    'backdropTopIcons',
    'backdropBottomIcons',
    'home_chooses.image',
    'home_rules',
    'home_products.image',
    'feedbacks.avatar',
    'customers.logo',
    'projects.image',
    'projects.project_category',
    'projects.customer.logo',
    'projects.technologies.logo1',
    'projects.sections',
    'projectButton',
    'ruleImage',
    'productImage',
    'productButton',
  ];

  const response = await Axios('home', `populate=${dataPopulate}`, locale);
  const responseContact = await Axios('footer-contact', 'populate=profile,background,buttonContact', locale);

  return {
    props: {
      data: response?.data || null,
      dataContact: responseContact?.data || null,
    },
  };
};
