import { Button, Col, Row } from 'antd';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { SEO } from '@components/seo';
import { Axios } from '@shared/modules/axios';
import Image from 'next/image';
import Snow from '@assets/quick-quotes/snowflakes.png';

const QuickQuotesResultPage = (props: PropType) => {
  const { QuickQuotesResult } = props;

  return (
    <>
      <SEO title={QuickQuotesResult.seo.title} description={QuickQuotesResult.seo.description} />
      <Row className='Page-QuickQuotesResult' justify='center' align='middle'>
        {Array.from(Array(20).keys()).map((e: any, index: number) => {
          let left = Math.random() * 100;
          let top = Math.floor(Math.random() * 95);
          return (
            <div
              key={index}
              className='qq-chrismas-snow'
              style={{ top: `${top}%`, left: `${left}%`, animationDelay: `${1 + Math.random()}s` }}
            >
              <Image src={Snow} alt='snow' height={Math.floor(Math.random()) * 40} width={Math.floor(Math.random()) * 40} />
            </div>
          );
        })}
        <Col xs={24} sm={24} md={20} lg={18} xl={14}>
          <Row className='sh-banner'>
            <Col>
              <h1 className='sh-title qq-chrismas-linearGreen'>{QuickQuotesResult.title}</h1>
            </Col>
          </Row>
          <Row className='sh-moreInfo' justify='center'>
            <Col xs={24} md={20}>
              <div className='sh-desc' dangerouslySetInnerHTML={{ __html: QuickQuotesResult.description || '' }} />
              <p>
                {QuickQuotesResult.contactUs1}{' '}
                <Link prefetch={false} href={QuickQuotesResult.contactUsUrl}>
                  <Button type='primary' className='sh-button chrismas btn-contact'>
                    {QuickQuotesResult.contactUs2}
                  </Button>
                </Link>
              </p>
              <div className='sh-note' dangerouslySetInnerHTML={{ __html: QuickQuotesResult.note || '' }} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default QuickQuotesResultPage;

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en', query }) => {
  const response = await Axios('quick-quotes-result', 'populate=seo', locale);

  return {
    props: {
      QuickQuotesResult: response?.data?.attributes || {},
    },
  };
};

type PropType = {
  QuickQuotesResult: any;
  language: any;
};
