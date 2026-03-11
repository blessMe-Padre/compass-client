const getAllCategories = async () => {
    try {
        /**
        *   ��� ������ �� ��������� ���� ��������� ��� ���������
        *   http://90.156.134.142:1337/api/categories?filters[parent][$null]=true&populate=*
        * 
        *   ��� ������ ������� �������� ���� ����� ��������� 1 ������ - ������� slug �� ������������ �������� - 
        *   http://90.156.134.142:1337/api/categories?filters[slug][$eq]=spetsodezhda&populate[children][populate]=*
        * 
        *   ��� ��������� �������� ������ - ������ ���������� ��������� - 
        *   http://90.156.134.142:1337/api/products?filters[categories][slug][$eq]=letniy_i_zimniy_assortiment&populate=*
        * 
        *   ��� ���
        *   http://90.156.134.142:1337/api/categories?filters[slug][$eq]=letniy_i_zimniy_assortiment&populate[products][populate]=*
        */

        // const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/categories?filters[parent][$null]=true&filters[children][$notNull]=true&populate[children][populate][children][populate]=*`);
        // const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/categories?filters[isMainParent][$eq]=true&populate[children][populate][children][populate]=*&sort[0]=name:asc`);
        // const res = await fetch(
        //     `${process.env.NEXT_PUBLIC_DOMAIN}/api/categories?` +
        //     `filters[isMainParent][$eq]=true&` +
        //     `fields[0]=name&fields[1]=slug&` +
        //     `populate[children][fields][0]=name&populate[children][fields][1]=slug&` +
        //     `populate[children][populate][children][fields][0]=name&populate[children][populate][children][fields][1]=slug&` +
        //     `populate[children][populate][children][populate][children][fields][0]=name&populate[children][populate][children][populate][children][fields][1]=slug&` +
        //     `pagination[pageSize]=1000&` +
        //     `sort[0]=name:asc`
        // );
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/categories?` +
            `filters[isMainParent][$eq]=true&` +
            `filters[isActive][$eq]=true&` +
            `fields[0]=name&fields[1]=slug&` +
            `populate[children][fields][0]=name&populate[children][fields][1]=slug&` +
            `populate[children][populate][children][fields][0]=name&populate[children][populate][children][fields][1]=slug&` +
            `populate[children][populate][children][populate][children][fields][0]=name&populate[children][populate][children][populate][children][fields][1]=slug&` +
            `pagination[pageSize]=1000&` +
            `sort[0]=name:asc`
        );
        
        if (!res.ok) {
            throw new Error(`������ HTTP: ${res.status}`);
        }
        const result = await res.json();
        return result.data;
    } catch (error) {
        console.error("������ ��� ��������:", error);
        return [];
    }
};

export default getAllCategories;



