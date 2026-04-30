import ContentPage from "./ContentPage"
import { getAllCategoriesGraphQLServer } from "@/app/utils/graphql/getAllCategoriesGraphQLServer";

// потом удалить ревалидацию
// оставить graphql «застывшего» дерева категорий, обновление категорий каталога только через перезборку проекта
export const revalidate = 1;

export const metadata = {
    title: "Компас СП | Каталог",
    description: "Магазин «КОМПАС» — ваш надежный проводник в мире качественной одежды и обуви для охоты, рыбалки и работы!",
}
const page = async () => {
    const categories = await getAllCategoriesGraphQLServer();

    return (
        <ContentPage initialCategories={categories} />
    )
}

export default page