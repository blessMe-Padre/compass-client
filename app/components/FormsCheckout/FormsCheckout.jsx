import styles from './style.module.scss'

export default function FormsCheckout({ type }) {
    return (
        <form action="">
            <h3>Контактные данные</h3>
            {type === 'physical' 
                ?
                    <div className={styles.form_content}>
                        <p>ФИО получателя*</p>

                        <div className={styles.input_wrapper}>
                            <div className={styles.wrapper}>
                                <label htmlFor="name">Название организации*</label>
                                <input type='text' id='name' alt='name' placeholder='Название' />
                            </div>
                        </div>

                        <div className={styles.input_wrapper}>
                            <div className={styles.wrapper}>
                                <label htmlFor="tel">Телефон контактного лица*</label>
                                <input type='tel' id='tel' alt='tel' placeholder='Телефон' />
                            </div>
                        </div>

                        <div className={styles.input_wrapper}>
                            <div className={styles.wrapper}>
                                <label htmlFor="inn">ИНН*</label>
                                <input type='text' id='inn' alt='inn' placeholder='ИНН' />
                            </div>
                        </div>

                        
                    </div> 
                :
                    <div className={styles.form_content}>
                        <p>Название организации*</p>
                        <div>
                            <input type="text" />
                            <label htmlFor=""></label>
                        </div>
                    </div>
            }

            <div className={styles.delivery}>
                <h3>Способ доставки</h3>
                <div className={styles.delivery_wrapper}>
                    <div className={styles.delivery_input_wrapper}>
                        <label 
                            htmlFor='1' 
                            >
                            Самовывоз 
                        </label>
                        <input type="radio" name="" id="1" className="delivery_input" />
                    </div>

                    <div className={styles.delivery_input_wrapper}>
                        <label htmlFor='2'>
                            Доставка СДЭК 
                        </label>
                        <input type="radio" name="" id="2" className="delivery_input" />
                    </div>

                    <div className={styles.delivery_input_wrapper}>
                        <label htmlFor='3' >
                            Доставка почтой 
                        </label>
                        <input type="radio" name="" id="3" className="delivery_input" />
                    </div>

                    <div className={styles.delivery_input_wrapper}>
                        <label htmlFor='4'  >
                            Курьер по Владивостоку 
                        </label>
                        <input type="radio" name="" id="4" className="delivery_input" />
                    </div>
                </div>
                <p>
                    г. Владивосток, пр-кт Красного Знамени, д.91, с 9:00 до 20:00
                </p>
            </div>

            <div className={styles.payment}>
                <h3>Способ оплаты</h3>
                <div className={styles.payment_wrapper}>
                    <div className={styles.payment_input_wrapper}>
                        <label htmlFor='1' >
                            Оплата онлайн банковской картой 
                        </label>
                        <input type="radio" name="" id="" className="payment_input" />
                    </div>

                    <div className={styles.payment_input_wrapper}>
                        <label htmlFor='1' >
                            СБП 
                        </label>
                        <input type="radio" name="" id="" className="payment_input" />
                    </div>

                    <div className={styles.payment_input_wrapper}>
                        <label htmlFor='1' >
                            Оплата наличными при получении 
                        </label>
                        <input type="radio" name="" id="" className="payment_input" />
                    </div>
                
                </div>
                <p>
                    г. Владивосток, пр-кт Красного Знамени, д.91, с 9:00 до 20:00
                </p>
            </div>

            <div className={styles.comment}>
                <h3>Комментарий к заказу</h3>
                <div className={styles.comment_wrapper}>
                    <p>
                        Введите комментарий
                    </p>
                    
                    <textarea name="" id=""></textarea>
                </div>
            </div>
        
        </form>
    )
}