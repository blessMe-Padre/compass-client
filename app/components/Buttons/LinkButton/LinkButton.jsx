import Image from "next/image";
import styles from './style.module.scss';
import Link from "next/link";

const LinkButton = ({ href = '/', text, ...props }) => {
    const { style } = props;

    return (
        <Link
            className={`${styles.link} ${style === 'noBg' ? `${styles.noBg}` : ''}`}
            href={href}>
            {text}
        </Link>
    )
}

export default LinkButton