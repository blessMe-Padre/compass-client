const getReviewsByProductId = async (id) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/products?filters[documentId][$containsi]=${id}&populate[otzyvy_tovaries][populate]=*`);
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