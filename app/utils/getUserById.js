const getUserById = async (documentId) => {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/users/?filters[documentId][$eq]=${documentId}&populate[orders][populate]=*`);
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

export default getUserById;