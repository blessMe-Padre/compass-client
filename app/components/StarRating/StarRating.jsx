import styles from './style.module.scss';

const StarRating = ({ rating, setRating }) => {

    return (
        <div className={styles.starRating}>
            {[...Array(5)].map((_, index) => {
                const currentRate = index + 1;
                const isFilled = rating !== null && currentRate <= rating;

                return (
                    <label key={index} className={styles.starLabel}>
                        <input
                            type="radio"
                            name="star"
                            value={currentRate}
                            onClick={() => setRating(currentRate)}
                            className={styles.starInput}
                        />
                        <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill={isFilled ? '#FFD700' : 'none'}
                            stroke={isFilled ? '#FFD700' : 'black'}
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M14.8311 9.29199L14.9434 9.6377H22.8486L16.7471 14.0713L16.4531 14.2842L16.5654 14.6299L18.8955 21.8027L12.7939 17.3701L12.5 17.1562L12.2061 17.3701L6.10352 21.8027L8.43457 14.6299L8.54688 14.2842L8.25293 14.0713L2.15137 9.6377H10.0566L10.1689 9.29199L12.5 2.11719L14.8311 9.29199Z"
                                strokeWidth="1.5"
                            />
                        </svg>
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;
