const getAllProducts = async (url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/products?populate=*`) => {
    try {
        // const res = await fetch(`http://90.156.134.142:1337/api/products/?filters[id][$eq]=${id}&populate[imgs][populate]`);
        const res = await fetch(url);
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

export default getAllProducts;