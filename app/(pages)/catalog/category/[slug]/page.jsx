import getProductById from '@/app/utils/getProductById';

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

    return (
        <div>
            Конкретная страница категории с slug={slug}
        </div>
    );
}