'use client'

import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { ContentRenderer, LinkButton } from '@/app/components';
import fetchData from '@/app/utils/fetchData';


function InfoSection() {
  const [data, setData] = useState([]);
  console.log(data);
  // 
  const url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/sekcziya-informacziya?populate=*`
  // const url = `http://90.156.134.142:1337/api/sekcziya-informacziya?populate=*`

  useEffect(() => {
    const fetchInfoSection = async () => {
      const response = await fetchData(url);
      setData(response?.data);
    };
    fetchInfoSection();
  }, []);

  return (
    <section className={styles.info_section}>
      <div className={`container ${styles.image_wrapper}`}>
        <div className={styles.info_section_content}>

          <div className={styles.info_content_text}>
            <ContentRenderer content={data?.content || []} />
          </div>

          <LinkButton
            href={'/about'}
            text={'Подробнее'}
          />
        </div>
      </div>
    </section>
  );
}

export default InfoSection;