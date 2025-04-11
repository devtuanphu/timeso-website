import { Col, Row } from 'antd';
import dayjs from 'dayjs';
import PropTypes, { InferProps } from 'prop-types';
import { useEffect, useRef } from 'react';
import { useWindowSize } from 'usehooks-ts';

import { Button } from '@components/button';
import { CareerApplication } from '../application';

const CareerDetailContent = (props: CareerDetailTypes) => {
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const { width, height } = useWindowSize();

  useEffect(() => {}, [scrollRef]);

  const handleApply = () => {
    scrollRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  return (
    <>
      <div className='careerdetail-content'>
        <div className='container'>
          <Row gutter={[24, 24]}>
            <Col
              xs={24}
              lg={18}
              order={width > 1023 ? 0 : 1}
              className='careerdetail-content-heading'
              dangerouslySetInnerHTML={{ __html: props.data.content }}
            ></Col>
            <Col xs={24} lg={6} order={width > 1023 ? 1 : 0}>
              <div className='careerdetail-content-detail'>
                <div className='careerdetail-content-detail__item'>
                  <p>{props.data.amount}</p>
                  <p>{props.data.title}</p>
                </div>
                <div className='careerdetail-content-detail__item'>
                  <p>{props.data.yearOfExperience}</p>
                  <p>{props.career_detailContent?.experience}</p>
                </div>
                <div className='careerdetail-content-detail__item'>
                  <p>{dayjs(props.data.expiredDate).format('DD/MM/YYYY')}</p>
                  <p>{props.career_detailContent?.expired_name}</p>
                </div>
                <div className='careerdetail-content-detail__button'>
                  {props.data.expiredDate > new Date().toISOString() ? (
                    <Button onClick={handleApply}>{props.career_detailContent?.button_apply}</Button>
                  ) : (
                    <Button disabled>{props.career_detailContent?.button_apply_disabled}</Button>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      {props.data.expiredDate > new Date().toISOString() ? (
        <CareerApplication id={props.id} title={props.data.title} application={props.application} scrollRef={scrollRef} />
      ) : null}
    </>
  );
};

const careerDetailPropTypes = {
  id: PropTypes.any,
  data: PropTypes.shape({
    content: PropTypes.any,
    expiredDate: PropTypes.any,
    yearOfExperience: PropTypes.string,
    title: PropTypes.string,
    amount: PropTypes.string,
  }).isRequired,
  career_detailContent: PropTypes.shape({
    button_apply: PropTypes.string,
    button_apply_disabled: PropTypes.string,
    experience: PropTypes.string,
    expired_name: PropTypes.string,
  }),
  application: PropTypes,
};

type CareerDetailTypes = InferProps<typeof careerDetailPropTypes>;

export { CareerDetailContent };
