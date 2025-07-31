import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { CardItem, Preloader,  } from '..';



export default function ProductsList({ products, isLoading, count, isWishlist = false }) {
    return (
        <section className={styles.section}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`${styles.products_list} ${isWishlist ? `${styles.wishlist}` : ''} ${count === 4 ? styles.count : ''}`}
                >
                    {products?.length > 0 ? (
                        products.map((product, index) => (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                key={`${product.id}-${index}`}
                                > 
                                <CardItem element={product} />
                            </motion.div>
                        ))
                    ) : (
                        <div>
                            {isLoading ? (
                            <Preloader width={50} height={50} />
                            ) : (
                                'Товары не найдены'
                            )}
                        </div>
                    )}                    
            </motion.div>  
        </section>
    )
}