import Image from 'next/image';
import React, { useState } from 'react';
import { Rate } from 'antd';

import styles from './scss/index.module.scss';

const FeedbackQQ = ({ avatar, name, title, rate, feedback, maxLength, readMore }) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  let timeoutEvent: NodeJS.Timeout;

  const handleMouseLeave = () => {
    timeoutEvent = setTimeout(() => setShowFullText(false), 0);
  };

  const handleMouseEnter = () => {
    clearInterval(timeoutEvent);
  };

  return (
    <div className={`${styles.feedbackWrap}`} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
      <div className={`${styles.feedback}`}>
        <div className={styles.image}>
          {avatar && (
            <Image src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${avatar.attributes.url}`} alt={title} quality={100} fill />
          )}
        </div>
        <div className={styles.info}>
          <p className={styles.name}>{name}</p>
          <p className={styles.title}>{title}</p>
          <Rate value={rate} disabled={true} allowHalf character='★' />
        </div>
        <Image width={35} height={35} src='/assets/quick-quotes/icon-feedback-2.png' alt='icon' />
        <div className={`${styles.detail} ${showFullText ? styles.active : ''}`}>
          {showFullText ? (
            <>
              {feedback}
            </>
          ) : (
            <>
              {feedback.slice(0, maxLength)}
              {feedback.length > maxLength && '... '}
              <a onClick={toggleText}>{readMore}</a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackQQ;
