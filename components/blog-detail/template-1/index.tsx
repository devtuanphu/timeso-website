import { Col, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes, { InferProps } from 'prop-types';
import { FacebookShareButton, LinkedinShareButton } from 'react-share';

import { FacebookIcon } from './icons/FacebookIcon';
import { LinkedinIcon } from './icons/LinkedinIcon';
import { IconKeyword } from './icons/keyword';

const BlogDetailTemplate1 = (props: BlogDetailTypes) => {
  const router = useRouter();
  const { dataBlog, dataCategories } = props;
  const handleShareEmail = () => {
    const url = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=AMIT GROUP ${dataBlog?.attributes?.title}&body=${process.env.NEXT_PUBLIC_SERVER_URL}${router.asPath}&ui=2&tf=1&pli=1`;
    window.open(url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
  };

  const addHost = (str, host) => {
    return str.split('src="/uploads').join(`src=\"${host}/uploads`);
  };

  return (
    <div className='blogTemp1'>
      <div className='container'>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={24} lg={18}>
            <div className='blogTemp1-content'>
              <div
                dangerouslySetInnerHTML={{
                  __html: addHost(dataBlog?.attributes?.content, process.env.NEXT_PUBLIC_STRAPI_URL),
                }}
              />
              <div className='blogTemp1-content-keyword'>
                <p>
                  <IconKeyword /> {props.template_1?.keyword}
                </p>
                {dataBlog?.attributes?.keywords &&
                  dataBlog?.attributes?.keywords?.map((keyword, index: number) => (
                    <a key={index} className='blogTemp1-content-keyword__item'>
                      {keyword}
                    </a>
                  ))}
              </div>
              <div className='blogTemp1-content-share'>
                <p>{props.template_1?.share}</p>
                <FacebookShareButton
                  url={process.env.NEXT_PUBLIC_SERVER_URL + router.asPath}
                  quote={'AMIT GROUP ' + dataBlog?.attributes?.title}
                  className='blogTemp1-content-share__item'
                >
                  <FacebookIcon />
                </FacebookShareButton>
                <LinkedinShareButton
                  url={process.env.NEXT_PUBLIC_SERVER_URL + router.asPath}
                  title={'AMIT GROUP ' + dataBlog?.attributes?.title}
                  className='blogTemp1-content-share__item'
                >
                  <LinkedinIcon />
                </LinkedinShareButton>
                <button onClick={() => handleShareEmail()} className='blogTemp1-content-share__item'>
                  <Image src='/assets/blog/Gmail logo.png' width={24} height={24} alt='Icon share to gmail' />
                </button>
              </div>
            </div>
          </Col>
          <Col xs={24} md={24} lg={6}>
            <div className='blogTemp1-category'>
              <p className='blogTemp1-category-title'>{props.template_1?.menu_name}</p>
              <ul className='blogTemp1-category-menu'>
                {dataCategories &&
                  dataCategories.map((item: any, index: number) => (
                    <li className='blogTemp1-category-item' key={index}>
                      <Link
                        prefetch={false}
                        href={`/${!!router.locale ? router.locale + '/blog' : router?.asPath?.split('/')[1]}?filter=${
                          item.id
                        }`}
                      >
                        {item.attributes.name}({item.count})
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const blogDetailPropTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    slug: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    hashtag: PropTypes.string,
    category: PropTypes.string,
    template: PropTypes.number,
    created_at: PropTypes.string,
    backdrop: PropTypes.string,
    content: PropTypes.object,
    keyword: PropTypes.array,
    share: PropTypes.array,
  }),

  dataBlog: PropTypes.shape({
    id: PropTypes.number,
    attributes: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      content: PropTypes.string,
      keywords: PropTypes.arrayOf(PropTypes.string),
      slug: PropTypes.string,
      banner: PropTypes.shape({
        data: PropTypes.shape({
          id: PropTypes.number,
          attributes: PropTypes.shape({
            alternativeText: PropTypes.string,
            url: PropTypes.string,
          }),
        }),
      }),
      blog_category: PropTypes.shape({
        data: PropTypes.shape({
          id: PropTypes.number,
          attributes: PropTypes.shape({
            name: PropTypes.string,
          }),
        }),
      }),
    }),
  }),

  dataCategories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      count: PropTypes.number,
      attributes: PropTypes.shape({
        name: PropTypes.string,
      }),
    })
  ),

  countOperating: PropTypes.number,
  countProducts: PropTypes.number,
  countEbook: PropTypes.number,
  countTechnogy: PropTypes.number,
  template_1: PropTypes.shape({
    keyword: PropTypes.string,
    share: PropTypes.string,
    menu_name: PropTypes.string,
    menu_item: PropTypes.array,
  }),
};

type BlogDetailTypes = InferProps<typeof blogDetailPropTypes>;

export { BlogDetailTemplate1 };
