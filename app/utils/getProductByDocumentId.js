const getProductByDocumentId = async (id) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/products/?filters[documentId][$eq]=${id}&populate=*`);
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

export default getProductByDocumentId;