import getProductById from '@/app/utils/getProductById';
import ContentPage from '../ContentPage';

export const revalidate = 60;

export async function generateMetadata({ params }) {
    const { slug } = await params;
    // const product = await getProductById(slug);
    // return {
    //     title: product?.title,
    //     description: product?.description,
    // }
}

export default async function Page({ params }) {
    const { slug } = await params;
    console.log(slug)

    return (
        <div>
            {/* Страница категорий = {slug} */}
            <ContentPage />
       </div>
    );
}