import { LeftOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button } from '@components/button';
import { SEO } from '@components/seo';
import { Axios } from '@shared/modules/axios';

type ProjectDetailProps = Single<{
  image: Single<StrapiMedia>;
  isSaas: boolean;
  proposal: Single<StrapiMedia>;
  project_category: Single<{
    name: string;
  }>;
  name: string;
  description: string;
  customer: Single<{
    name: string;
    logo: Single<StrapiMedia>;
  }>;
  technologies: Multiple<{
    category: 'technology' | 'os';
    logo1: Single<StrapiMedia>;
    name: string;
  }>;
  sections: StrapiComponent<{
    title: string;
    subTitle: string | null;
    content: string;
  }>[];
}>;

const ProjectDetail = ({ data }: ProjectDetailProps) => {
  const router = useRouter();

  const staticData = {
    en: {
      back: 'Go back',
      customer: 'Client',
      technology: 'Technology',
      operatingSystem: 'Operating system',
      downloadProposal: 'Download proposal',
    },
    vi: {
      back: 'Quay về',
      customer: 'Khách hàng',
      technology: 'Công nghệ',
      operatingSystem: 'Hệ điều hành',
      downloadProposal: 'Tải proposal',
    },
    ko: {
      back: '돌아가기',
      customer: '고객',
      technology: '기술',
      operatingSystem: '운영체계',
      downloadProposal: '제안서 다운로드',
    },
  }[router.locale || 'en'];

  if (!data || !staticData) {
    return null;
  }

  const { image, isSaas, project_category, name, description, customer, technologies, sections } = data.attributes;

  const technology = technologies.data?.filter((t) => t.attributes.category === 'technology') || [];
  const operatingSystem = technologies.data?.filter((t) => t.attributes.category === 'os') || [];

  return (
    <>
      <SEO
        title='Case Studies - AMIT - Transform Digi Together'
        description='Over the years, we have created applications and platforms that bring good experiences to clients from many different fields.'
      />
      <div className='project-mobile'>
        <div className='button-back' onClick={() => router.back()}>
          <Button className='project-mobile_back'>
            <LeftOutlined width={9} height={18} />
          </Button>
          {staticData.back}
        </div>
        {data && (
          <Row gutter={24}>
            <Col span={24} className='caseStudies-popup-carousel'>
              {image.data && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${image.data.attributes.url}`}
                  width={500}
                  height={210}
                  className='caseStudies-popup-carousel--image'
                  alt={image.data.attributes.alternativeText || ''}
                  placeholder='blur'
                  blurDataURL='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MjAgNDMwIj4NCiAgICA8cmVjdCB3aWR0aD0iNDIwIiBoZWlnaHQ9IjQzMCIgZmlsbD0iI2NjY2NjYyI+PC9yZWN0Pg0KICAgIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjI2cHgiIGZpbGw9IiMzMzMzMzMiPjQyMHg0MzA8L3RleHQ+ICAgDQo8L3N2Zz4='
                  quality={100}
                  style={{
                    maxWidth: '100%',
                    height: '210px',
                  }}
                />
              )}
            </Col>
            <Col span={24}>
              <div className='caseStudies-popup-info'>
                <p className='info-category'>{project_category.data?.attributes.name}</p>
                <h4 className='info-title'>{name}</h4>
                <p className='info-description'>{description}</p>
                {!isSaas && (
                  <div className='info-customer'>
                    <p className='info-heading'>{staticData.customer}</p>
                    {customer.data?.attributes.logo.data && (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${customer.data.attributes.logo.data.attributes.url}`}
                        alt={customer.data.attributes.name || ''}
                        width={160}
                        height={160}
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                        }}
                      />
                    )}
                  </div>
                )}
                {technology.length !== 0 && (
                  <div className='info-content'>
                    <p className='info-content-heading'>{staticData.technology}</p>
                    <div className='info-content-description'>
                      {technology.map((t) => {
                        return (
                          t.attributes.logo1.data && (
                            <Image
                              key={t.id}
                              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${t.attributes.logo1.data.attributes.url}`}
                              alt={t.attributes.name || ''}
                              width={40}
                              height={40}
                            />
                          )
                        );
                      })}
                    </div>
                  </div>
                )}
                {operatingSystem.length !== 0 && (
                  <div className='info-content'>
                    <p className='info-content-heading'>{staticData.operatingSystem}</p>
                    <div className='info-content-description'>
                      {operatingSystem.map((os) => {
                        return (
                          os.attributes.logo1.data && (
                            <Image
                              key={os.id}
                              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${os.attributes.logo1.data.attributes.url}`}
                              alt={os.attributes.name || ''}
                              width={40}
                              height={40}
                            />
                          )
                        );
                      })}
                    </div>
                  </div>
                )}
                {sections?.map((secs) => (
                  <div className='info-content-content' key={secs?.id}>
                    <p className='info-content-heading'>{secs?.title}</p>
                    <p className='info-content-description'>{secs?.content}</p>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default ProjectDetail;

export const getServerSideProps: GetServerSideProps = async ({ locale, params = {} }) => {
  const res = await Axios(
    'projects',
    `populate=image,project_category,customer.logo,technologies.logo1,sections&filters[slug]=${params.slug || ''}`,
    locale
  );
  return {
    props: {
      data: res.data[0],
    },
  };
};
