import { Button, Card, Col, Row } from 'antd';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { SEO } from '@components/seo';
import { Axios } from '@shared/modules/axios';

const StaffHiringResultPage = (props: PropType) => {
  const { staffHiringResult, staffData } = props;

  return (
    <>
      <SEO title={staffHiringResult.seo.title} description={staffHiringResult.seo.description} />
      <Row className='Page-StaffHiringResult' justify='center'>
        <Col xs={24} sm={24} md={20} lg={18} xl={14}>
          <Row className='sh-banner'>
            <Col>
              <h1 className='sh-title'>{staffHiringResult.title}</h1>
              <p className='sh-description'>
                {staffHiringResult.description}:{' '}
                <b>
                  {staffData.role} ({staffData.yearsOfExperience})
                </b>
              </p>
            </Col>
          </Row>
          <Card className='sh-card'>
            <Row>
              <Col className='sh-informations'>
                <p className='sh-title'>{staffData.title}</p>
                <p className='sh-role'>{staffData.role}</p>
                <div className='sh-information'>
                  <div>
                    <b>{staffHiringResult.quantity}:</b> <span>{staffData.quantity}</span>
                  </div>
                  <div>
                    <b>{staffHiringResult.length}:</b> <span>{staffData.length}</span>
                  </div>
                  <div>
                    <b>{staffHiringResult.timezone}:</b> <span>{staffData.timezone}</span>
                  </div>
                </div>
              </Col>
              <Col className='sh-details'>
                <Row className='sh-header'>
                  <Col span={6}>{staffHiringResult.tableHeader1}</Col>
                  <Col span={6}>
                    {staffHiringResult.tableHeader2} <span className='highlight'>*</span>
                  </Col>
                  <Col span={6}>{staffHiringResult.tableHeader3}</Col>
                  <Col span={6}>{staffHiringResult.tableHeader4}</Col>
                </Row>
                <Row className='sh-data'>
                  <Col className='sh-hourly' span={6}>
                    ${staffData.hourly.toLocaleString()}
                  </Col>
                  <Col className='sh-rates' span={18}>
                    {staffData.rates.map((rate) => (
                      <Row className={`sh-rate ${rate.isSelected ? 'active' : ''}`} key={rate.time}>
                        <Col className='time' span={8}>
                          {rate.time}
                        </Col>
                        <Col className='total' span={8}>
                          ${rate.total.toLocaleString()}
                        </Col>
                        <Col className='monthly' span={8}>
                          ${rate.monthly.toLocaleString()}
                        </Col>
                      </Row>
                    ))}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
          <Row className='sh-moreInfo' justify='center'>
            <Col xs={24} md={20}>
              <div className='sh-note' dangerouslySetInnerHTML={{ __html: staffHiringResult.note || '' }} />
              <p>
                {staffHiringResult.contactUs1}{' '}
                <Link prefetch={false} href={staffHiringResult.contactUsUrl}>
                  <Button type='primary' className='sh-button btn-contact'>
                    {staffHiringResult.contactUs2}
                  </Button>
                </Link>
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default StaffHiringResultPage;

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en', query }) => {
  const response = await Axios('staff-hiring-result', 'populate=seo', locale);

  const staffResponse = (await Axios('staff-hirings', `populate=staff_rate.hourlyRate&filters[uid]=${query.uid || ''}`, locale))
    .data;

  if (!staffResponse) {
    return {
      redirect: {
        destination: `/${locale}/staff-hiring`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      staffHiringResult: response?.data?.attributes || {},
      staffData: staffResponse,
    },
  };
};

type PropType = {
  staffHiringResult: any;
  staffData: any;
  language: any;
};
