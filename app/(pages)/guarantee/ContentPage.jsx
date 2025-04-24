'use client';
import { Breadcrumbs, ContentRenderer } from '@/app/components';
import Image from 'next/image';
import styles from './style.module.scss';

const domain = 'http://90.156.134.142:1337';


export default function ContentPage({ data }) {
    return (
        <>  
            <div className='container'>
                <Breadcrumbs
                    secondLabel="Гарантия на товар"
                />
                
                <h2 className='page_title'>{data?.title}</h2>

                {data?.img?.url && (
                    <Image className={styles.image} src={`${domain}${data?.img?.url}`} alt={'img'} width={1400} height={400} />
                )}

                <div className={styles.designer_fckg_wrapper}>
                    <ContentRenderer content={data?.desc} />
                </div>

            </div>
        </>
    );
}