import ClientProductComponent from "./ClientProductComponent";
import getProductById from '@/app/utils/getProductById';

export const revalidate = 60;

export async function generateMetadata({ params }) {
    const { id } = params;
    const product = await getProductById(id);
    return {
        title: product.title,
        description: product.description,
    }
}

const data = {
    "data": [
        {
            "id": 145268,
            "attributes": {
                "price": 18193,
                "title": "Костюм-поплавок 'СКИФ' -40 (Таслан, Хаки)",
                "description": "Нет описания",
                "createdAt": "2024-03-07T03:51:42.035Z",
                "updatedAt": "2025-04-20T19:14:14.169Z",
                "id1c": "6f577e61-e8d3-11e6-80f9-bcee7b8bc990",
                "stock": 389,
                "storeplace": "Нет склада",
                "quantitySales": "0",
                "Attributes": null,
                "priceOpt": "0",
                "priceString": null,
                "imgs": {
                    "data": [
                        {
                            "id": 21167,
                            "attributes": {
                                "name": "cart-image.jpg",
                                "alternativeText": null,
                                "caption": null,
                                "width": 5176,
                                "height": 2698,
                                "formats": {
                                    "thumbnail": {
                                        "name": "cart-image",
                                        "hash": "thumbnail_172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                        "ext": ".jpg",
                                        "mime": "image/jpg",
                                        "path": null,
                                        "width": 245,
                                        "height": 128,
                                        "size": 3.44,
                                        "url": "/remove/cart-image.jpg"
                                    },
                                    "large": {
                                        "name": "cart-image",
                                        "hash": "large_172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                        "ext": ".jpg",
                                        "mime": "image/jpg",
                                        "path": null,
                                        "width": 1000,
                                        "height": 521,
                                        "size": 29.46,
                                        "url": "/remove/cart-image.jpg"
                                    },
                                    "medium": {
                                        "name": "medium_import_files/17/172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902.jpg",
                                        "hash": "medium_172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                        "ext": ".jpg",
                                        "mime": "image/jpg",
                                        "path": null,
                                        "width": 750,
                                        "height": 391,
                                        "size": 18.4,
                                        "url": "/remove/cart-image.jpg"
                                    },
                                    "small": {
                                        "name": "small_import_files/17/172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902.jpg",
                                        "hash": "small_172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                        "ext": ".jpg",
                                        "mime": "image/jpg",
                                        "path": null,
                                        "width": 500,
                                        "height": 260,
                                        "size": 9.66,
                                        "url": "/remove/cart-image.jpg"
                                    }
                                },
                                "hash": "172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                "ext": ".jpg",
                                "mime": "image/jpg",
                                "size": 200.25,
                                "url": "/remove/cart-image.jpg",
                                "previewUrl": null,
                                "provider": "local",
                                "provider_metadata": null,
                                "createdAt": "2024-03-26T01:09:16.222Z",
                                "updatedAt": "2024-03-26T01:09:16.222Z"
                            }
                        },
                        {
                            "id": 21167,
                            "attributes": {
                                "name": "cart-image.jpg",
                                "alternativeText": null,
                                "caption": null,
                                "width": 5176,
                                "height": 2698,
                                "formats": {
                                    "thumbnail": {
                                        "name": "cart-image",
                                        "hash": "thumbnail_172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                        "ext": ".jpg",
                                        "mime": "image/jpg",
                                        "path": null,
                                        "width": 245,
                                        "height": 128,
                                        "size": 3.44,
                                        "url": "/remove/cart-image.jpg"
                                    },
                                    "large": {
                                        "name": "cart-image",
                                        "hash": "large_172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                        "ext": ".jpg",
                                        "mime": "image/jpg",
                                        "path": null,
                                        "width": 1000,
                                        "height": 521,
                                        "size": 29.46,
                                        "url": "/remove/cart-image.jpg"
                                    },
                                    "medium": {
                                        "name": "medium_import_files/17/172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902.jpg",
                                        "hash": "medium_172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                        "ext": ".jpg",
                                        "mime": "image/jpg",
                                        "path": null,
                                        "width": 750,
                                        "height": 391,
                                        "size": 18.4,
                                        "url": "/remove/cart-image.jpg"
                                    },
                                    "small": {
                                        "name": "small_import_files/17/172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902.jpg",
                                        "hash": "small_172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                        "ext": ".jpg",
                                        "mime": "image/jpg",
                                        "path": null,
                                        "width": 500,
                                        "height": 260,
                                        "size": 9.66,
                                        "url": "/remove/cart-image.jpg"
                                    }
                                },
                                "hash": "172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                "ext": ".jpg",
                                "mime": "image/jpg",
                                "size": 200.25,
                                "url": "/remove/category-slide-1.jpg",
                                "previewUrl": null,
                                "provider": "local",
                                "provider_metadata": null,
                                "createdAt": "2024-03-26T01:09:16.222Z",
                                "updatedAt": "2024-03-26T01:09:16.222Z"
                            }
                        },
                        {
                            "id": 21167,
                            "attributes": {
                                "name": "cart-image.jpg",
                                "alternativeText": null,
                                "caption": null,
                                "width": 5176,
                                "height": 2698,
                                "formats": {
                                    "thumbnail": {
                                        "name": "cart-image",
                                        "hash": "thumbnail_172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                        "ext": ".jpg",
                                        "mime": "image/jpg",
                                        "path": null,
                                        "width": 245,
                                        "height": 128,
                                        "size": 3.44,
                                        "url": "/remove/cart-image.jpg"
                                    },
                                    "large": {
                                        "name": "cart-image",
                                        "hash": "large_172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                        "ext": ".jpg",
                                        "mime": "image/jpg",
                                        "path": null,
                                        "width": 1000,
                                        "height": 521,
                                        "size": 29.46,
                                        "url": "/remove/cart-image.jpg"
                                    },
                                    "medium": {
                                        "name": "medium_import_files/17/172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902.jpg",
                                        "hash": "medium_172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                        "ext": ".jpg",
                                        "mime": "image/jpg",
                                        "path": null,
                                        "width": 750,
                                        "height": 391,
                                        "size": 18.4,
                                        "url": "/remove/cart-image.jpg"
                                    },
                                    "small": {
                                        "name": "small_import_files/17/172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902.jpg",
                                        "hash": "small_172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                        "ext": ".jpg",
                                        "mime": "image/jpg",
                                        "path": null,
                                        "width": 500,
                                        "height": 260,
                                        "size": 9.66,
                                        "url": "/remove/cart-image.jpg"
                                    }
                                },
                                "hash": "172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                "ext": ".jpg",
                                "mime": "image/jpg",
                                "size": 200.25,
                                "url": "/remove/cart-image.jpg",
                                "previewUrl": null,
                                "provider": "local",
                                "provider_metadata": null,
                                "createdAt": "2024-03-26T01:09:16.222Z",
                                "updatedAt": "2024-03-26T01:09:16.222Z"
                            }
                        },
                        {
                            "id": 21167,
                            "attributes": {
                                "name": "cart-image.jpg",
                                "alternativeText": null,
                                "caption": null,
                                "width": 5176,
                                "height": 2698,
                                "formats": {
                                    "thumbnail": {
                                        "name": "cart-image",
                                        "hash": "thumbnail_172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                        "ext": ".jpg",
                                        "mime": "image/jpg",
                                        "path": null,
                                        "width": 245,
                                        "height": 128,
                                        "size": 3.44,
                                        "url": "/remove/cart-image.jpg"
                                    },
                                    "large": {
                                        "name": "cart-image",
                                        "hash": "large_172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                        "ext": ".jpg",
                                        "mime": "image/jpg",
                                        "path": null,
                                        "width": 1000,
                                        "height": 521,
                                        "size": 29.46,
                                        "url": "/remove/cart-image.jpg"
                                    },
                                    "medium": {
                                        "name": "medium_import_files/17/172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902.jpg",
                                        "hash": "medium_172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                        "ext": ".jpg",
                                        "mime": "image/jpg",
                                        "path": null,
                                        "width": 750,
                                        "height": 391,
                                        "size": 18.4,
                                        "url": "/remove/cart-image.jpg"
                                    },
                                    "small": {
                                        "name": "small_import_files/17/172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902.jpg",
                                        "hash": "small_172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                        "ext": ".jpg",
                                        "mime": "image/jpg",
                                        "path": null,
                                        "width": 500,
                                        "height": 260,
                                        "size": 9.66,
                                        "url": "/remove/cart-image.jpg"
                                    }
                                },
                                "hash": "172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                "ext": ".jpg",
                                "mime": "image/jpg",
                                "size": 200.25,
                                "url": "/remove/cart-image.jpg",
                                "previewUrl": null,
                                "provider": "local",
                                "provider_metadata": null,
                                "createdAt": "2024-03-26T01:09:16.222Z",
                                "updatedAt": "2024-03-26T01:09:16.222Z"
                            }
                        },
                        {
                            "id": 21167,
                            "attributes": {
                                "name": "cart-image.jpg",
                                "alternativeText": null,
                                "caption": null,
                                "width": 5176,
                                "height": 2698,
                                "formats": {
                                    "thumbnail": {
                                        "name": "cart-image",
                                        "hash": "thumbnail_172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                        "ext": ".jpg",
                                        "mime": "image/jpg",
                                        "path": null,
                                        "width": 245,
                                        "height": 128,
                                        "size": 3.44,
                                        "url": "/remove/cart-image.jpg"
                                    },
                                    "large": {
                                        "name": "cart-image",
                                        "hash": "large_172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                        "ext": ".jpg",
                                        "mime": "image/jpg",
                                        "path": null,
                                        "width": 1000,
                                        "height": 521,
                                        "size": 29.46,
                                        "url": "/remove/cart-image.jpg"
                                    },
                                    "medium": {
                                        "name": "medium_import_files/17/172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902.jpg",
                                        "hash": "medium_172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                        "ext": ".jpg",
                                        "mime": "image/jpg",
                                        "path": null,
                                        "width": 750,
                                        "height": 391,
                                        "size": 18.4,
                                        "url": "/remove/cart-image.jpg"
                                    },
                                    "small": {
                                        "name": "small_import_files/17/172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902.jpg",
                                        "hash": "small_172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                        "ext": ".jpg",
                                        "mime": "image/jpg",
                                        "path": null,
                                        "width": 500,
                                        "height": 260,
                                        "size": 9.66,
                                        "url": "/remove/cart-image.jpg"
                                    }
                                },
                                "hash": "172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                "ext": ".jpg",
                                "mime": "image/jpg",
                                "size": 200.25,
                                "url": "/remove/cart-image.jpg",
                                "previewUrl": null,
                                "provider": "local",
                                "provider_metadata": null,
                                "createdAt": "2024-03-26T01:09:16.222Z",
                                "updatedAt": "2024-03-26T01:09:16.222Z"
                            }
                        },
                        {
                            "id": 21167,
                            "attributes": {
                                "name": "cart-image.jpg",
                                "alternativeText": null,
                                "caption": null,
                                "width": 5176,
                                "height": 2698,
                                "formats": {
                                    "thumbnail": {
                                        "name": "cart-image",
                                        "hash": "thumbnail_172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                        "ext": ".jpg",
                                        "mime": "image/jpg",
                                        "path": null,
                                        "width": 245,
                                        "height": 128,
                                        "size": 3.44,
                                        "url": "/remove/cart-image.jpg"
                                    },
                                    "large": {
                                        "name": "cart-image",
                                        "hash": "large_172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                        "ext": ".jpg",
                                        "mime": "image/jpg",
                                        "path": null,
                                        "width": 1000,
                                        "height": 521,
                                        "size": 29.46,
                                        "url": "/remove/cart-image.jpg"
                                    },
                                    "medium": {
                                        "name": "medium_import_files/17/172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902.jpg",
                                        "hash": "medium_172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                        "ext": ".jpg",
                                        "mime": "image/jpg",
                                        "path": null,
                                        "width": 750,
                                        "height": 391,
                                        "size": 18.4,
                                        "url": "/remove/cart-image.jpg"
                                    },
                                    "small": {
                                        "name": "small_import_files/17/172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902.jpg",
                                        "hash": "small_172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                        "ext": ".jpg",
                                        "mime": "image/jpg",
                                        "path": null,
                                        "width": 500,
                                        "height": 260,
                                        "size": 9.66,
                                        "url": "/remove/cart-image.jpg"
                                    }
                                },
                                "hash": "172bc2da744111e88108bcee7b8bc990_4deb50f4dab911ee813c00155d025902_cf42c3d1f0",
                                "ext": ".jpg",
                                "mime": "image/jpg",
                                "size": 200.25,
                                "url": "/remove/cart-image.jpg",
                                "previewUrl": null,
                                "provider": "local",
                                "provider_metadata": null,
                                "createdAt": "2024-03-26T01:09:16.222Z",
                                "updatedAt": "2024-03-26T01:09:16.222Z"
                            }
                        },
                    ]
                },
                "categories": {
                    "data": [
                        {
                            "id": 71,
                            "attributes": {
                                "name": "Спецодежда",
                                "description": null,
                                "quantityProducts": null,
                                "pages": null,
                                "createdAt": "2024-02-07T03:04:54.633Z",
                                "updatedAt": "2024-02-07T03:04:54.633Z",
                                "id1c": "5ad4adae-8a37-11e3-8a99-00252231065e"
                            }
                        },
                        {
                            "id": 63,
                            "attributes": {
                                "name": "Одежда",
                                "description": null,
                                "quantityProducts": null,
                                "pages": null,
                                "createdAt": "2024-02-07T03:04:54.399Z",
                                "updatedAt": "2024-05-14T15:56:53.628Z",
                                "id1c": "292152c2-3214-11e3-8a0d-00252231065e"
                            }
                        }
                    ]
                },
            }
        },
    ],
    "meta": {
        "pagination": {
            "page": 1,
            "pageSize": 2000,
            "pageCount": 1,
            "total": 304
        }
    }
}

const variantList = [
    { size: '44-46', height: '170-176' },
    { size: '44-46', height: '170-176' },
    { size: '44-46', height: '170-176' },
    { size: '44-46', height: '170-176' },
    { size: '44-46', height: '170-176' },
    { size: '44-46', height: '170-176' },
    { size: '44-46', height: '170-176' },
]

export default async function Page({ params }) {
    const { id } = params;
    const product = await getProductById(id);

    return (
        <ClientProductComponent
            data={product}
            variantList={variantList}
        />
    );
}