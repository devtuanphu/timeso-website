/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowLeftOutlined, ArrowRightOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Col, Empty, Pagination, Row, Select } from 'antd';
import { useRouter } from 'next/router';
import PropTypes, { InferProps } from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import { Button } from '@components/button';
import { Axios } from '@shared/modules/axios';
import { CardItem } from './_card-item';

const { Option } = Select;
const CaseStudiesCategories = (props: CaseTypes) => {
  const { dataCategories, dataProjects, dataNoCMS } = props;
  const [dataPros, setDataPros] = useState<any | undefined>(dataProjects);
  const [pageSize, setPageSize] = useState(dataProjects?.meta?.pagination?.pageSize);

  const scrollRef = useRef<null | HTMLDivElement>(null);
  const router = useRouter();
  const { width } = useWindowSize();
  const [activeChildBtn, setActiveChildBtn] = useState(0);
  const [activeParentBtn, setActiveParentBtn] = useState(0);

  useEffect(() => {
    setDataPros(dataProjects);
    setPageSize(dataProjects?.meta?.pagination?.pageSize);
  }, [dataProjects]);

  const animationCard = () => {
    setTimeout(() => {
      document.querySelectorAll('.caseStudies-product-item').forEach((v) => v.classList.add('show'));
      setTimeout(() => {
        document.querySelectorAll('.caseStudies-product-item').forEach((v) => v.classList.remove('show'));
      }, 500);
    });
  };

  const executeScroll = () => scrollRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });

  const handleChangePagination = async (page: number, pageSize: number) => {
    const res = await Axios(
      'projects',
      `pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[isSaas]=${activeParentBtn === 0 ? 'false' : 'true'}${
        activeChildBtn ? `&filters[project_category]=${activeChildBtn}` : ''
      }`,
      router.locale
    );
    setDataPros(res);
    setPageSize(pageSize);
    executeScroll();
    animationCard();
  };

  const handleChangeParent = async (index: number) => {
    setActiveParentBtn(index);
    setActiveChildBtn(0);
    const res = await Axios(
      'projects',
      `pagination[page]=${1}&pagination[pageSize]=${pageSize}&filters[isSaas]=${index === 0 ? 'false' : 'true'}`,
      router.locale
    );
    setDataPros(res);
    animationCard();
  };

  const handleChangeChild = async (category_id: any) => {
    setActiveChildBtn(category_id != null ? category_id : 0);
    const res = await Axios(
      'projects',
      `pagination[page]=${1}&pagination[pageSize]=${pageSize}&filters[isSaas]=${activeParentBtn === 0 ? 'false' : 'true'}${
        category_id ? `&filters[project_category]=${category_id}` : ''
      }`,
      router.locale
    );
    setDataPros(res);
    animationCard();
  };

  useEffect(() => {
    handleChangeChild(0);
  }, [router.locale]);

  return (
    <div className='caseStudies-product' ref={scrollRef}>
      <div className='container'>
        <Row gutter={24}>
          <Col md={24}>
            <div className='caseStudies-product-control'>
              <div className='caseStudies-product-control__btnParent'>
                {dataNoCMS?.category_type_filter?.map((item, index: number) => (
                  <Button
                    key={index}
                    className={`filter-button caseStudies-product-control__btnParent--btn ${
                      activeParentBtn === index ? 'active' : ''
                    }`}
                    onClick={() => handleChangeParent(index)}
                  >
                    {item}
                  </Button>
                ))}
              </div>
              <div className='caseStudies-product-control__btnChild'>
                {width < 576 ? (
                  <>
                    <span className='hashtag'>Hashtag</span>
                    <Select
                      value={activeChildBtn ? activeChildBtn : dataNoCMS?.view_all}
                      className='select'
                      onChange={(e) => handleChangeChild(e)}
                      suffixIcon={<CaretDownOutlined style={{ color: '#878787' }} />}
                    >
                      <Option
                        className={`select-option ${router.locale} caseStudies-product-control__btnChild--option`}
                        values={0}
                      >
                        {dataNoCMS?.view_all}
                      </Option>
                      {dataCategories?.project_categories?.data?.map((item) => (
                        <Option
                          key={item?.id}
                          className={`select-option ${router.locale} caseStudies-product-control__btnChild--option`}
                          values={item?.id}
                        >
                          {item?.attributes?.name}
                        </Option>
                      ))}
                    </Select>
                  </>
                ) : (
                  <>
                    <Button
                      className={`filter-button caseStudies-product-control__btnChild--btn ${
                        activeChildBtn === 0 ? 'active' : ''
                      }`}
                      onClick={() => handleChangeChild(0)}
                    >
                      {dataNoCMS?.view_all}
                    </Button>

                    {dataCategories?.project_categories?.data?.map((item) => (
                      <Button
                        key={item?.id}
                        className={`filter-button caseStudies-product-control__btnChild--btn ${
                          activeChildBtn === item?.id ? 'active' : ''
                        }`}
                        onClick={() => handleChangeChild(item?.id)}
                      >
                        {item?.attributes?.name}
                      </Button>
                    ))}
                  </>
                )}
              </div>
            </div>
          </Col>
        </Row>
        <Row
          gutter={[24, 24]}
          className='caseStudies-product-list'
          justify={dataPros?.data && dataPros?.data.length > 0 ? 'start' : 'center'}
        >
          {dataPros?.data?.length > 0 ? <CardItem data={dataPros?.data} dataNoCMS={dataNoCMS} /> : <Empty />}
          <Col span={24}>
            <Pagination
              defaultCurrent={1}
              current={dataPros?.meta?.pagination?.page}
              total={dataPros?.meta?.pagination?.total}
              defaultPageSize={dataPros?.meta?.pagination?.pageSize}
              onChange={(page: number, pageSize: number) => handleChangePagination(page, pageSize)}
              className='caseStudies-product-pagination'
              nextIcon={
                <a className='am-pagination-arrow'>
                  <p>{dataNoCMS?.arrow_right}</p> <ArrowRightOutlined />
                </a>
              }
              prevIcon={
                <a className='am-pagination-arrow'>
                  <ArrowLeftOutlined /> <p>{dataNoCMS?.arrow_left}</p>
                </a>
              }
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

const casePropTypes = {
  dataCategories: PropTypes.shape({
    project_categories: PropTypes.shape({
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

  dataProjects: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        attributes: PropTypes.shape({
          name: PropTypes.string,
          description: PropTypes.string,
          isSaas: PropTypes.bool,
          slug: PropTypes.string,
          image: PropTypes.shape({
            data: PropTypes.shape({
              id: PropTypes.number,
              attributes: PropTypes.shape({
                alternativeText: PropTypes.string,
                url: PropTypes.string,
              }),
            }),
          }),
          proposal: PropTypes.shape({
            data: PropTypes.shape({
              id: PropTypes.number,
              attributes: PropTypes.shape({
                url: PropTypes.string,
              }),
            }),
          }),
          project_category: PropTypes.shape({
            data: PropTypes.shape({
              id: PropTypes.number,
              attributes: PropTypes.shape({
                name: PropTypes.string,
              }),
            }),
          }),
          customer: PropTypes.shape({
            data: PropTypes.shape({
              id: PropTypes.number,
              attributes: PropTypes.shape({
                name: PropTypes.string,
                logo: PropTypes.shape({
                  data: PropTypes.shape({
                    attributes: PropTypes.shape({
                      url: PropTypes.string,
                    }),
                  }),
                }),
              }),
            }),
          }),
          technologies: PropTypes.shape({
            data: PropTypes.arrayOf(
              PropTypes.shape({
                id: PropTypes.number,
                attributes: PropTypes.shape({
                  name: PropTypes.string,
                  category: PropTypes.string,
                  logo1: PropTypes.shape({
                    data: PropTypes.shape({
                      id: PropTypes.number,
                      attributes: PropTypes.shape({
                        url: PropTypes.string,
                      }),
                    }),
                  }),
                }),
              })
            ),
          }),
          sections: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string,
              title: PropTypes.string,
              subTitle: PropTypes.string,
              content: PropTypes.string,
            })
          ),
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
    category_type: PropTypes.arrayOf(PropTypes.string),
    category_type_filter: PropTypes.arrayOf(PropTypes.string),
    view_all: PropTypes.string,
    view_detail: PropTypes.string,
    customer_name: PropTypes.string,
    tech_name: PropTypes.string,
    os_name: PropTypes.string,
    challenge_name: PropTypes.string,
    solution_name: PropTypes.string,
    customers_number_name: PropTypes.string,
    main_feature_name: PropTypes.string,
    benefit_name: PropTypes.string,
    button_prev: PropTypes.string,
    button_next: PropTypes.string,
    arrow_left: PropTypes.string,
    arrow_right: PropTypes.string,
  }),
};

type CaseTypes = InferProps<typeof casePropTypes>;

export { CaseStudiesCategories };
