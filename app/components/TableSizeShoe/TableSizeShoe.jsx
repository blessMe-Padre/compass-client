import data from '@/app/shoe-table-data.json';
import styles from './style.module.scss';

const TableSizeShoe = () => {
    return (
        <section className={styles.section}>
            {data.map((table) => (
                <article className={styles.tableBlock} key={table.title}>
                    <h3 className={styles.title}>{table.title}</h3>

                    {table.sections.map((section) => (
                        <div className={styles.tableScroll} key={section.title}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th
                                            className={styles.sectionTitle}
                                            colSpan={(section.rows[0]?.values.length ?? 0) + 1}
                                            scope="colgroup"
                                        >
                                            {section.title}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {section.rows.map((row) => (
                                        <tr key={row.label}>
                                            <th className={styles.rowLabel} scope="row">
                                                {row.label}
                                            </th>
                                            {row.values.map((value, valueIndex) => (
                                                <td key={`${row.label}-${valueIndex}`}>
                                                    {value || '—'}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </article>
            ))}
        </section>
    );
}

export default TableSizeShoe;
