import ClientProductComponent from "./ClientProductComponent";
import getProductById from '@/app/utils/getProductById';
import getAllProductsByTitle from '@/app/utils/getAllProductsByTitle';

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
    const { id } = await params;
    const product = await getProductById(id);
    const productTitle = await product?.title;
    const sameProducts = await getAllProductsByTitle(productTitle);

    // console.log(product)

    return (
        <ClientProductComponent
            data={product}
            sameProducts={sameProducts}
        />
    );
}