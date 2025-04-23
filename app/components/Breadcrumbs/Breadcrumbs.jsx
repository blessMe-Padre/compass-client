'use client';

import Link from 'next/link';
import styles from './style.module.scss';

export default function Breadcrumbs({ secondLink, secondLabel, thirdLabel }) {
    return (
        <nav className={styles.breadcrumbs}>
            <ul>
                <li>
                    <Link href="/">Главная</Link>
                </li>
                {secondLabel && (
                    <li>
                        {thirdLabel ? (
                            <Link href={secondLink}>{secondLabel}</Link>
                        ) : (
                            <span className={styles.active}>{secondLabel}</span>
                        )}
                    </li>
                )}
                {thirdLabel && (
                    <li className={styles.active}>{thirdLabel}</li>
                )}
            </ul>
        </nav>
    );
}
