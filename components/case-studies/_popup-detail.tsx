import { Col, Modal, Row } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Button } from '@components/button';
import { Axios } from '@shared/modules/axios';

type PopupProps = {
  open: boolean;
  cancel: (e: React.MouseEvent<HTMLElement>) => void;
  projectSlug: string;
};

type Project = StrapiObject<{
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
}> | null;

const PopupDetail = (props: PopupProps) => {
  const { open, cancel, projectSlug } = props;
  const { locale = 'en' } = useRouter();

  const [data, setData] = useState<Project>(null);

  const staticData = {
    en: {
      customer: 'Client',
      technology: 'Technology',
      operatingSystem: 'Operating system',
      downloadProposal: 'Download proposal',
    },
    vi: {
      customer: 'Khách hàng',
      technology: 'Công nghệ',
      operatingSystem: 'Hệ điều hành',
      downloadProposal: 'Tải proposal',
    },
    ko: {
      customer: '고객',
      technology: '기술',
      operatingSystem: '운영체계',
      downloadProposal: '제안서 다운로드',
    },
  }[locale];

  useEffect(() => {
    (async () => {
      if (!projectSlug) {
        return;
      }
      const res = await Axios(
        'projects',
        `populate=image,project_category,customer.logo,technologies.logo1,sections,image,project_category,customer.logo,technologies.logo1,sections&filters[slug]=${projectSlug}`,
        locale
      );
      if (!!res?.data[0]) {
        setData(res.data[0]);
      }
    })();
  }, [projectSlug, locale]);

  if (!data || !staticData) {
    return null;
  }

  const { image, isSaas, proposal, project_category, name, description, customer, technologies, sections } = data.attributes;

  const technology = technologies.data?.filter((t) => t.attributes.category === 'technology') || [];
  const operatingSystem = technologies.data?.filter((t) => t.attributes.category === 'os') || [];

  return (
    <Modal
      open={open}
      footer={null}
      closable={true}
      focusTriggerAfterClose={true}
      onCancel={cancel}
      width='100%'
      className='caseStudies-popup'
      bodyStyle={{ padding: '2.5rem 0', borderRadius: '5rem' }}
      closeIcon={true}
      centered={true}
    >
      <Row gutter={24}>
        <Col xs={24} md={12} lg={10} className='caseStudies-popup-carousel'>
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
          {isSaas && !!proposal.data && (
            <Button size='large' onClick={() => window.open(proposal.data?.attributes.url)}>
              {staticData.downloadProposal}
            </Button>
          )}
        </Col>
        <Col xs={24} md={12} lg={14}>
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
            {sections.map((secs) => (
              <div className='info-content' key={secs.id}>
                <p className='info-content-heading'>{secs.title}</p>
                <p className='info-content-description'>{secs.content}</p>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default PopupDetail;
