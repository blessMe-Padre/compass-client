'use client';
import { Breadcrumbs, ProductsList } from '@/app/components';
import useWishlistStore from '@/app/store/wishlistStore';

export default function ContentPage({ data }) {

    const { wishlist } = useWishlistStore();
    return (
        <>  
            <div className='container'>
                <Breadcrumbs
                    secondLabel="Список желаемого"
                />
                
                <h2 className='page_title'>Список желаемого</h2>

                {/* TODO: тут будет запрос по пользователю к его списку желаемого */}
                <ProductsList products={wishlist} />
                
            </div>
        </>
    );
}