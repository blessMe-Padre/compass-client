import ClientProductComponent from "./ClientProductComponent";
import getProductById from '@/app/utils/getProductById';
import getAllProductsByTitle from '@/app/utils/getAllProductsByTitle';
import { RelativeProducts } from "@/app/section";
import { Breadcrumbs } from "@/app/components";

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
// function getCleanTitle(fullTitle) {
//     if (typeof fullTitle !== 'string') {
//         return fullTitle || ''; // Возвращаем пустую строку, если название не строка или null/undefined
//     }

//     const sizeHeightPattern = /\s(?:[рp]\.\s*)?[\d-]+(?:\/[\d-]+)?$/i;

//     let cleanTitle = fullTitle.replace(sizeHeightPattern, '');


//     cleanTitle = cleanTitle.replace(/\s*,\s*$/, '').trim();
//     cleanTitle = cleanTitle.replace(/\s*\(\s*\)\s*$/, '').trim();
//     cleanTitle = cleanTitle.trim();

//     return cleanTitle;
// }



export default async function Page({ params }) {
    const { id } = await params;
    const product = await getProductById(id);
    // const productTitle = getCleanTitle(product?.title);
    // const sameProducts = await getAllProductsByTitle(productTitle);
    const productTitle = product?.title
    const sameProducts = await getAllProductsByTitle(productTitle)

    console.log(product);

    return (
        <>
            <div className='container'>
                <Breadcrumbs
                    secondLabel={product?.categories[0]?.name}
                    secondLink={`/catalog?slug=${product?.categories[0]?.slug}`}
                    thirdLabel={product?.categories[1]?.name}
                    thirdLink={`/catalog?slug=${product?.categories[1]?.slug}`}
                />
            </div>
            <ClientProductComponent
                data={product}
                sameProducts={sameProducts}
            />

            <RelativeProducts />
        </>
    );
}