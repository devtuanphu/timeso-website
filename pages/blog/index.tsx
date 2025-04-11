import type { GetServerSideProps } from 'next';

import { Banner } from '@components/banner';
import { BlogCategory } from '@components/blog';
import { SEO } from '@components/seo';
import dataJsonEn from '@data/blog/en.json';
import dataJsonKo from '@data/blog/ko.json';
import dataJsonVi from '@data/blog/vi.json';
import { Axios } from '@shared/modules/axios';

const BlogPage = (props: PropType) => {
  const { blogPage, blogDetail, locale } = props;

  const dataJson = {
    en: dataJsonEn,
    ko: dataJsonKo,
    vi: dataJsonVi,
  }[locale];

  return (
    <>
      <SEO title={blogPage.seo.title} description={blogPage.seo.description} />
      <Banner
        class='blog'
        bg={`${process.env.NEXT_PUBLIC_STRAPI_URL}${blogPage.bannerBackground?.data?.attributes?.url}`}
        data={blogPage}
      />
      <BlogCategory
        blog_button={dataJson?.blog_button}
        dataCaseStudies={blogPage}
        dataBlog={blogDetail}
        dataNoCMS={dataJson?.dataNoCMS}
      />
    </>
  );
};

export default BlogPage;

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => {
  const responseBlogPage = await Axios('page-blog', '', locale);
  const responseBlogDetail = await Axios(
    'blogs',
    'pagination[pageSize]=7&pagination[page]=1&sort[0]=createdAt:desc&populate=*',
    locale
  );
  return {
    props: {
      blogPage: responseBlogPage?.data?.attributes || {},
      blogDetail: responseBlogDetail,
      locale,
    },
  };
};

type PropType = {
  blogPage: any;
  blogDetail: any;
  locale: string;
};
