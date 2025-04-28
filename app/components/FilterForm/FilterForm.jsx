import styles from './style.module.scss';


export default function FilterForm() {
    return (
        <form className={styles.form}>
            <div className={styles.form_filter_wrapper_price}>
                <label>Цена</label>
                <input type='range'></input>
            </div>

            <div className={styles.form_filter_wrapper_select}>
                <div>
                    <label htmlFor="">От</label>
                    <input placeholder='0'/>
                </div>

                <div>
                    <label htmlFor="">До</label>
                    <input placeholder='0'/>
                </div>
            </div>

            <div className={styles.form_filter_wrapper_select}>
                <label htmlFor="">Материал</label>
                <select name="" id="">
                    <option value="">Выбрать</option>
                    <option value="">1</option>
                    <option value="">2</option>
                </select>
            </div>

            <div className={styles.form_filter_wrapper_select}>
                <label htmlFor="">Материал</label>
                <select name="" id="">
                    <option value="">Выбрать</option>
                    <option value="">1</option>
                    <option value="">2</option>
                </select>
            </div>

            <div className={styles.form_filter_wrapper_select}>
                <label htmlFor="">Цвет</label>
                <select name="" id="">
                    <option value="">Выбрать</option>
                    <option value="">1</option>
                    <option value="">2</option>
                </select>
            </div>
            <div className={styles.form_filter_wrapper_select}>
                <label htmlFor="">Температура</label>
                <select name="" id="">
                    <option value="">Выбрать</option>
                    <option value="">1</option>
                    <option value="">2</option>
                </select>
            </div>
            <div className={styles.form_filter_wrapper_select}>
                <label htmlFor="">Назначение</label>
                <select name="" id="">
                    <option value="">Выбрать</option>
                    <option value="">1</option>
                    <option value="">2</option>
                </select>
            </div>
            <div className={styles.form_filter_wrapper_select}>
                <label htmlFor="">Сезон</label>
                <select name="" id="">
                    <option value="">Выбрать</option>
                    <option value="">1</option>
                    <option value="">2</option>
                </select>
            </div>
            <div className={styles.form_filter_wrapper_select}>
                <label htmlFor="">Особенности</label>
                <select name="" id="">
                    <option value="">Выбрать</option>
                    <option value="">1</option>
                    <option value="">2</option>
                </select>
            </div>
            <div className={styles.form_filter_wrapper_select}>
                <label htmlFor="">Пол</label>
                <select name="" id="">
                    <option value="">Выбрать</option>
                    <option value="">1</option>
                    <option value="">2</option>
                </select>
            </div>
            <div className={styles.form_filter_wrapper_select}>
                <label htmlFor="">Рост</label>
                <select name="" id="">
                    <option value="">Выбрать</option>
                    <option value="">1</option>
                    <option value="">2</option>
                </select>
            </div>
            <div className={styles.form_filter_wrapper_select}>
                <label htmlFor="">Размер</label>
                <select name="" id="">
                    <option value="">Выбрать</option>
                    <option value="">1</option>
                    <option value="">2</option>
                </select>
            </div>

            <div className={styles.wrapper_btns}>
                <button className={styles.form_btn_submit}>
                    Применить
                </button>

                <button className={styles.form_reset}>
                    Сбросить фильтр
                </button>
            </div>
        </form>
    )
}