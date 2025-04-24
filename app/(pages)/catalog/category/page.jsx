import getProductById from '@/app/utils/getProductById';

export const revalidate = 60;

export async function generateMetadata({ params }) {
    const { id } = await params;
    const product = await getProductById(id);
    return {
        title: product?.title,
        description: product?.description,
    }
}

export default async function Page({ params }) {
    return (
        <div>
            Страница категорий
       </div>
    );
}