import styles from './style.module.scss';


export default function FilterForm() {

    /** TODO: ориентироваться на dns
     * можно выбрать много пунктов, пункты будут приходить
     * из атрибутов, при нажатии на Применить будет 1 запрос
     * 
     * тут можно формировать filters_options и конкатенацией вставлять в запрос собирая все данные
     * http://90.156.134.142:1337/api/products?filters[categories][slug][$eq]=letniy_i_zimniy_assortiment&filters[statusProduct][$eq]=stock&filters[size][$eq]=56-58&populate=*
     * https://http://90.156.134.142/api/products/filters/?q=5070 rtx&category=17a89aab16404e77&order=new&stock=now-today-tomorrow-later-out_of_stock&f[4rw]=1cst&f[9z]=2n4
     * https://www.dns-shop.ru/catalog/search/filters/?q=5070 rtx&category=17a89aab16404e77&order=new&stock=now-today-tomorrow-later-out_of_stock&f[4rw]=1cst&f[9z]=2n4
    */
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