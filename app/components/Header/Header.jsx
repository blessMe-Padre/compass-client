import { PageMenu } from './../index';
import styles from './style.module.scss';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className="container">
                <PageMenu />
            </div>

        </header>
    )
}

export default Header