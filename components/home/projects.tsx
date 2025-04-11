import { ArrowRightOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Carousel from 'react-multi-carousel';
import { useWindowSize } from 'usehooks-ts';

import { Button } from '@components/button';
import PopupDetail from '@components/case-studies/_popup-detail';

export type ProjectProps = {
  preamble: string;
  viewMore: string;
  button: { url: string; text: string };
  projects: Multiple<{
    image: Single<StrapiMedia>;
    name: string;
    description: string;
    slug: string;
  }>;
};

const Projects = (props: ProjectProps) => {
  const { preamble, projects, viewMore, button } = props;
  const { width } = useWindowSize();

  const [currentProjectIdx, setCurrentProjectIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectSlug, setProjectSlug] = useState('');

  const router = useRouter();

  const projectsData = projects.data || [];

  const showModal = (slug: string) => {
    if (width < 768) {
      router.push(`/case-studies/${slug}`);
    } else {
      setIsModalOpen(true);
      setProjectSlug(slug);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (moved: number) => {
    setCurrentProjectIdx((current) => (current + moved + projectsData.length) % projectsData.length);
  };

  if (!projectsData.length) {
    return null;
  }

  const activeProject = projectsData[currentProjectIdx];

  return (
    <div className='home-projects'>
      <div className='container'>
        <Row gutter={24} className='home-projects-fixed'>
          <Col xs={24} md={12} xl={10} className='home-projects-detail'>
            <h2 className='text-preamble home-projects-detail__preamble' dangerouslySetInnerHTML={{ __html: preamble }}></h2>
            <h3 className='home-projects-detail__title' title={activeProject.attributes.name}>
              {activeProject.attributes.name}
            </h3>
            <p className='home-projects-detail__content'>{activeProject.attributes.description}</p>
            <div className='home-projects-detail__button'>
              <a role='button' onClick={() => showModal(activeProject.attributes.slug)}>
                {viewMore} <ArrowRightOutlined />
              </a>
              <PopupDetail open={isModalOpen} cancel={handleCancel} projectSlug={projectSlug} />
            </div>
          </Col>
          <Col xs={24} className='home-projects-carousel'>
            <div className='home-projects-carousel__list'>
              <Carousel
                responsive={responsive}
                infinite
                autoPlay={!isModalOpen}
                autoPlaySpeed={3000}
                focusOnSelect
                arrows={false}
                ssr={true}
                keyBoardControl={true}
                containerClass='home-projects-carousel__container'
                sliderClass='home-projects-carousel__slider'
                itemClass='home-projects-carousel__item'
                afterChange={(prevSlide, { currentSlide }) => handleChange(currentSlide - prevSlide)}
                centerMode={false}
              >
                {projectsData.map((project) => (
                  <div key={project.id} className='home-projects-carousel__image'>
                    {project.attributes.image.data && (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${project.attributes.image.data.attributes.url}`}
                        alt={project.attributes.image.data.attributes.alternativeText || ''}
                        fill
                        sizes='(min-width: 0px) 100vw'
                      />
                    )}
                  </div>
                ))}
              </Carousel>
            </div>
            <Link prefetch={false} href={button.url}>
              <Button type='primary' size='large'>
                {button.text}
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Projects;

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 1.5,
  },
};
