'use client';
import { Breadcrumbs, ContentRenderer, ProductsList } from '@/app/components';
import Image from 'next/image';
import styles from './style.module.scss';

export default function ContentPage({ data }) {
    return (
        <>  
            <div className='container'>
                <Breadcrumbs
                    secondLabel="Список желаемого"
                />
                
                <h2 className='page_title'>Список желаемого</h2>

                {/* TODO: тут будет запрос по пользователю к его списку желаемого */}
                <ProductsList products={data} />
                
            </div>
        </>
    );
}