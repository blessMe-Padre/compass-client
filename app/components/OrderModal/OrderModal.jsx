'use client';
import { useState } from 'react';
import styles from './style.module.scss';

export default function OrderModal({ isOpen, onClose, productData }) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        comment: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Здесь можно добавить отправку на сервер
            console.log('Order submitted:', { ...formData, product: productData });
            
            // Имитация отправки
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setIsSubmitted(true);
            setTimeout(() => {
                onClose();
                setIsSubmitted(false);
                setFormData({ name: '', phone: '', email: '', comment: '' });
            }, 2000);
        } catch (error) {
            console.error('Error submitting order:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className={styles.overlay}
            onClick={onClose}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>
                    <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="18.4463" width="21.8033" height="0.726776" rx="0.363388" transform="rotate(-45 3 18.4463)" fill="#2a3a57" />
                        <rect x="4.21094" y="3" width="21.8033" height="0.726776" rx="0.363388" transform="rotate(45 4.21094 3)" fill="#2a3a57" />
                    </svg>
                </button>

                {isSubmitted ? (
                    <div className={styles.success}>
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <h3>Заявка отправлена!</h3>
                        <p>Мы свяжемся с вами в ближайшее время</p>
                    </div>
                ) : (
                    <>
                        <h2 className={styles.title}>Заказать товар</h2>
                        
                        {productData && (
                            <div className={styles.productInfo}>
                                <p className={styles.productTitle}>{productData.title}</p>
                                {productData.size && <span>Размер: {productData.size}</span>}
                                {productData.quantity > 0 && <span>Количество: {productData.quantity}</span>}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Ваше имя *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Введите имя"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="phone">Телефон *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="+7 (___) ___-__-__"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@mail.ru"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="comment">Комментарий</label>
                                <textarea
                                    id="comment"
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleChange}
                                    placeholder="Дополнительная информация"
                                    rows={3}
                                />
                            </div>

                            <button 
                                type="submit" 
                                className={styles.submitBtn}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
