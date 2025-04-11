import Image from 'next/image';
import React, { useState } from 'react';
import { Rate } from 'antd';

import styles from './index.module.scss';

const Feedback = ({ avatar, name, title, rate, feedback }) => {
  const [isShowDetail, setIsShowDetail] = useState(false);

  let timeoutEvent: NodeJS.Timeout;

  const handleClick = () => {
    setIsShowDetail(true);
  };

  const handleMouseLeave = () => {
    timeoutEvent = setTimeout(() => setIsShowDetail(false), 0);
  };

  const handleMouseEnter = () => {
    clearInterval(timeoutEvent);
  };

  return (
    <div
      className={`${styles.feedback} ${isShowDetail ? styles.active : ''}`}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      <div className={styles.image}>
        {avatar && <Image src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${avatar.attributes.url}`} alt={title} quality={100} fill />}
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <p className={styles.title}>{title}</p>
        <Rate value={rate} disabled={true} allowHalf character='★' />
      </div>
      <div className={styles.detail}>{feedback}</div>
    </div>
  );
};

export default Feedback;
