import ContentPage from "./ContentPage";
import fetchData from "@/app/utils/fetchData";

export const metadata = {
    title: "Компас СП | Оформление заказа",
    description: "Магазин «КОМПАС» — ваш надежный проводник в мире качественной одежды и обуви для охоты, рыбалки и работы!",
}

const apiUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/api/stranicza-obmen-i-vozvrat?populate=*`;

export default async function page() {

    return (
        <>
            <ContentPage />
        </>
    )
}
