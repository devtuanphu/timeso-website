/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowLeftOutlined, ArrowRightOutlined, CalendarOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Axios } from '@shared/modules/axios';
import { Col, Empty, Input, Pagination, Radio, Row, Select } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes, { InferProps } from 'prop-types';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import { Button } from '@components/button';

const { Option } = Select;

interface IForm {
  search: string;
  filter: TFilter;
  page: number;
}

type TFilter = 'All' | 'Intern' | 'Junior' | 'Middle' | 'Senior';

const CareerJobSeeking = (props: JobsTypes) => {
  const [onFilter, setOnFilter] = useState<IForm['filter']>('All');
  const [onSearch, setOnSearch] = useState<IForm>({ search: '', filter: onFilter, page: 1 });
  const [dataJob, setDataJob] = useState<any>(props.listJobs.data);
  const [listJobLevel, setListJobLevel] = useState(props.data.job_levels.data);
  const [currentPage, setCurrentPage] = useState(props.listJobs.meta.pagination.page);
  const [totalPage, setTotalPage] = useState(props.listJobs.meta.pagination.total);

  const router = useRouter();
  const { width, height } = useWindowSize();

  const pathLink = router.locale != 'en' ? `/${router.locale}/career/` : `/en/career/`;

  const fetchListJob = async (level: number | string, title: string = '', page: number = 1) => {
    const dataLevel = level != 'All' ? `filters[job_levels]=${level}&` : '';
    const listJobs = await Axios(
      'jobs',
      `${dataLevel}filters[title][$containsi]=${title}&pagination[pageSize]=3&pagination[page]=${page}`,
      router.locale
    );
    setDataJob(listJobs.data);
    setCurrentPage(listJobs.meta.pagination.page);
    setTotalPage(listJobs.meta.pagination.total);
  };
  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      fetchListJob(onSearch.filter, onSearch.search, onSearch.page);
    }, 200);

    return () => clearTimeout(debouncedSearch);
  }, [onSearch]);

  useEffect(() => {
    setDataJob(props.listJobs.data);
    setCurrentPage(props.listJobs.meta.pagination.page);
    setTotalPage(props.listJobs.meta.pagination.total);
  }, [props.listJobs]);

  useEffect(() => {
    setListJobLevel(props.data.job_levels.data);
  }, [props.data.job_levels]);

  const handleFilter = (level: TFilter) => {
    setOnFilter(level);
    setOnSearch({ ...onSearch, filter: level, page: 1 });
  };

  const handleChangePagination = (page: number) => {
    setOnSearch({ ...onSearch, page: page });
  };

  const handleClickCard = (e, href: string) => {
    e.preventDefault();
    router.push(href);
  };

  useEffect(() => {
    handleFilter('All');
  }, [router.locale]);

  return (
    <div className='career-jobSeeking'>
      <div className='container'>
        <Row gutter={24} justify='center'>
          <Col xs={24} lg={16}>
            <h2 className='career-jobSeeking-title'>{props.data.jobSeekingTitle}</h2>
          </Col>
          <Col span={24} className='career-jobSeeking-control'>
            <Row>
              <Col xs={16} md={8} lg={10} xl={12} className='career-jobSeeking-ctlLeft'>
                <Input
                  placeholder={props.dataNoCMS?.placeholder_search}
                  value={onSearch.search}
                  onChange={(e: any) => setOnSearch({ search: e.target.value, filter: onFilter, page: 1 })}
                  prefix={<SearchOutlined style={{ fontSize: '24px', color: '#878787' }} />}
                  className='career-jobSeeking-search'
                />
              </Col>
              {width > 767 ? (
                <Col xs={8} md={16} lg={14} xl={12} className='career-jobSeeking-ctlRight'>
                  <Radio.Group
                    onChange={(e) => handleFilter(e.target.value)}
                    className='career-jobSeeking-groupBtn'
                    value={onFilter}
                  >
                    <Radio.Button value='All' className='career-jobSeeking-radioBtn'>
                      All
                    </Radio.Button>
                    {listJobLevel.length > 0 &&
                      listJobLevel.map((item: any, index: number) => (
                        <Radio.Button key={index} value={item.id} className='career-jobSeeking-radioBtn'>
                          {item.attributes.level}
                        </Radio.Button>
                      ))}
                  </Radio.Group>
                </Col>
              ) : (
                <Col xs={8}>
                  <Select value={onFilter} className='career-jobSeeking-ctlRight' onChange={handleFilter}>
                    <Option value='All'>All</Option>
                    {listJobLevel.length > 0 &&
                      listJobLevel.map((item: any, index: number) => (
                        <Option key={index} value={item.id}>
                          {item.attributes.level}
                        </Option>
                      ))}
                  </Select>
                </Col>
              )}
            </Row>
          </Col>
          <Col span={24}>
            {dataJob.length > 0 ? (
              dataJob.map((item, index) => (
                <div
                  key={index}
                  className='career-jobSeeking-item'
                  onClick={(e) => handleClickCard(e, `${pathLink}${item?.attributes.slug}`)}
                >
                  <div className='career-jobSeeking-item__left'>
                    <p className='career-jobSeeking-item__title'>{item?.attributes.title}</p>
                    <div className='career-jobSeeking-item__info'>
                      <span>
                        <UserOutlined />
                        {item?.attributes.amount}
                      </span>
                      <span>
                        <CalendarOutlined />
                        {dayjs(item?.attributes.expiredDate).format('DD-MM-YYYY')}
                      </span>
                    </div>
                  </div>
                  <div className='career-jobSeeking-item__right'>
                    <Link prefetch={false} href={`${pathLink}${decodeURIComponent(`${item?.attributes?.slug}`)}`}>
                      {item?.attributes.expiredDate < new Date().toISOString() ? (
                        <Button disabled>{props.dataNoCMS?.button_view_disabled}</Button>
                      ) : (
                        <Button>{props.dataNoCMS?.button_view}</Button>
                      )}
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <Empty />
            )}
          </Col>
          <Col span={24}>
            <Col span={24}>
              <Pagination
                defaultCurrent={1}
                current={currentPage}
                total={totalPage}
                defaultPageSize={3}
                onChange={(page: number) => handleChangePagination(page)}
                nextIcon={
                  <a className='am-pagination-arrow'>
                    <p>{props.dataNoCMS?.arrow_right}</p> <ArrowRightOutlined />
                  </a>
                }
                prevIcon={
                  <a className='am-pagination-arrow'>
                    <ArrowLeftOutlined /> <p>{props.dataNoCMS?.arrow_left}</p>
                  </a>
                }
              />
            </Col>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const jobsPropTypes = {
  data: PropTypes.shape({
    jobSeekingTitle: PropTypes.string,
    placeholder_search: PropTypes.string,
    arrow_left: PropTypes.string,
    arrow_right: PropTypes.string,
    button_view: PropTypes.string,
    button_view_disabled: PropTypes.string,
    content: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        amount: PropTypes.number,
        position: PropTypes.array,
        slug: PropTypes.string,
        expired_at: PropTypes.any,
      })
    ).isRequired,
    job_levels: PropTypes.any,
  }).isRequired,
  listJobs: PropTypes.any,
  dataNoCMS: PropTypes.any,
};

type JobsTypes = InferProps<typeof jobsPropTypes>;

export { CareerJobSeeking };
