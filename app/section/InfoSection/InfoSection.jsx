'use client'

import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { LinkButton } from '@/app/components';
import Image from 'next/image';
import infoSection from '../../../public/info.png';
import infoSection2 from '../../../public/info2.png';
import infoSection3 from '../../../public/info3.png';

function InfoSection() {
  const [imageSrc, setImageSrc] = useState(infoSection);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia('(max-width: 768px)').matches) {
        setImageSrc(infoSection3);
      } else if (window.matchMedia('(max-width: 1024px)').matches) {
        setImageSrc(infoSection2);
      } else {
        setImageSrc(infoSection);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section>
      <div className='container'>
        <div>
          <Image 
            className={styles.info_section_img} 
            src={imageSrc} 
            width={1440} 
            height={700} 
            alt='info.png' 
          />
        </div>
        <div className={styles.info_section_content}>
          <h2 className={styles.info_title}>
            Одежда для охоты, <br /> рыбалки от бренда КОМПАС
          </h2>

          <div className={styles.info_content_text}>
            <p>
              Магазин «КОМПАС» начала свою деятельность в 2015 году. Являясь одним из ведущих производителей современной функциональной одежды бренд завоевал доверие и признание у российских охотников, рыболовов и любителей активного отдыха. Надежность и качество экипировки подтверждены многочисленными сертификатами, победами на международных выставках и отзывами представителей экспертного сообщества
            </p>

            <p>
              Сотрудники компании имеют непосредственное отношение к охоте и рыбалке, регулярно тестируют одежду непосредственно на себе в полевых условиях. Вы можете быть уверены в качестве, мы выпускаем экипировку для людей, близких нам по духу!
            </p>
          </div>

          <LinkButton 
            href={'/'} 
            text={'Подробнее'}
          />
        </div>
      </div>
    </section>
  );
}

export default InfoSection;