import styles from './style.module.scss';

const LoadMoreButton = ({ text, loading, onLoadMore }) => {
    return (
        <>

            <button
                className={styles.btn}
                onClick={onLoadMore} 
                disabled={loading}
            >
                
                {loading && (<div className={styles.loading_placeholder}></div>)}
                {text}
            </button>
        </>
    )
}

export default LoadMoreButton