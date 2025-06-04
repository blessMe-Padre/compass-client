import Form from '../';
import { FilterForm, AskForm } from '../'
import styles from './style.module.css';

export default function Popup({ activePopup, setActivePopup, data, handleChange, statusForm, forAsk, filteredCount }) {

    const handleKeyDown = (event) => {
        if (event.key === 'Escape' || event.key === 'Esc') {
            setActivePopup(false);
        }
    }

    return (

        <div
            className={`${styles.popup} ${activePopup ? styles.popupActive : styles.popupNone}`}
            onClick={() => { setActivePopup(false) }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <div className={styles.popup__body}>

                <div
                    className={styles.popup__content}
                    onClick={e => e.stopPropagation()}
                >

                    {forAsk ? <h3 className={styles.popup_title}>Задать вопрос</h3> : <h3 className={styles.popup_title}>Фильтры</h3>}

                    <button
                        className={styles.popup__close}
                        onClick={() => { setActivePopup(false) }}
                    >
                        <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="18.4463" width="21.8033" height="0.726776" rx="0.363388" transform="rotate(-45 3 18.4463)" fill="#2a3a57" />
                            <rect x="4.21094" y="3" width="21.8033" height="0.726776" rx="0.363388" transform="rotate(45 4.21094 3)" fill="#2a3a57" />
                        </svg>
                    </button>

                    {/* <Form
                        title="получите расчет стоимости"
                        subtitle="Оставьте контакты и квалифицированные специалисты за 5 минут рассчитают цену"
                    /> */}


                    {forAsk ? <AskForm /> : <FilterForm data={data} handleChange={handleChange} statusForm={statusForm} filteredCount={filteredCount} />}
                </div>
            </div>
        </div>
    )
}
