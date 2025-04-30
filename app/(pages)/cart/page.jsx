import ContentPage from "./ContentPage";
import fetchData from "@/app/utils/fetchData";

export const metadata = {
    title: "Компас СП | Корзина",
    description: "Магазин «КОМПАС» — ваш надежный проводник в мире качественной одежды и обуви для охоты, рыбалки и работы!",
}

export default async function page() {
    return (
        <>
           <ContentPage  />
        </>
    )
}
