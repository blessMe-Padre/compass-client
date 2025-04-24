'use client';
import { Breadcrumbs, CardItem } from '@/app/components';
import { useEffect, useState } from 'react';
import getAllCategories from '../../utils/getAllCategories';
import getAllProducts from '@/app/utils/getAllProducts';

import styles from './style.module.scss';
import Link from 'next/link';

export default function ContentPage({ data }) {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
   useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

    return (
        <>  
          <div className='container'>
            <Breadcrumbs
                secondLabel="Каталог"
            />

            <h2 className='page_title'>
                Каталог (тут должна быть текущая категория)
            </h2>

            <div className={styles.catalog_wrapper}>
                <div className={styles.categories_list}>
                  {categories?.map((el, idx) => (
                    <ul key={idx} className={styles.categories_item}>
                      <Link href={`/catalog2/category/${el.slug != undefined ? el.slug : '1'}`}>{el.name}</Link>
                    </ul>
                  ))}
                </div>
          
                <div className={styles.products_list}>
                    {products?.map((el, idx) => (
                      <div key={idx}>
                        <CardItem element={el} />
                      </div>
                    ))}
                </div>  
            </div>
          </div>
        </>
    );
}