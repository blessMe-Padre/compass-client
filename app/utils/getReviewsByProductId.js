const getReviewsByProductId = async (url) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}${url}`);
        if (!res.ok) {
            throw new Error(`Ошибка HTTP: ${res.status}`);
        }
        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Ошибка при загрузке:", error);
        return [];
    }
};

export default getReviewsByProductId;