'use client';
import { Breadcrumbs, ContentRenderer } from '@/app/components';
import Image from 'next/image';
import styles from './style.module.scss';

const domain = 'http://90.156.134.142:1337';

export default function ContentPage({ data }) {

    return (
        <>  
            <div className='container'>
                <Breadcrumbs
                    secondLabel="Контакты"
                />
                
                <h2 className='page_title'>{data?.title}</h2>

                <div className='flex gap-10' style={{ marginBottom: '40px'}}>
                    <div className='flex-column'>
                        ТЕЛЕФОН:
                        8 (423) 244-60 90,
                        8 (423) 230-2238,
                        8 (423) 230-2239,
                    </div>

                    <div className='flex-column'>
                        E-MAIL
                        kompas-vl@mail.ru
                    </div>

                    <div>
                        ЗАДАТЬ ВОПРОС
                    </div>
                </div>

                (slug )
                <div>
                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                        <a href="https://yandex.ru/maps/75/vladivostok/?utm_medium=mapframe&utm_source=maps" style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '0px' }}>Владивосток</a><a href="https://yandex.ru/maps/75/vladivostok/house/prospekt_krasnogo_znameni_91/ZUoHaA5hTUIFWUJuYGJwc3pmYQA=/?ll=131.914725%2C43.126558&utm_medium=mapframe&utm_source=maps&z=17" style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '14px' }}>
                        Проспект Красного Знамени, 91 на карте Владивостока — Яндекс Карты</a><iframe src="https://yandex.ru/map-widget/v1/?ll=131.914725%2C43.126558&mode=whatshere&whatshere%5Bpoint%5D=131.914725%2C43.126558&whatshere%5Bzoom%5D=17&z=17" width="1400" height="500" frameborder="1" allowFullScreen="true" style={{ position: 'relative' }}>
                        </iframe>
                    </div>
                </div>



                {data?.img?.url && (
                    <Image className={styles.image} src={`${domain}${data?.img?.url}`} alt={'img'} width={1400} height={400} />
                )}
                
                <div className={styles.designer_fckg_wrapper}>
                    <ContentRenderer content={data?.desc} />
                </div>

            </div>
        </>
    );
}