import type { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { BlogDetailBanner } from '@components/blog-detail/banner';
import { OtherPosts } from '@components/blog-detail/other-posts';
import { BlogDetailTemplate1 } from '@components/blog-detail/template-1';
import { BlogDetailTemplate2 } from '@components/blog-detail/template-2';
import { SEO } from '@components/seo';
import dataJsonEn from '@data/blog/en.json';
import dataJsonKo from '@data/blog/ko.json';
import dataJsonVi from '@data/blog/vi.json';
import { Axios } from '@shared/modules/axios';

const BlogDetailPage = (props: PropType) => {
  const { currentBlog, dataOtherBlog, dataBlogCategories, locale } = props;

  const staticData = {
    vi: dataJsonVi,
    ko: dataJsonKo,
    en: dataJsonEn,
  }[locale];

  return (
    <>
      <SEO title='BLOG - AMIT - Transform Digi Together' description={`${currentBlog?.attributes?.description}`} />
      <BlogDetailBanner data={currentBlog} className={currentBlog?.attributes?.bannerWithGradient ? 'bg-gradient' : ''} />
      {currentBlog.attributes.layout == 'leftSide' ? (
        <BlogDetailTemplate1
          dataBlog={currentBlog}
          dataCategories={dataBlogCategories.data}
          template_1={staticData?.template_1}
        />
      ) : (
        <BlogDetailTemplate2 dataBlog={currentBlog} dataNoCMS={staticData?.dataNoCMS} />
      )}
      <OtherPosts dataBlog={dataOtherBlog} other_blog={staticData?.other_blog} />
    </>
  );
};

export default BlogDetailPage;

type PropType = {
  currentBlog: any;
  dataOtherBlog: any;
  dataBlogCategories: any;
  locale: string;
};

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en', locales = [], params }) => {
  const dataBlogs = await Axios('blogs', `filters[slug]=${(params as ParsedUrlQuery).slug}`, locale);
  if (dataBlogs.data.length === 0) {
    return {
      notFound: true,
    };
  }

  const currentBlog = dataBlogs.data[0];

  const dataOtherBlog = await Axios(
    'blogs',
    `pagination[pageSize]=3&pagination[page]=1&filters[id][$ne]=${currentBlog.id}&filters[blog_category]=${currentBlog.attributes.blog_category.data.id}&populate=*`,
    `${locale}`
  );
  const dataBlogCategories = await Axios('blog-categories', '', `${locale}`);

  return {
    props: {
      currentBlog,
      dataOtherBlog,
      dataBlogCategories,
      locale,
    },
  };
};
