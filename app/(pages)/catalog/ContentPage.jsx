'use client';
import { Breadcrumbs, ProductsList, LoadMoreButton, Popup, Notification } from '@/app/components';
import { useEffect, useState, useRef, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Suspense } from 'react';

import getAllProducts from '@/app/utils/getAllProducts';
import { motion } from "framer-motion";

import useCategorySlug from '@/app/store/categorySlug';

import styles from './style.module.scss';
import Link from 'next/link';
import useFilterStore from '@/app/store/filterStore';
import useCartStore from '@/app/store/cartStore';
import { Preloader } from '@/app/components'

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function CatalogContent({ initialCategories }) {

  // Для получения slug из GET параметра
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState(initialCategories || []);
  const { currentSlug, setCurrentSlug } = useCategorySlug();
  const prevSlug = usePrevious(currentSlug);

  const [categoryName, setCategoryName] = useState('Каталог');
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(!initialCategories);
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

  // Новые состояния для иерархической навигации
  const [navigationPath, setNavigationPath] = useState([]); // Путь навигации
  const [currentLevelCategories, setCurrentLevelCategories] = useState([]); // Текущие категории для отображения
  const [showProducts, setShowProducts] = useState(false); // Показывать ли товары

  const handleSubmitForm = () => {
    setSendingForm(!sendingForm);
  }

  // Функция для поиска категории по ID
  const findCategoryById = (categories, id) => {
    for (const category of categories) {
      if (category.id1c === id) return category;
      if (category.children) {
        const found = findCategoryById(category.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  // Обработчик клика по категории в левой панели
  const handleLeftPanelCategoryClick = (e, categorySlug, categoryId, categoryName, category) => {
    e.stopPropagation();

    // Всегда запускаем навигацию при клике на категорию
    handleCategoryNavigation(category);

    // Если у категории есть дочерние элементы, также раскрываем/скрываем их в левой панели
    if (category && category.children && category.children.length > 0) {
      setExpandedCategories(prev => ({
        ...prev,
        [categoryId]: !prev[categoryId]
      }));
    }
    setActiveCategoryId(categoryId);
  }

  // Общая функция навигации по категории
  const handleCategoryNavigation = (category) => {
    // Добавляем категорию в путь навигации
    const newPath = [...navigationPath, category];
    setNavigationPath(newPath);

    // Проверяем, есть ли у категории дочерние элементы
    if (category.children && category.children.length > 0) {
      // Если есть дочерние - показываем их
      setCurrentLevelCategories(category.children);
      setShowProducts(false);
      setCategoryName(category.name);
    } else {
      // Если нет дочерних - показываем товары
      setShowProducts(true);
      setCurrentSlug(category.slug);
      setCategoryName(category.name);
      setPageCount(1);
    }
  }

  // Обработчик клика по категории в правой панели
  const handleRightPanelCategoryClick = (category) => {
    handleCategoryNavigation(category);
  }

  // Обработчик кнопки "Назад"
  const handleBackClick = () => {
    if (navigationPath.length > 0) {
      const newPath = navigationPath.slice(0, -1);
      setNavigationPath(newPath);

      if (newPath.length === 0) {
        // Возвращаемся к корневым категориям
        setCurrentLevelCategories([]);
        setShowProducts(false);
        setCategoryName('Каталог');
      } else {
        // Возвращаемся к предыдущему уровню
        const previousCategory = newPath[newPath.length - 1];
        setCurrentLevelCategories(previousCategory.children || []);
        setShowProducts(false);
        setCategoryName(previousCategory.name);
      }
    }
  }

  // Обработчик клика по "Каталог" (сброс к корню)
  const handleCatalogRootClick = () => {
    setNavigationPath([]);
    setCurrentLevelCategories([]);
    setShowProducts(false);
    setCategoryName('Каталог');
    setCurrentSlug('');
    setActiveCategoryId(null);
    setPageCount(1);
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

  // const handleClickDefault = async () => {
  //   setLoading(true);
  //   try {
  //     const apiUrl = [
  //       `${process.env.NEXT_PUBLIC_DOMAIN}/api/products?`,
  //       `pagination[page]=${pageCount}&`,
  //       `pagination[pageSize]=${PAGE_SIZE}&`,
  //       'populate=*'
  //     ].join('').replace(/&+/g, '&').replace(/\?&/, '?');

  //     const newProducts = await getAllProducts(apiUrl);

  //     setProducts(prev => pageCount === 1 ? newProducts : [...prev, ...newProducts]);
  //     setLoadMoreHidden(newProducts.length < PAGE_SIZE);
  //     setCategoryName('Каталог');

  //   } catch (error) {
  //     console.error('Ошибка:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  useEffect(() => {
    const slug = searchParams.get('slug') || '';
    setCurrentSlug(slug);
  }, [searchParams, setCurrentSlug]);

  useEffect(() => {
    setPageCount(1);
  }, [currentSlug, checkboxStatus, sortedFilters, filters]);

  useEffect(() => {
    setNotificationActive(true)
  }, [cartItems])

  useEffect(() => {
    if (initialCategories) {
      // Если категории уже загружены, обрабатываем slug
      const slug = searchParams.get('slug');
      if (slug && initialCategories.length > 0) {
        const findCategoryBySlug = (categories, targetSlug) => {
          for (const category of categories) {
            if (category.slug === targetSlug) return category;
            if (category.children) {
              const found = findCategoryBySlug(category.children, targetSlug);
              if (found) return found;
            }
          }
          return null;
        };

        const foundCategory = findCategoryBySlug(initialCategories, slug);
        if (foundCategory) {
          if (foundCategory.children && foundCategory.children.length > 0) {
            setCurrentLevelCategories(foundCategory.children);
            setShowProducts(false);
            setCategoryName(foundCategory.name);
            setNavigationPath([foundCategory]);
          } else {
            setShowProducts(true);
            setCategoryName(foundCategory.name);
            setNavigationPath([foundCategory]);
          }
        }
      }
    }
  }, [initialCategories, searchParams]);

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

    // Загружаем товары только если показываем продукты
    if (showProducts) {
      fetchProducts();
    }

  }, [currentSlug, pageCount, checkboxStatus, sortedFilters, filters, showProducts]);

  // Компонент для отображения категорий в правой панели
  const CategoryGrid = ({ categories }) => {
    return (
      <div className={styles.category_grid}>
        {[...categories]
          .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
          .map((category) => (
            <motion.div
              key={category.id1c}
              className={`${styles.category_card} ${!category.image ? styles.category_card_no_image : ''}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRightPanelCategoryClick(category)}
            >
              {category.image ? (
                <div className={styles.category_card_image}>
                  <Image
                    className={styles.category_image}
                    src={`${process.env.NEXT_PUBLIC_DOMAIN}${category?.image?.url}`}
                    alt={category.name}
                    width={345}
                    height={223}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+"
                  />
                  <div className={styles.category_overlay}>
                    <h3 className={styles.category_card_title}>{category.name}</h3>
                    {category.children && category.children.length > 0 && (
                      <p className={styles.category_card_subtitle}>
                        {category.children.length} подкатегорий
                      </p>
                    )}
                    <div className={styles.category_card_arrow}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.category_card_content_simple}>
                  <h3 className={styles.category_card_title_simple}>{category.name}</h3>
                  {category.children && category.children.length > 0 && (
                    <p className={styles.category_card_subtitle_simple}>
                      {category.children.length} подкатегорий
                    </p>
                  )}
                  <div className={styles.category_card_arrow_simple}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
      </div>
    );
  };

  // Определяем, что показывать в правой панели
  const rightPanelContent = useMemo(() => {
    if (showProducts) {
      return (
        <>
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
        </>
      );
    } else if (currentLevelCategories.length > 0) {
      return <CategoryGrid categories={currentLevelCategories} />;
    } else {
      // Показываем все родительские категории при заходе на каталог
      return <CategoryGrid categories={categories} />;
    }
  }, [showProducts, currentLevelCategories, products, isLoading, loadMoreHidden, sortedFilters, checkboxStatus, categories]);

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

        {/* Хлебные крошки навигации */}
        {navigationPath.length > 0 && (
          <div className={styles.navigation_breadcrumbs}>
            <button
              className={styles.back_button}
              onClick={handleBackClick}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Назад
            </button>
            <div className={styles.path_items}>
              {navigationPath.map((item, index) => (
                <span key={item.id1c} className={styles.path_item}>
                  {index > 0 && <span className={styles.path_separator}>/</span>}
                  <Link href={`/catalog?slug=${item.slug}`}>
                    {item.name}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className={styles.catalog_wrapper}>
          <div className={styles.dop_wrapper}>
            <Link href={'/catalog'}>
              <div className={styles.catalog_btn} onClick={handleCatalogRootClick}>
                Каталог
              </div>
            </Link>
            <div className={styles.list_cat}>
              {isLoading === false ? [...categories]
                .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
                .map((parentCategory) => (
                  <div key={parentCategory.id1c}
                    className={`${styles.parent_cat} ${isCategoryActive(parentCategory.id1c) ? styles.active : ''}`}
                  >
                    <h3
                      onClick={(e) => handleLeftPanelCategoryClick(e, parentCategory.slug, parentCategory.id1c, parentCategory.name, parentCategory)}
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
                                handleCategoryClick={handleLeftPanelCategoryClick}
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
            {rightPanelContent}
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
      <Tag onClick={(e) => handleCategoryClick(e, category.slug, category.id1c, category.name, category)}>
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


export default function ContentPage({ data, initialCategories }) {

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <CatalogContent initialCategories={initialCategories} />
    </Suspense>
  )
}
