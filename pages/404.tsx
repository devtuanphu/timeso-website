import { GetStaticProps } from 'next';
import Link from 'next/link';

import { Button } from '@components/button';
import { SEO } from '@components/seo';
import { Axios } from '@shared/modules/axios';

type FourOhFourProps = {
  seo: {
    title: string;
    description: string;
  };
  title: string;
  description: string;
  button: {
    text: string;
    url: string;
  };
};

const FourOhFour = ({ seo, title, description, button }: FourOhFourProps) => (
  <div className='PageNotFound'>
    <SEO title={seo.title} description={seo.description} />
    <div className='PageNotFound-container'>
      <h2 className='PageNotFound-title'>{title}</h2>
      <p className='PageNotFound-content'>{description}</p>
      <Link href={button.url}>
        <Button className='PageNotFound-button'>{button.text}</Button>
      </Link>
    </div>
  </div>
);

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  const response = await Axios('page-not-found', 'populate=seo,button', locale);

  const props = {
    seo: response?.data?.attributes.seo || {
      title: 'Not Found - AMIT Group - Sustainable IT Solution',
      description: `We are so sorry because the page you are looking for cannot be found. Don't worry too much about this. Please return to the homepage!`,
    },
    title: response?.data?.attributes.title || '',
    description: response?.data?.attributes.description || '',
    button: response?.data?.attributes.button || { url: '', text: '' },
  };

  return { props };
};

export default FourOhFour;
