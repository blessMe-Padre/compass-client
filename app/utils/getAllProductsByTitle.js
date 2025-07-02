const getAllProductsByTitle = async (title) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/products?filters[title][$containsi]=${encodeURIComponent(title)}&populate=*`);
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

export default getAllProductsByTitle;