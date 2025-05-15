
import { LinkButton } from '@/app/components';
import styles from './style.module.scss';

const Discounts = () => {

    const hasDiscount = true;
    const discountValue = 10;

    return (
        <section className={styles.section}>
            <p className={styles.title}>В нашем магазине действует накопительная система скидок</p>
            <ul>
                <li>При сумме покупок 50 000 ₽  — <span>скидка 3%</span></li>
                <li>От 50 000 до 75 000 ₽  — <span>скидка 5%</span></li>
                <li>От 75 000 до 100 000 ₽ — <span>скидка 7%</span></li>
                <li>При сумме покупок от 100 000 ₽ - <span>скидка 10% НАВСЕГДА</span></li>
            </ul>

            {!hasDiscount &&
                <div>
                    <p className={styles.title}>Вы еще ничего не покупали</p>
                </div>
            }

            {hasDiscount &&
                <div className={styles.discount_block}>
                    <p className={styles.discount_block_title}>Ваша скидка постоянного клиента</p>
                    <p className={styles.discount_block_value}>{discountValue}%</p>
                </div>
            }

            <LinkButton
                href="/catalog"
                text="В каталог"
            />


        </section>
    )
}

export default Discounts