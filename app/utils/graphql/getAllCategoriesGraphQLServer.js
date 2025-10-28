const GET_FISHING_CATEGORY = `
    query GetFishingCategory {
        categories(
            filters: { 
                isMainParent: { eq: true },
            }
            pagination: { limit: 100 }
            sort: ["name:asc"]
        ) {
            id1c
            name   
            slug
            image {
                url
            }
            children(pagination: { limit: 100 }) {     
                id1c 
                name
                slug
                image {
                    url
                }
                children(pagination: { limit: 100 }) {     
                    id1c
                    name
                    slug
                    image {
                        url
                    }
                    children(pagination: { limit: 100 }) {     
                        id1c
                        name
                        slug
                        image {
                            url
                        }
                        children(pagination: { limit: 100 }) {     
                            id1c
                            name
                            slug
                            image {
                                url
                            }
                            children(pagination: { limit: 100 }) {
                                id1c
                                name
                                slug
                            }
                        }
                    }
                }
            }
        }
    }
`;

export async function getAllCategoriesGraphQLServer() {
    // Используем fetch для серверного кэширования Next.js
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: GET_FISHING_CATEGORY }),
        next: {
            revalidate: 300 // Кэшировать на 5 минут
        },
        cache: 'force-cache'
    });

    const json = await response.json();
    return json.data.categories;
}

