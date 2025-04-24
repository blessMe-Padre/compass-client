import fetchData from '@/app/utils/fetchData';
import ContentPage from './ContentPage';

export const metadata = {
    title: "Компас СП | Контакты",
    description: "Магазин «КОМПАС» — ваш надежный проводник в мире качественной одежды и обуви для охоты, рыбалки и работы!",
}

const apiUrl = 'http://90.156.134.142:1337/api/stranicza-kontakty?populate=*';

export default async function page() {
    let data = null;

    try {
        const response = await fetchData(apiUrl);
        data = response?.data || null;
    
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }

    return (
        <>
            <div>
                <ContentPage data={data} />
            </div>
        </>
    )
}
