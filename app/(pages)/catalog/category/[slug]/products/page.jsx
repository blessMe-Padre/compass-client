import getProductById from '@/app/utils/getProductById';
import getAllProductsByTitle from '@/app/utils/getAllProductsByTitle';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const product = await getProductById(slug);
    return {
        title: product?.title,
        description: product?.description,
    }
}

export default async function Page({ params }) {
    const { slug } = await params;

    const data = null;
    try {
        const response = getAllProductsByTitle(slug);   
        data == response;
    } catch (error) {
        console.error(error);
    }

    return (
        <div>
            Конкретная страница товаров
            Тут запрос по конкретной категории 
        </div>
    );
}