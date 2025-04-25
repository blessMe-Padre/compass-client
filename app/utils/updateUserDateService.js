const updateUserDateService = async (userId, data, url) => {
    // Создаём пустой Headers-объект и добавляем строго ASCII-строки:
    const headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');

    const response = await fetch(`${url}/${userId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error?.message || 'Ошибка при обновлении пользователя');
    }

    return await response.json();
};

export default updateUserDateService;
