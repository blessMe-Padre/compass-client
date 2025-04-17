import Image from "next/image";
import styles from './style.module.scss';
import Link from "next/link";

const LinkButton = ({ href, text }) => {
    return (
        <Link
            className={styles.link}
            href={href}>
            {text}
        </Link>
    )
}

export default LinkButton