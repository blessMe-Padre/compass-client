import Image from "next/image";
import styles from './style.module.scss';
import Link from "next/link";

const LinkButton = ({ href = '/', text, ...props }) => {
    const { style, forClick, onClick, width } = props;
    const customStyle = width ? { maxWidth: width } : {};

    return (

        forClick === true ?
            (
                <button onClick={onClick} className={`${styles.link}`}>{text}</button>
            )
            :
            (
                <Link
                    style={customStyle}
                    className={`${styles.link} ${style === 'noBg' ? `${styles.noBg}` : ''}`}
                    href={href}>
                    {text}
                </Link>
            )
    )
}

export default LinkButton