const getAllCategories = async () => {
    try {
        /**
        *   Это запрос на получение всех категорий без родителей
        *   http://90.156.134.142:1337/api/categories?filters[parent][$null]=true&populate=*
        * 
        *   Это запрос который получает всех детей категории 1 уровня - меняешь slug на динамический параметр - 
        *   http://90.156.134.142:1337/api/categories?filters[slug][$eq]=spetsodezhda&populate[children][populate]=*
        * 
        *   Это категория третьего уровня - товары конкретной категории - 
        *   http://90.156.134.142:1337/api/products?filters[categories][slug][$eq]=letniy_i_zimniy_assortiment&populate=*
        * 
        *   или так
        *   http://90.156.134.142:1337/api/categories?filters[slug][$eq]=letniy_i_zimniy_assortiment&populate[products][populate]=*
        */

        // const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/categories?filters[parent][$null]=true&filters[children][$notNull]=true&populate[children][populate][children][populate]=*`);
        const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/categories?filters[isMainParent][$eq]=true&populate[children][populate][children][populate]=*&sort[0]=name:asc`);
        if (!res.ok) {
            throw new Error(`Ошибка HTTP: ${res.status}`);
        }
        const result = await res.json();
        return result.data;
    } catch (error) {
        console.error("Ошибка при загрузке:", error);
        return [];
    }
};

export default getAllCategories;