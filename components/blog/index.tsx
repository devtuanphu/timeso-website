/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowLeftOutlined, ArrowRightOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Col, Empty, Pagination, Row, Select } from 'antd';
import { useRouter } from 'next/router';
import PropTypes, { InferProps } from 'prop-types';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import { Button } from '@components/button';
import { Axios } from '@shared/modules/axios';
import { CardItem } from './_card-item';

const { Option } = Select;

const BlogCategory = (props: BlogTypes) => {
  const router = useRouter();
  const { dataCaseStudies, dataBlog, dataNoCMS } = props;
  const { width, height } = useWindowSize();
  const [activeBtn, setActiveBtn] = useState(0);

  const [dataBlogs, setDataBlogs] = useState(dataBlog);

  const handleFilterBtn = async (id: any) => {
    setActiveBtn(id);
    const res = await Axios(
      'blogs',
      `pagination[pageSize]=7&pagination[page]=1&sort[0]=createdAt:desc&${
        id != 0 ? `filters[blog_category]=${id}` : ''
      }&populate=*`,
      router.locale
    );
    setDataBlogs(res);
    router.replace(`${!!router.locale ? '/' + router.locale : ''}/blog`, undefined, { shallow: true });
  };

  const handleChangePagination = async (page: number, pageSize: number) => {
    const res = await Axios(
      'blogs',
      `pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort[0]=createdAt:desc&${
        activeBtn != 0 ? `filters[blog_category]=${activeBtn}` : ''
      }&populate=*`,
      router.locale
    );
    setDataBlogs(res);
    handleAmnimationCard();
  };

  const handleAmnimationCard = () => {
    document.querySelectorAll('.caseStudies-product-item').forEach((v) => v.classList.add('show'));
    setTimeout(() => {
      document.querySelectorAll('.caseStudies-product-item').forEach((v) => v.classList.remove('show'));
    }, 500);
  };

  useEffect(() => {
    if (router.query?.filter) {
      handleFilterBtn(router.query?.filter);
    }
    if (dataBlog) {
      setDataBlogs(dataBlog);
    }
  }, [!!router.query.filter, dataBlog]);

  return (
    <div className='blog'>
      <div className='container'>
        <Row gutter={24} justify='center'>
          <Col md={24}>
            <div className='blog-control'>
              <div className='blog-control-groupBtn'>
                {width < 576 ? (
                  <>
                    <span className='hashtag'>Hashtag</span>
                    <Select
                      defaultValue={activeBtn}
                      className='select'
                      onChange={(values) => handleFilterBtn(values)}
                      suffixIcon={<CaretDownOutlined style={{ color: '#878787' }} />}
                    >
                      <Option className='select-option' key={0} value={0}>
                        {dataNoCMS?.filter_all}
                      </Option>
                      {dataCaseStudies?.blog_categories?.data &&
                        dataCaseStudies?.blog_categories?.data?.map((category, index: number) => (
                          <Option className='select-option' key={category?.id} value={category?.id}>
                            {category?.attributes?.name}
                          </Option>
                        ))}
                    </Select>
                  </>
                ) : (
                  <>
                    <Button
                      className={`filter-button blog-control-btn ${activeBtn === 0 ? 'active' : ''}`}
                      onClick={() => handleFilterBtn(0)}
                    >
                      {dataNoCMS?.filter_all}
                    </Button>
                    {dataCaseStudies?.blog_categories?.data?.map((category) => (
                      <Button
                        key={category?.id}
                        className={`filter-button blog-control-btn ${activeBtn == category?.id ? 'active' : ''}`}
                        onClick={() => handleFilterBtn(category?.id)}
                      >
                        {category?.attributes?.name}
                      </Button>
                    ))}
                  </>
                )}
              </div>
            </div>
          </Col>
        </Row>
        {dataBlogs?.data && dataBlogs?.data.length > 0 ? (
          <CardItem dataNoCMS={dataNoCMS} dataCard={dataBlogs?.data} />
        ) : (
          <Empty />
        )}
        <Row gutter={24} className='blog-list'>
          {dataBlogs?.data && dataBlogs?.data.length > 0 && (
            <Col span={24}>
              <Pagination
                defaultCurrent={1}
                current={dataBlogs?.meta?.pagination?.page}
                defaultPageSize={dataBlogs?.meta?.pagination?.pageSize}
                total={dataBlogs?.meta?.pagination?.total}
                onChange={(page: number, pageSize: number) => handleChangePagination(page, pageSize)}
                nextIcon={
                  <a className='am-pagination-arrow'>
                    <p>{dataNoCMS?.btn_next}</p> <ArrowRightOutlined />
                  </a>
                }
                prevIcon={
                  <a className='am-pagination-arrow'>
                    <ArrowLeftOutlined /> <p>{dataNoCMS?.btn_prev}</p>
                  </a>
                }
              />
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
};

const blogPropTypes = {
  blog_button: PropTypes.shape({
    view_more: PropTypes.string,
    btn_prev: PropTypes.string,
    btn_next: PropTypes.string,
  }),
  dataCaseStudies: PropTypes.shape({
    blog_categories: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          attributes: PropTypes.shape({
            name: PropTypes.string,
          }),
        })
      ),
    }),
  }),

  dataBlog: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        attributes: PropTypes.shape({
          title: PropTypes.string,
          description: PropTypes.string,
          content: PropTypes.string,
          keywords: PropTypes.arrayOf(PropTypes.string),
          slug: PropTypes.string,
          createdAt: PropTypes.string,
          banner: PropTypes.shape({
            id: PropTypes.number,
            attributes: PropTypes.shape({
              alternativeText: PropTypes.string,
              url: PropTypes.string,
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
          thumbnail: PropTypes.shape({
            data: PropTypes.shape({
              id: PropTypes.number,
              attributes: PropTypes.shape({
                alternativeText: PropTypes.string,
                url: PropTypes.string,
              }),
            }),
          }),
        }),
      })
    ),
    meta: PropTypes.shape({
      pagination: PropTypes.shape({
        page: PropTypes.number.isRequired,
        pageSize: PropTypes.number.isRequired,
        pageCount: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
      }),
    }),
  }),

  dataNoCMS: PropTypes.shape({
    filter_all: PropTypes.string,
    view_more: PropTypes.string,
    btn_prev: PropTypes.string,
    btn_next: PropTypes.string,
  }),
};

type BlogTypes = InferProps<typeof blogPropTypes>;

export { BlogCategory };
