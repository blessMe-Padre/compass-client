'use client';
import { Breadcrumbs, ProductsList, LoadMoreButton, Popup, Notification } from '@/app/components';
import { useEffect, useState, useRef } from 'react';
import getAllCategories from '../../utils/getAllCategories';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import getAllProducts from '@/app/utils/getAllProducts';
import { motion } from "framer-motion";

import useCategorySlug from '@/app/store/categorySlug';

import styles from './style.module.scss';
import Link from 'next/link';
import useFilterStore from '@/app/store/filterStore';
import useCartStore from '@/app/store/cartStore';
import { getAllCategoriesGraphQL } from '../../utils/graphql/getAllCategoriesGraphQL';
import { Preloader } from '@/app/components'

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function CatalogContent() {

  // Для получения slug из GET параметра
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState([]);
  const { currentSlug, setCurrentSlug } = useCategorySlug();
  const prevSlug = usePrevious(currentSlug);

  const [categoryName, setCategoryName] = useState('Каталог');
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState([]);

  const [activeCategoryId, setActiveCategoryId] = useState([]);
  const [loadMoreHidden, setLoadMoreHidden] = useState(false);

  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const [sortedFilters, setSortedFilters] = useState('');
  const [sendingForm, setSendingForm] = useState(false)

  const [notificationActive, setNotificationActive] = useState(false);

  const { filters } = useFilterStore();
  const { cartItems } = useCartStore();

  const [activePopup, setActivePopup] = useState(false);

  // Для пагинации
  const PAGE_SIZE = 15;
  const [pageCount, setPageCount] = useState(1);

  const handleSubmitForm = () => {
    setSendingForm(!sendingForm);
  }

  const handleCategoryClick = (e, categorySlug, categoryId, categoryName) => {
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

    if (filters.priceSales) {
      if (filters.priceSales.from) {
        params.push(`filters[priceSales][$gte]=${encodeURIComponent(filters.priceSales.from)}`);
      }
      if (filters.priceSales.to) {
        params.push(`filters[priceSales][$lte]=${encodeURIComponent(filters.priceSales.to)}`);
      }
    } else if (filters.price) {
      if (filters.price.from) {
        params.push(`filters[price][$gte]=${encodeURIComponent(filters.price.from)}`);
      }
      if (filters.price.to) {
        params.push(`filters[price][$lte]=${encodeURIComponent(filters.price.to)}`);
      }
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (key !== 'price' && key !== 'priceSales' && value) {
        params.push(
          `filters[attributes][name][$eq]=${encodeURIComponent(key)}` +
          `&filters[attributes][value][$eq]=${encodeURIComponent(value)}`
        );
      }
    });

    return params.length > 0 ? params.join('&') + '&' : '';
  }

  const handleClickDefault = async () => {
    setLoading(true);
    try {
      const apiUrl = [
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/products?`,
        `pagination[page]=${pageCount}&`,
        `pagination[pageSize]=${PAGE_SIZE}&`,
        'populate=*'
      ].join('').replace(/&+/g, '&').replace(/\?&/, '?');

      const newProducts = await getAllProducts(apiUrl);

      setProducts(prev => pageCount === 1 ? newProducts : [...prev, ...newProducts]);
      setLoadMoreHidden(newProducts.length < PAGE_SIZE);
      setCategoryName('Каталог');

    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const slug = searchParams.get('slug') || '';
    console.log('22', slug)
    setCurrentSlug(slug);
  }, [searchParams, setCurrentSlug]);

  useEffect(() => {
    setPageCount(1);
  }, [currentSlug, checkboxStatus, sortedFilters, filters]);

  useEffect(() => {
    setNotificationActive(true)
  }, [cartItems])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const data = await getAllCategories();
        const data = await getAllCategoriesGraphQL();
        console.log(data)
        setCategories(data);
        setLoading(false);

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
      // setLoading(true);
      try {
        const slugChanged = prevSlug !== undefined && prevSlug !== currentSlug;

        // Если изменился фильтр (а не категория), и на странице уже загружено больше товаров,
        // чем стандартный размер страницы, то запрашиваем столько же товаров, сколько уже было.
        const pageSize = (pageCount === 1 && !slugChanged && products.length > PAGE_SIZE)
          ? products.length
          : PAGE_SIZE;

        const optionsFilter = buildStrapiFilters(filters);

        // Если нет выбранной сортировки, применяем сортировку по умолчанию
        const sortParam = sortedFilters ? sortedFilters : 'title:asc';

        const queryParams = [
          'populate=*',
          `pagination[page]=${pageCount}`,
          `pagination[pageSize]=${pageSize}`,
          `sort=${sortParam}`
        ];

        if (currentSlug && currentSlug !== 'Каталог') {
          queryParams.push(`filters[categories][slug][$eq]=${currentSlug}`);
        }
        if (checkboxStatus) {
          queryParams.push('filters[statusProduct][$eq]=stock');
        }
        if (sortedFilters) {
          queryParams.push(`sort=${sortedFilters}`);
        }

        if (optionsFilter) {
          queryParams.push(optionsFilter.slice(0, -1));
        }

        const apiUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/api/products?${queryParams.join('&')}`;
        const newProducts = await getAllProducts(apiUrl);

        if (pageCount === 1) {
         
          setProducts(newProducts);
          setLoadMoreHidden(newProducts.length < pageSize);
        } else {
          if (products.length === 0) {
            setLoadMoreHidden(true);
          } else {
            setProducts(prev => [...prev, ...newProducts]);
            setLoadMoreHidden(newProducts.length < PAGE_SIZE); 
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
          thirdLabel={categoryName !== 'Каталог' ? categoryName : ''}
        />


        <h2 className='page_title'>
          {categoryName}
        </h2>

        <div className={styles.catalog_wrapper}>
          <div className={styles.dop_wrapper}>
            <Link href={'/catalog'}>
              <div className={styles.catalog_btn} onClick={() => handleClickDefault()}>
                Каталог
              </div>
            </Link>
            <div className={styles.list_cat}>
              {isLoading === false ? categories?.map((parentCategory) => (
                <div key={parentCategory.id1c}
                  className={`${styles.parent_cat} ${isCategoryActive(parentCategory.id1c) ? styles.active : ''}`}
                >
                  <h3
                    onClick={(e) => handleCategoryClick(e, parentCategory.slug, parentCategory.id1c, parentCategory.name)}
                  >
                    {parentCategory.name}
                    {parentCategory.children?.length > 0 && (
                      <span
                        className={`${styles.arrow} ${expandedCategories[parentCategory.id1c] ? styles.rotated : ''}`}
                      >
                        <svg width="14" height="10" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13 5L6.76 1L1 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </span>
                    )}
                  </h3>

                  {parentCategory.children?.length > 0 && (
                    <div
                      className={`${styles.child_container} ${expandedCategories[parentCategory.id1c] ? styles.expanded : ''}`}
                    >
                      <div className={styles.child_cat}>
                        {[...parentCategory.children]
                          .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
                          .map((childCategory) => (
                            <RecursiveCategoryItem
                              key={childCategory.id1c}
                              category={childCategory}
                              level={1}
                              expandedCategories={expandedCategories}
                              handleCategoryClick={handleCategoryClick}
                              isCategoryActive={isCategoryActive}
                              styles={styles}
                            />
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
                : (
                   <Preloader width={40} height={40} />  
                )
            }
            </div>
          </div>

          <div className={styles.dop_wrapper}>
            <div className={styles.catalog_options}>
              <div className={styles.filter_btn} onClick={() => setActivePopup(true)}>
                <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.625 3.71984H10.8013C11.082 4.85398 12.1079 5.69746 13.3276 5.69746C14.5472 5.69746 15.5732 4.85398 15.8539 3.71984H19.375C19.7202 3.71984 20 3.44 20 3.09484C20 2.74969 19.7202 2.46984 19.375 2.46984H15.8538C15.5732 1.3357 14.5472 0.492188 13.3275 0.492188C12.1079 0.492188 11.0819 1.3357 10.8012 2.46984H0.625C0.279844 2.46984 0 2.74969 0 3.09484C0 3.44 0.279844 3.71984 0.625 3.71984ZM13.3276 1.74219C14.0734 1.74219 14.6802 2.34898 14.6802 3.0948C14.6802 3.84066 14.0734 4.44746 13.3276 4.44746C12.5817 4.44746 11.9749 3.84066 11.9749 3.0948C11.9749 2.34898 12.5817 1.74219 13.3276 1.74219ZM0.625 9.12562H4.14617C4.42688 10.2598 5.45277 11.1032 6.67246 11.1032C7.89215 11.1032 8.91805 10.2598 9.19875 9.12562H19.375C19.7202 9.12562 20 8.84578 20 8.50062C20 8.15547 19.7202 7.87562 19.375 7.87562H9.19871C8.91801 6.74148 7.89211 5.89797 6.67242 5.89797C5.45273 5.89797 4.42684 6.74148 4.14613 7.87562H0.625C0.279844 7.87562 0 8.15547 0 8.50062C0 8.84578 0.279805 9.12562 0.625 9.12562ZM6.67242 7.14797C7.41828 7.14797 8.02508 7.75477 8.02508 8.50062C8.02508 9.24644 7.41828 9.85324 6.67242 9.85324C5.92656 9.85324 5.31977 9.24644 5.31977 8.50062C5.31977 7.75477 5.92656 7.14797 6.67242 7.14797ZM19.375 13.2814H15.8538C15.5731 12.1473 14.5472 11.3038 13.3275 11.3038C12.1079 11.3038 11.082 12.1473 10.8012 13.2814H0.625C0.279844 13.2814 0 13.5612 0 13.9064C0 14.2516 0.279844 14.5314 0.625 14.5314H10.8013C11.082 15.6655 12.1079 16.5091 13.3276 16.5091C14.5473 16.5091 15.5732 15.6655 15.8539 14.5314H19.375C19.7202 14.5314 20 14.2516 20 13.9064C20 13.5612 19.7202 13.2814 19.375 13.2814ZM13.3276 15.2591C12.5817 15.2591 11.9749 14.6523 11.9749 13.9064C11.9749 13.1605 12.5817 12.5538 13.3276 12.5538C14.0734 12.5538 14.6802 13.1605 14.6802 13.9064C14.6802 14.6523 14.0734 15.2591 13.3276 15.2591Z" fill="#1B1B1B" />
                </svg>
                Фильтры
              </div>

              <div className={styles.sort}>
                Сортировка:
                <select value={sortedFilters} onChange={handleSelectSort}>
                  <option value="opinion">рекомендуем</option>
                  <option value="price:desc">Сначала дорогие</option>
                  <option value="price:asc">Сначала дешевые</option>
                </select>
              </div>

              <div className={styles.stock} onClick={() => handleCheckboxStatus()}>
                <input type="checkbox" name="checkboxStatus" id="checkboxStatus" className={styles.checkbox} />
                <label htmlFor="checkboxStatus">В наличии</label>
              </div>
            </div>

            <ProductsList products={products} isLoading={isLoading} />

            {!isLoading && products.length > 0 && !loadMoreHidden && (
              <div className={styles.load_more_wrapper}>
                <LoadMoreButton
                  text={'Показать еще'}
                  loading={isLoading}
                  onLoadMore={handleLoadMore}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <Popup
        activePopup={activePopup}
        setActivePopup={setActivePopup}
        data={products}
        handleChange={handleSubmitForm}
        statusForm={sendingForm}
        filteredCount={products?.length}
      />
    </>
  )
}

const RecursiveCategoryItem = ({ category, level, expandedCategories, handleCategoryClick, isCategoryActive, styles }) => {
  const hasChildren = category.children?.length > 0;
  const isExpanded = expandedCategories[category.id1c];

  const Tag = level === 1 ? 'h4' : 'p';
  const itemClassName = level === 1 ? styles.child_item : styles.grandchild_item;

  return (
    <div className={`${itemClassName} ${isCategoryActive(category.id1c) ? styles.active : ''}`}>
      <Tag onClick={(e) => handleCategoryClick(e, category.slug, category.id1c, category.name)}>
        {category.name}
        {hasChildren && (
          <motion.span
            className={styles.arrow}
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg width="14" height="10" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 5L6.76 1L1 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.span>
        )}
      </Tag>

      {hasChildren && (
        <motion.div
          className={styles.grandchild_container} // Все дочерние списки используют стили grandchild
          initial={{ height: 0 }}
          animate={{ height: isExpanded ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.grandchild_cat}>
            {[...category.children]
              .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
              .map((child) => (
                <RecursiveCategoryItem
                  key={child.id1c} // Используем ID для ключа - это лучшая практика
                  category={child}
                  level={level + 1}
                  expandedCategories={expandedCategories}
                  handleCategoryClick={handleCategoryClick}
                  isCategoryActive={isCategoryActive}
                  styles={styles}
                />
              ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};


export default function ContentPage({ data }) {

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <CatalogContent />
    </Suspense>
  )
}
