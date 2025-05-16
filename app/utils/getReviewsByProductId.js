const getReviewsByProductId = async (id) => {
    try {
        const res = await fetch(`http://90.156.134.142:1337/api/products?filters[documentId][$containsi]=${id}&populate[otzyvy_tovaries][populate]=*`);
        if (!res.ok) {
            throw new Error(`Ошибка HTTP: ${res.status}`);
        }
        const result = await res.json();
        return result.data[0];
    } catch (error) {
        console.error("Ошибка при загрузке:", error);
        return [];
    }
};

export default getReviewsByProductId;