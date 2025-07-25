'use client'
import styles from './style.module.scss'
import useWishlistStore from '@/app/store/wishlistStore';


export default function FavoriteBtn({ element }) {
    const { wishlist, toggleWishlist } = useWishlistStore();
    const isInWishlist = wishlist.some(item => item.id === element.id);
    const handleClick = (product) => toggleWishlist(product)

    return (
        <div onClick={() => handleClick(element)} className={`${styles.favorite} ${isInWishlist ? styles.active : ''}`} >
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.3949 2.19052C19.3098 0.959297 17.8044 0.28125 16.1562 0.28125C13.8382 0.28125 12.3706 1.6657 11.5476 2.82715C11.3341 3.12853 11.1525 3.43073 11 3.7151C10.8475 3.43073 10.6659 3.12853 10.4524 2.82715C9.62943 1.6657 8.16183 0.28125 5.84375 0.28125C4.19555 0.28125 2.69023 0.95934 1.6051 2.19057C0.570066 3.36507 0 4.93807 0 6.61979C0 8.45038 0.714699 10.153 2.2492 11.978C3.62063 13.6091 5.59363 15.2904 7.87832 17.2372C8.72966 17.9627 9.61005 18.713 10.5473 19.533L10.5755 19.5577C10.697 19.6641 10.8485 19.7172 11 19.7172C11.1515 19.7172 11.303 19.664 11.4245 19.5577L11.4527 19.533C12.39 18.713 13.2703 17.9628 14.1218 17.2371C16.4064 15.2904 18.3794 13.6091 19.7508 11.978C21.2853 10.153 22 8.45038 22 6.61979C22 4.93807 21.4299 3.36507 20.3949 2.19052Z" fill="#6B6B6B" />
            </svg>
        </div>
    )
}