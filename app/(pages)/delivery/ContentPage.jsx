'use client';
import { Breadcrumbs, ContentRenderer } from '@/app/components';
import Image from 'next/image';
import styles from './style.module.scss';

const domain = `${process.env.NEXT_PUBLIC_DOMAIN}`;


export default function ContentPage({ data }) {
    return (
        <>
            <div className='container'>
                <Breadcrumbs
                    secondLabel="Условия доставки"
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