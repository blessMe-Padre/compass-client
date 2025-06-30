import ClientProductComponent from "./ClientProductComponent";
import getProductById from '@/app/utils/getProductById';
import getAllProductsByTitle from '@/app/utils/getAllProductsByTitle';

export const revalidate = 60;

export async function generateMetadata({ params }) {
    const { id } = await params;
    const product = await getProductById(id);
    return {
        title: `Компас СП | ${product?.title}`,
        description: product?.description,
    }
}


// Вспомогательная функция для получения "чистого" названия товара
function getCleanTitle(fullTitle) {
    if (typeof fullTitle !== 'string') {
        return fullTitle || ''; // Возвращаем пустую строку, если название не строка или null/undefined
    }

    const sizeHeightPattern = /\s(?:[рp]\.\s*)?[\d-]+(?:\/[\d-]+)?$/i;

    // Удаляем найденный паттерн
    let cleanTitle = fullTitle.replace(sizeHeightPattern, '');

    cleanTitle = cleanTitle.replace(/\s*,\s*$/, '').trim();
    cleanTitle = cleanTitle.replace(/\s*\(\s*\)\s*$/, '').trim();
    cleanTitle = cleanTitle.trim();

    // console.log(cleanTitle);


    return cleanTitle;
}



export default async function Page({ params }) {
    const { id } = await params;
    const product = await getProductById(id);
    const productTitle = await product?.title;
    const titleUniq = getCleanTitle(productTitle);
    const sameProducts = await getAllProductsByTitle(titleUniq);

    // console.log(sameProducts);

    return (
        <ClientProductComponent
            data={product}
            sameProducts={sameProducts}
        />
    );
}