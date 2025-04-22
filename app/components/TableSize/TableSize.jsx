import data from '@/app/table-data.json'
import styles from './style.module.scss';

const TableSize = () => {
    return (
        <section className={styles.section}>
            {
                data?.map((table, index) => (
                    <div className={styles.table} key={index}>
                        <h3 className={styles.title}>{table.title}</h3>
                        <div className={styles.table_header}>
                            <span>Размер</span>
                            <span>Объем груди</span>
                            <span>Объем талии</span>
                            <span>Объем бедер</span>
                        </div>
                        <ul>
                            {
                                table.data?.map((item, idx) => (
                                    <li className={styles.row} key={idx}>
                                        <div className={styles.row_item}><span>{item.size}</span><span>Размер</span></div>
                                        <div className={styles.row_item}><span>{item.chest}</span><span>Объем груди</span></div>
                                        <div className={styles.row_item}><span>{item.waist}</span><span>Объем талии</span></div>
                                        <div className={styles.row_item}><span>{item.hips}</span><span>Объем бедер</span></div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                ))
            }
        </section>
    );
}


export default TableSize