'use client';
import { Breadcrumbs, CardItem } from '@/app/components';
import { useEffect, useState } from 'react';
import getAllCategories from '../../utils/getAllCategories';
import getAllProducts from '@/app/utils/getAllProducts';
import { motion, AnimatePresence } from "framer-motion";

import styles from './style.module.scss';

export default function ContentPage({ data }) {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState([]);

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

  const handleCategoryClick = async (categorySlug, categoryName, categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: ![categoryId]
    }))

    console.log(expandedCategories);
    
    fetchProducts(categorySlug);
  }


  const fetchProducts = async ( slug ) => {
    setLoading(true);
    try {
      const products = await getAllProducts(`http://90.156.134.142:1337/api/products?filters[categories][slug][$eq]=${slug}&populate=*`);
      setProducts(products)
      setCategoryName(categoryName)
    } catch (error) {
        console.error('Произошла ошибка в получении товаров после нажатия на выбор категории')
    }
  }


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const dropdownVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const arrowVariants = {
    open: { rotate: 90 },
    closed: { rotate: 0 }
  };

  return (
      <>  
        <div className='container'>
          <Breadcrumbs
              secondLabel="Каталог"
          />

          
          <h2 className='page_title'>
              {categoryName ? categoryName : 'Каталог'}
          </h2>

          <motion.div 
            initial='hidden'
            animate="visible"
            variants={containerVariants}
            className={styles.catalog_wrapper}
          >
            <div className={styles.list_cat}>
              {categories?.map((parentCategory) => (
                <div key={parentCategory.id} className={styles.parent_cat}>
                  {/* Родительская категория (уровень 1) */}
                  <h3 
                    onClick={() => handleCategoryClick(parentCategory.slug, parentCategory.id, parentCategory.name)}
                    className={expandedCategories[parentCategory.id] ? styles.active : ''}  
                  >
                    {parentCategory.name}

                    {parentCategory.children?.length > 0 && (
                        <span className={styles.arrow}>
                          {expandedCategories[parentCategory.id] ? '▼' : '▶'}
                        </span>
                    )}
                  </h3>
                  
                  {/* Проверяем есть ли дочерние категории */}
                  {parentCategory.children && parentCategory.children.length > 0 && (
                    <div className={styles.child_cat}>
                      {/* Дочерние категории (уровень 2) */}
                      {parentCategory.children.map((childCategory) => (
                        <div key={childCategory.id} className={styles.child_cat}>
                          <h4>
                            <p onClick={() => handleCategoryClick(childCategory.slug ?? 'undefied', childCategory.id, childCategory.name)}>
                              {childCategory.name}
                              {childCategory.children?.length > 0 && (
                              <span className={styles.arrow}>
                                {expandedCategories[childCategory.id] ? '▼' : '▶'}
                              </span>
                            )}

                            </p>
                          </h4>
                          
                          {/* Проверяем есть ли подкатегории (уровень 3) */}
                          {childCategory.children && childCategory.children.length > 0 && (
                            <div className={`${styles.grandchild_cat} ${expandedCategories[childCategory.id] ? styles.visible : ''}`}>
                              {childCategory.children.map((grandchildCategory) => (
                                <div key={grandchildCategory.id} className={styles.grandсhild_cat}>
                                  <p>
                                    {/* <Link href={`/catalog/category/${grandchildCategory.slug ?? 'catalog'}`}>{grandchildCategory.name}</Link> */}
                                    <p onClick={() => handleCategoryClick(grandchildCategory.slug ?? 'undefied', grandchildCategory.id, grandchildCategory.name)}>{grandchildCategory.name}</p>
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
        
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.products_list}
            >
                  {products?.length > 0 ? (
                    products.map((product) => (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        key={product.id}> {/* Используем id вместо индекса */}
                        <CardItem element={product} />
                      </motion.div>
                    ))
                  ) : (
                    <div className={styles.empty_state}>
                      {isLoading ? (
                        <div className={styles.loading_placeholder}>
                          {/* Можете добавить скелетон или спиннер */}
                          Загрузка товаров...
                        </div>
                      ) : (
                        'Товары не найдены'
                      )}
                    </div>
                  )}                    
            </motion.div>  
          </motion.div>
        </div>
      </>
  );
}