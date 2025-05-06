
import styles from './style.module.scss'

export default function PromocodComponent() {
    return (
        <div className={styles.promocod_wrapper}>
            <div className={styles.promocod}>
                <input type='text' id='promo' alt='promo' />
                <label htmlFor="promo">Введите промокод</label>
                <button className={styles.btn_promo}>Применить</button>
            </div>
        </div>
    )
}