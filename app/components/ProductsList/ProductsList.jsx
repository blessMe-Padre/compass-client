import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { CardItem } from '..';


export default function ProductsList({ products, isLoading }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.products_list}
            >
                {products?.length > 0 ? (
                    products.map((product) => (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            key={product.id}
                        > 
                            <CardItem element={product} />
                        </motion.div>
                    ))
                    ) : (
                    <div>
                        {isLoading ? (
                            <div className={styles.loading_placeholder}>
                                
                            </div>
                        ) : (
                        'Товары не найдены'
                        )}
                    </div>
                )}                    
        </motion.div>  
    )
}