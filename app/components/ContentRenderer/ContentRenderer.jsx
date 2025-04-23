import React from 'react';
import styles from './style.module.scss';

const renderContent = (content) => {
    return content.map((item, index) => {
        switch (item.type) {
            case 'heading':
                const HeadingTag = `h${item.level}`;
                return (
                    <HeadingTag key={index} className={styles.title}>
                        {item.children.map((child, childIndex) => (
                            <React.Fragment key={childIndex}>
                                {renderContent([child])}
                            </React.Fragment>
                        ))}
                    </HeadingTag>
                );
            case 'paragraph':
                return (
                    <p className={styles.p} key={index}>
                        {item.children.map((child, childIndex) => (
                            <React.Fragment key={childIndex}>
                                {renderContent([child])}
                            </React.Fragment>
                        ))}
                    </p>
                );
            case 'list':
                const ListTag = item.format === 'unordered' ? 'ul' : 'ol';
                return (
                    <ListTag className={styles.ul} key={index}>
                        {item.children.map((child, childIndex) => (
                            <React.Fragment key={childIndex}>
                                {renderContent([child])}
                            </React.Fragment>
                        ))}
                    </ListTag>
                );
            case 'list-item':
                return (
                    <li className={styles.li} key={index} >
                        {item.children.map((child, childIndex) => (
                            <React.Fragment key={childIndex}>
                                {renderContent([child])}
                            </React.Fragment>
                        ))}
                    </li>
                );
            case 'text':
                return <React.Fragment key={index}>{item.text}</React.Fragment>;
            case 'image':
                return (
                    <div className={styles.imageWrapper} key={index}>
                        <a href={item.image.url} target="_blank" rel="noopener noreferrer">
                            <img
                                src={item.image.url}
                                alt={item.image.alternativeText || "image"}
                                width={item.image.width || 500}
                                height={item.image.height || 300}
                                loading="lazy"
                            />
                        </a>
                    </div>
                );
            default:
                return null;
        }
    });
};

export default function ContentRenderer({ content }) {
    return <div>{renderContent(content)}</div>;
};

