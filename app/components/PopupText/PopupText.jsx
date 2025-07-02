
import { LinkButton } from '..';
import styles from './style.module.css';


export default function PopupText({ title, activePopupText, setActivePopupText }) {

    const handleKeyDown = (event) => {
        if (event.key === 'Escape' || event.key === 'Esc') {
            setActivePopupText(false);
        }
    }

    return (

        <div
            className={`${styles.popup} ${activePopupText ? styles.popupActive : styles.popupNone}`}
            onClick={() => { setActivePopupText(false) }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <div className={styles.popup__body}>

                <div
                    className={styles.popup__content}
                    onClick={e => e.stopPropagation()}
                >

                    <button
                        className={styles.popup__close}
                        onClick={() => { setActivePopupText(false) }}
                    >
                        <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="18.4463" width="21.8033" height="0.726776" rx="0.363388" transform="rotate(-45 3 18.4463)" fill="#2a3a57" />
                            <rect x="4.21094" y="3" width="21.8033" height="0.726776" rx="0.363388" transform="rotate(45 4.21094 3)" fill="#2a3a57" />
                        </svg>
                    </button>

                    <h2>{title}</h2>
                    <p className={styles.popup__text}>Для того, чтобы оставить отзыв на товар, необходимо авторизоваться</p>

                    <LinkButton
                        text='Зарегистрироваться / войти'
                        href='/login2'
                        width='100%'
                    />


                </div>
            </div>
        </div>
    )
}