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

    const [activeCategory, setActiveCategory] = useState([]);

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

  console.log(categories)
  
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

  const handleCategoryClick = async (categorySlug) => {
    try {
      setLoading(true);
      const products = await getAllProducts(`http://90.156.134.142:1337/api/products?filters[categories][slug][$eq]=${categorySlug}&populate=*`);
      setProducts(products)
    } catch (error) {
      console.error('Произошла ошибка в получении товаров после нажатия на выбор категории')
    }
  }


  console.log('products', products)


    return (
        <>  
          <div className='container'>
            <Breadcrumbs
                secondLabel="Каталог"
            />

            <h2 className='page_title'>
                Каталог
            </h2>

            <div className={styles.catalog_wrapper}>
              <div className={styles.list_cat}>
                {categories?.map((parentCategory) => (
                  <div key={parentCategory.id} className={styles.parent_category}>
                    {/* Родительская категория (уровень 1) */}
                    <h3 onClick={() => handleCategoryClick(parentCategory.slug)}>
                      {/* <Link href={`/catalog/category/${parentCategory.slug ?? 'catalog'}`}>{parentCategory.name}</Link> */}
                      {parentCategory.name}
                    </h3>
                    
                    {/* Проверяем есть ли дочерние категории */}
                    {parentCategory.children && parentCategory.children.length > 0 && (
                      <div className={styles.child_cat}>
                        {/* Дочерние категории (уровень 2) */}
                        {parentCategory.children.map((childCategory) => (
                          <div key={childCategory.id} className={styles.child_cat}>
                            <h4>
                              {/* <Link href={`/catalog/category/${childCategory.slug ?? 'catalog'}`}>{childCategory.name}</Link> */}
                              <p onClick={() => handleCategoryClick(childCategory.slug ?? 'undefied')}>{childCategory.name}</p>
                            </h4>
                            
                            {/* Проверяем есть ли подкатегории (уровень 3) */}
                            {childCategory.children && childCategory.children.length > 0 && (
                              <div className={styles.grandchild_cat}>
                                {childCategory.children.map((grandchildCategory) => (
                                  <div key={grandchildCategory.id} className={styles.grandсhild_cat}>
                                    <p>
                                      {/* <Link href={`/catalog/category/${grandchildCategory.slug ?? 'catalog'}`}>{grandchildCategory.name}</Link> */}
                                      <p onClick={() => handleCategoryClick(grandchildCategory.slug ?? 'undefied')}>{grandchildCategory.name}</p>
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
          
                <div className={styles.products_list}>
                  {products 
                  
                  ? products?.map((el, idx) => (
                    <div key={idx}>
                      <CardItem element={el} />
                    </div>
                  ))
                
                  : 'Нет ничего'
                }
                    
                </div>  
            </div>
          </div>
        </>
    );
}