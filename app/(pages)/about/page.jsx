import styles from './style.module.scss';

export const metadata = {
    title: "Компас СП | О компании",
    description: "Магазин «КОМПАС» — ваш надежный проводник в мире качественной одежды и обуви для охоты, рыбалки и работы!",
}


const apiUrl = 'http://90.156.134.142:1337/api/products?populate=*';



export default async function page() {

    try {
        const response = await getData(`${process.env.NEXT_PUBLIC_DOMAIN}/api/nashi-raboties?populate=*`);
        data = response || null;

    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }

    return (
        <>
            <h1>О компании</h1>
        </>
    )
}
