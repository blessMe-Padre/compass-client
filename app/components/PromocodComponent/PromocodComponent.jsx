
import styles from './style.module.scss'

export default function PromocodComponent() {
    
    /**
     * 
     * TODO: добавить к strapi новую запись промокод
     * тут написать через react-hook-form новую форму
     * собирает значение из инпута
     * отправляет пост запрос через service на api
     * если есть, приходит 200 и тогда применяется скидка, которая также приходит в теле ответа
     */

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