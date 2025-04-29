'use client';
import { Breadcrumbs, ProductsList, LoadMoreButton, Popup } from '@/app/components';
import { useEffect, useState } from 'react';
import getAllCategories from '../../utils/getAllCategories';
import getAllProducts from '@/app/utils/getAllProducts';
import { motion } from "framer-motion";

import useCategorySlug from '@/app/store/categorySlug';

import styles from './style.module.scss';
import Link from 'next/link';
import useFilterStore from '@/app/store/filterStore';

export default function ContentPage({ data }) {
  const [categories, setCategories] = useState([]);
  // const [currentSlug, setCurrentSlug] = useState(null);

  const { currentSlug, setCurrentSlug } = useCategorySlug();

  const [categoryName, setCategoryName] = useState('Каталог');
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState([]);

  const [activeCategoryId, setActiveCategoryId] = useState([]);
  const [loadMoreHidden, setLoadMoreHidden] = useState(false);

  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const [sortedFilters, setSortedFilters] = useState('');

  const { filters } = useFilterStore();


  const [activePopup, setActivePopup] = useState(false); 


  // Для пагинации
  const PAGE_SIZE = 12;
  const [pageCount, setPageCount] = useState(1);


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

  const handleLoadMore = () => {
    setPageCount(prev => prev + 1);
  }
 
  const handleCheckboxStatus = () => {
    checkboxStatus === true ? setCheckboxStatus(false) : setCheckboxStatus(true)
  }  

  const handleSelectSort = (e) => {
    const value = e.target.value;
    setSortedFilters(value);
  };


  const buildStrapiFilters = (filters) => {
    const params = [];

    if (filters.price) {
      if (filters.price.from) {
        params.push(`filters[price][$gte]=${filters.price.from}`);
      }
      if (filters.price.to) {
        params.push(`filters[price][$lte]=${filters.price.to}`);
      }
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (key !== 'price' && value) {
        params.push(
          `filters[attributes][name][$eq]=${encodeURIComponent(key)}` +
          `&filters[attributes][value][$eq]=${encodeURIComponent(value)}&`
        )
      }
    });

    return params.join('&');

  }

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
    const fetchProducts = async () => {
      if (!currentSlug) return; 
      
      setLoading(true);
      try {
        const stockFilter = checkboxStatus ? 'filters[statusProduct][$eq]=stock&' : '';
        // http://90.156.134.142:1337/api/products?pagination[page]=1&pagination[pageSize]=12&filters[statusProduct][$eq]=stock&populate=*
        const slugFilter = currentSlug !== 'Каталог' ? `filters[categories][slug][$eq]=${currentSlug}&` : ''
        const sortFilter = sortedFilters ? `sort=${sortedFilters}&` : '';
        const optionsFilter = buildStrapiFilters(filters);

        const apiUrl = [
          'http://90.156.134.142:1337/api/products?',
          slugFilter,
          `pagination[page]=${pageCount}&`,
          `pagination[pageSize]=${PAGE_SIZE}&`,
          stockFilter,
          sortFilter,
          optionsFilter,
          'populate=*'
        ].join('').replace(/&+/g, '&').replace(/\?&/, '?');

        const products = await getAllProducts(apiUrl);

        if (pageCount === 1) {
          setProducts(products);
          setLoadMoreHidden(products.length < PAGE_SIZE);
        } else {
          if (products.length === 0) {
            setLoadMoreHidden(true);
          } else {
            setProducts(prev => [...prev, ...products]);
            setLoadMoreHidden(products.length < PAGE_SIZE);
          }
        }
      } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentSlug, pageCount, checkboxStatus, sortedFilters, filters]);
  
  


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
                <div className='flex gap-5' onClick={() => setActivePopup(true)}>
                  <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.625 3.71984H10.8013C11.082 4.85398 12.1079 5.69746 13.3276 5.69746C14.5472 5.69746 15.5732 4.85398 15.8539 3.71984H19.375C19.7202 3.71984 20 3.44 20 3.09484C20 2.74969 19.7202 2.46984 19.375 2.46984H15.8538C15.5732 1.3357 14.5472 0.492188 13.3275 0.492188C12.1079 0.492188 11.0819 1.3357 10.8012 2.46984H0.625C0.279844 2.46984 0 2.74969 0 3.09484C0 3.44 0.279844 3.71984 0.625 3.71984ZM13.3276 1.74219C14.0734 1.74219 14.6802 2.34898 14.6802 3.0948C14.6802 3.84066 14.0734 4.44746 13.3276 4.44746C12.5817 4.44746 11.9749 3.84066 11.9749 3.0948C11.9749 2.34898 12.5817 1.74219 13.3276 1.74219ZM0.625 9.12562H4.14617C4.42688 10.2598 5.45277 11.1032 6.67246 11.1032C7.89215 11.1032 8.91805 10.2598 9.19875 9.12562H19.375C19.7202 9.12562 20 8.84578 20 8.50062C20 8.15547 19.7202 7.87562 19.375 7.87562H9.19871C8.91801 6.74148 7.89211 5.89797 6.67242 5.89797C5.45273 5.89797 4.42684 6.74148 4.14613 7.87562H0.625C0.279844 7.87562 0 8.15547 0 8.50062C0 8.84578 0.279805 9.12562 0.625 9.12562ZM6.67242 7.14797C7.41828 7.14797 8.02508 7.75477 8.02508 8.50062C8.02508 9.24644 7.41828 9.85324 6.67242 9.85324C5.92656 9.85324 5.31977 9.24644 5.31977 8.50062C5.31977 7.75477 5.92656 7.14797 6.67242 7.14797ZM19.375 13.2814H15.8538C15.5731 12.1473 14.5472 11.3038 13.3275 11.3038C12.1079 11.3038 11.082 12.1473 10.8012 13.2814H0.625C0.279844 13.2814 0 13.5612 0 13.9064C0 14.2516 0.279844 14.5314 0.625 14.5314H10.8013C11.082 15.6655 12.1079 16.5091 13.3276 16.5091C14.5473 16.5091 15.5732 15.6655 15.8539 14.5314H19.375C19.7202 14.5314 20 14.2516 20 13.9064C20 13.5612 19.7202 13.2814 19.375 13.2814ZM13.3276 15.2591C12.5817 15.2591 11.9749 14.6523 11.9749 13.9064C11.9749 13.1605 12.5817 12.5538 13.3276 12.5538C14.0734 12.5538 14.6802 13.1605 14.6802 13.9064C14.6802 14.6523 14.0734 15.2591 13.3276 15.2591Z" fill="#1B1B1B"/>
                  </svg>

                    Фильтры
                </div>
              

              {/* 
              
                  TODO: 
                    const [filterParams, setFilterParams] = useState([]);
                    Тут будет запрос сразу идти на endpoint с get параметров
                    &order=opinion
                    &order=price-asc (недорогие)
                    &order=price-desс (самые дорогие)   

                    http://90.156.134.142:1337/api/products?filters[categories][slug][$eq]=letniy_i_zimniy_assortiment&sort=price:asc
                    http://90.156.134.142:1337/api/products?filters[categories][slug][$eq]=letniy_i_zimniy_assortiment&sort=price:desc

                */}
                <div className={styles.sort}>
                  Сортировка:
                  <select value={sortedFilters} onChange={handleSelectSort}>
                    <option value="opinion">рекомендуем</option>
                    <option value="price:desc">Сначала дорогие</option>
                    <option value="price:asc">Сначала дешевые</option>
                  </select> 
                </div>

              {/* 
              TODO: 
                  Тут будет запрос сразу идти на endpoint с get параметров 
                  &stock=now (в наличии)

                  http://90.156.134.142:1337/api/products?filters[categories][slug][$eq]=letniy_i_zimniy_assortiment&filters[statusProduct][$eq]=stock&populate=*
                  
              */}

              <div className={styles.stock} onClick={() => handleCheckboxStatus()}>
                  <input type="checkbox" name="checkboxStatus" id="checkboxStatus" />
                  <label htmlFor="checkboxStatus">В наличии</label>
                </div>
              </div>
              
            <ProductsList products={products} isLoading={isLoading} />
            
              {!isLoading && products.length > 0 && !loadMoreHidden && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <LoadMoreButton 
                    text={'Показать еще'} 
                    loading={isLoading} 
                    onLoadMore={handleLoadMore}
                  />
                </motion.div>
              )}
            </div>

          </motion.div>
        </div>
      

      <Popup activePopup={activePopup} setActivePopup={setActivePopup} data={products} />
      </>
  );
}