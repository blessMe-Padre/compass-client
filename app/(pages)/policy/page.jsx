import ContentPage from './ContentPage';
import fetchData from '@/app/utils/fetchData';

export const metadata = {
    title: "Компас СП | Политика конфиденциальности",
    description: "Магазин «КОМПАС» — ваш надежный проводник в мире качественной одежды и обуви для охоты, рыбалки и работы!",
}

const apiUrl = 'http://90.156.134.142:1337/api/stranicza-politika-konfidenczialnosti?populate=*';

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
           <ContentPage data={data} />
        </>
    )
}
