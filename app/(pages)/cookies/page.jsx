import { Breadcrumbs } from '@/app/components'
import styles from './style.module.scss';

export const metadata = {
    title: "Компас СП | Cookies",
    description: "Магазин «КОМПАС» — ваш надежный проводник в мире качественной одежды и обуви для охоты, рыбалки и работы!",
}


const page = () => {
    return (
        <div className='container'>
            <Breadcrumbs
                secondLabel="Cookies"
            />

            <section className={styles.section}>
                <h1>Cookies</h1>

                <p>Мы очень много работаем над сайтом «Компас». Делаем его современным, удобным, функциональным и, конечно, информативным.</p>
                <p>Знаем, как для вас важно, чтобы ничего не зависало, информация была актуальной, все продукты в каталогах соответствовали представленным в магазинах по цене, наличию и еще очень много других факторов.</p>
                <p>Мы хотим еще быстрее отвечать на запросы, реагировать на проблемы с сайтом и выбирать правильный вектор его развития. Для этого нам очень нужны ваши cookie.</p>

                <h2>Что это такое?</h2>

                <p>Говоря простым языком, cookie – это файлы, фрагменты данных с информацией о сайтах, куда заходит покупатель, переходах, времени, проведенном на какой-либо странице, то есть, некая статистика. Все данные хранятся прямо на ваших устройствах (компьютере, телефоне и т.д.). А мы берем их уже из внешних аналитических ресурсов, метрик, ни в коем случае не нарушая вашу конфиденциальность.</p>

                <h2>Зачем мы собираем cookie?</h2>
                <p>Повторимся – для общего удобства. Нам интересно и важно знать, что вы читаете на сайте, в каком разделе проводите больше всего времени, а где вам, совсем не интересно.</p>
                <p>На основании полученных данных мы можем четко отследить, что делаем правильно, а что, к сожалению, нет. Можем видеть как растет ваша численность и насколько вы активны в целом.</p>

                <h2>Не хочу делиться cookie</h2>
                <p>Хотите сделать так, чтобы ваши cookie не считывались?</p>

                <button>Отклонить</button>
            </section>

        </div>
    )
}

export default page