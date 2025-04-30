import ContentPage from "./ContentPage";
import fetchData from "@/app/utils/fetchData";

export const metadata = {
    title: "Компас СП | Корзина",
    description: "Магазин «КОМПАС» — ваш надежный проводник в мире качественной одежды и обуви для охоты, рыбалки и работы!",
}

const apiUrl = 'http://90.156.134.142:1337/api/stranicza-obmen-i-vozvrat?populate=*';

export default async function page() {
    
    return (
        <>
           <ContentPage  />
        </>
    )
}
