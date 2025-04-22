'use client'

import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { LinkButton } from '@/app/components';


function InfoSection() {

  return (
    <section className={styles.info_section}>
      <div className='container'>
        <div className={styles.info_section_content}>
          <h2 className={styles.info_title}>
            Одежда для охоты, <br /> рыбалки от бренда КОМПАС
          </h2>

          <div className={styles.info_content_text}>
            <p>
              Магазин «КОМПАС» начала свою деятельность в 2015 году. Являясь одним из ведущих производителей современной функциональной одежды бренд завоевал доверие и признание у российских охотников, рыболовов и любителей активного отдыха. Надежность и качество экипировки подтверждены многочисленными сертификатами, победами на международных выставках и отзывами представителей экспертного сообщества
            </p>

            <p>
              Сотрудники компании имеют непосредственное отношение к охоте и рыбалке, регулярно тестируют одежду непосредственно на себе в полевых условиях. Вы можете быть уверены в качестве, мы выпускаем экипировку для людей, близких нам по духу!
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