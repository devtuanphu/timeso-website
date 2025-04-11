import { NextSeo } from 'next-seo';

type SeoProps = { title?: string; description?: string };

const SEO = (props: SeoProps) => {
  const { title = `TimeSo`, description = `TimeSo` } = props;

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={'https://timeso.vn/'}
      openGraph={{
        type: 'website',
        url: 'https://timeso.vn/',
        title,
        description,
        images: [
          {
            url: `/assets/thumbnail.png`,
            width: 800,
            height: 600,
            alt: 'Image thumbnail AMIT',
          },
        ],
      }}
    />
  );
};

export { SEO };
