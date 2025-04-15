
import styles from "./style.module.scss";

export default function MenuButton({ onClick, opened }) {

    return (
        <button
            aria-label={opened ? 'Закрыть меню' : 'Открыть меню'}
            className={`${styles.button} ${opened ? styles.active : ''}`}
            onClick={onClick}
        >
            <div id="nav-icon1"
                className={`${styles.nav_icon1} ${opened ? styles.open : ''}`}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <span>Меню</span>
        </button>
    )
}
