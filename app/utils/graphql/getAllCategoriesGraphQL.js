import { request } from 'graphql-request';

/**
 * получение всех категорий вложенных до 5 уровня
 */

const GET_FISHING_CATEGORY = `
    query GetFishingCategory {
        categories(
            filters: { 
                isMainParent: { eq: true }
            }
            pagination: { limit: 100 }
            sort: ["name:asc"]
        ) {
            id1c
            name   
            slug
            image {
                url
                formats
                width
                height
                alternativeText
            }
            children(pagination: { limit: 100 }) {     
                id1c 
                name
                slug
                image {
                    url
                    formats
                    width
                    height
                    alternativeText
                }
                children {
                    id1c
                    name
                    slug
                    image {
                        url
                        formats
                        width
                        height
                        alternativeText
                    }
                    children {
                        id1c
                        name
                        slug
                        image {
                            url
                            formats
                            width
                            height
                            alternativeText
                        }
                        children {
                            id1c
                            name
                            slug
                            image {
                                url
                                formats
                                width
                                height
                                alternativeText
                            }
                            children {
                                id1c
                                name
                                slug
                                image {
                                    url
                                    formats
                                    width
                                    height
                                    alternativeText
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export async function getAllCategoriesGraphQL() {
    const res = await request(
        `${process.env.NEXT_PUBLIC_DOMAIN}/graphql`,
        GET_FISHING_CATEGORY
    );
    // console.log('GraphQL Response:', JSON.stringify(res, null, 2)); // Добавлено для отладки
    return res.categories || [];
}