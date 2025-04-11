import { Col, Rate, Row } from 'antd';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';

export type FeedbackProps = {
  title: string;
  feedbacks: Multiple<{
    name: string;
    title: string;
    avatar: Single<StrapiMedia>;
    rate: number;
    feedback: string;
  }>;
};

const Feedback = (props: FeedbackProps) => {
  const { title, feedbacks } = props;

  return (
    <div className='home-feedback'>
      <div className='container'>
        <Row gutter={24} className='home-feedback_fixed'>
          <Col xs={24} md={8} xl={10} className='home-feedback_title'>
            <Image width={166} height={166} src='/assets/Home/icon-feedback.png' alt='icon' />
            <h3>{title}</h3>
          </Col>
          <Col xs={24} md={12} xl={10} className='home-feedback_carousel'>
            <div className='home-feedback_carousel-list'>
              <Carousel
                responsive={responsive}
                infinite
                autoPlay={true}
                autoPlaySpeed={5000}
                focusOnSelect={true}
                arrows={false}
                ssr={true}
                keyBoardControl={true}
                containerClass='home-feedback_carousel-container'
                sliderClass='home-feedback_carousel-slider'
                itemClass='home-feedback_carousel-item'
                centerMode={false}
              >
                {feedbacks.data?.map((feedback) => (
                  <div key={feedback.id} className='home-feedback_carousel-card'>
                    <div className='card-header'>
                      <div className='card-header_content'>
                        <div className='card-header_content-name'>
                          <h6>{feedback.attributes.name}</h6>
                          <p>{feedback.attributes.title}</p>
                        </div>
                        {feedback.attributes.avatar.data && (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${feedback.attributes.avatar.data.attributes.url}`}
                            width={50}
                            height={50}
                            alt={feedback.attributes.avatar.data.attributes.alternativeText || ''}
                          />
                        )}
                      </div>
                      <Rate defaultValue={feedback.attributes.rate} disabled={true} allowHalf character='★' />
                    </div>
                    <div className='card-body'>
                      <p>{feedback.attributes.feedback}</p>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Feedback;

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
    breakpoint: { max: 1024, min: 767 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 1.3,
    partialVisibilityGutter: 0,
  },
};
