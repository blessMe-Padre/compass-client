'use client';
import { Breadcrumbs, ProductsList, LoadMoreButton } from '@/app/components';
import { useEffect, useState } from 'react';
import getAllCategories from '../../utils/getAllCategories';
import getAllProducts from '@/app/utils/getAllProducts';
import { motion } from "framer-motion";

import styles from './style.module.scss';
import Link from 'next/link';

export default function ContentPage({ data }) {
  const [categories, setCategories] = useState([]);
  const [currentSlug, setCurrentSlug] = useState(null);

  const [categoryName, setCategoryName] = useState('Каталог');
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState([]);

  const [activeCategoryId, setActiveCategoryId] = useState([]);


  // Для пагинации
  const PAGE_SIZE = 6;
  const [pageCount, setPageCount] = useState(1);

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


  useEffect(() => {

  }, [pageCount])

  const handleCategoryClick = (e, categorySlug, categoryId, categoryName ) => {
    e.stopPropagation();

    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));

    setCurrentSlug(categorySlug);
    // Сброс пагинации при выборе новой категории
    setPageCount(1);
    setCategoryName(categoryName)

    setActiveCategoryId(categoryId);
    }


  const isCategoryActive = (categoryId) => {
    return activeCategoryId === categoryId; 
  }

 useEffect(() => {
  const fetchProducts = async () => {
    if (!currentSlug) return; 
    
    setLoading(true);
    try {
      const products = await getAllProducts(
        `http://90.156.134.142:1337/api/products?` + 
        `filters[categories][slug][$eq]=${currentSlug}&` +
        `pagination[page]=${pageCount}&` +
        `pagination[pageSize]=${PAGE_SIZE}&` + 
        `populate=*`
      );
      setProducts(products);
    } catch (error) {
      console.error('Ошибка при загрузке товаров:', error);
    } finally {
      setLoading(false);
    }
  };

    fetchProducts();
  }, [currentSlug, pageCount]);
  
  const handleLoadMore = () => {
    setPageCount(prev => prev + 1);
  }
 

  return (
      <>  
        <div className='container'>
          <Breadcrumbs
              secondLabel="Каталог"
          />

          
        <motion.h2
          initial='hidden'
          animate="visible"
          className='page_title'
        >
            {categoryName}
        </motion.h2>

          <motion.div 
            initial='hidden'
            animate="visible"
            className={styles.catalog_wrapper}
        >
            <div>
              <Link href={'/catalog'}>
                <div className={styles.catalog_btn}>
                  Каталог
                </div>
              </Link>
              <div className={styles.list_cat}>
              {categories?.map((parentCategory) => (
                <div 
                key={parentCategory.id} 
                className={`${styles.parent_cat} ${isCategoryActive(parentCategory.id) ? styles.active : ''}`}
              >
                  <h3 
                    onClick={(e) => handleCategoryClick(e, parentCategory.slug, parentCategory.id, parentCategory.name)}
                  >
                    {parentCategory.name}
                    {parentCategory.children?.length > 0 && (
                      <motion.span
                        className={styles.arrow}
                        animate={{ rotate: expandedCategories[parentCategory.id] ? 180 : 0 }}
                      >
                        <svg width="14" height="10" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13 5L6.76 1L1 5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </motion.span>
                    )}
                  </h3>
              
                  {parentCategory.children?.length > 0 && (
                    <motion.div
                      className={styles.child_container}
                      initial={{ height: 0 }}
                      animate={{ 
                        height: expandedCategories[parentCategory.id] ? "auto" : 0 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={styles.child_cat}>
                        {parentCategory.children.map((childCategory) => (
                          <div 
                            key={childCategory.id}
                            className={`${styles.child_item} ${isCategoryActive(childCategory.id) ? styles.active : ''}`}
                          >
                            <h4 
                              onClick={(e) => handleCategoryClick(e, childCategory.slug, childCategory.id, childCategory.name)}
                            >
                              {childCategory.name}
                              {childCategory.children?.length > 0 && (
                                <motion.span
                                  className={styles.arrow}
                                  animate={{ rotate: expandedCategories[childCategory.id] ? 180 : 0 }}
                                >
                                  <svg width="14" height="10" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 5L6.76 1L1 5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                                  </svg>

                                </motion.span>
                              )}
                            </h4>
                            
                            {childCategory.children?.length > 0 && (
                              <motion.div
                                className={styles.grandchild_container}
                                initial={{ height: 0 }}
                                animate={{ 
                                  height: expandedCategories[childCategory.id] ? "auto" : 0 
                                }}
                              >
                                <div className={styles.grandchild_cat}>
                                  {childCategory.children.map((grandchildCategory) => (
                                    <p
                                      key={grandchildCategory.id}
                                      className={`${styles.grandchild_item} ${isCategoryActive(grandchildCategory.id) ? styles.active : ''}`}
                                      onClick={(e) => handleCategoryClick(e, grandchildCategory.slug, grandchildCategory.id, grandchildCategory.name)}
                                    >
                                      {grandchildCategory.name}
                                    </p>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
              </div>
             </div>
              
            <div>
              <div className={styles.catalog_options}>
                <div>
                  Фильтры
                </div>
                <div>
                  Сортировка: рекомендуем
                </div>
                <div>
                  В наличии
                </div>
              </div>
              
              <ProductsList products={products} isLoading={isLoading} />

              {!isLoading && products.length > 0 && (
                  <motion.div>
                    <LoadMoreButton 
                      text={'Показать еще'} 
                      loading={isLoading} 
                      onLoadMore={handleLoadMore}
                    />
                  </motion.div>
                )
              }
            </div>

          </motion.div>
        </div>
      </>
  );
}