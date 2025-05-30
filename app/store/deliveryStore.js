import { create } from 'zustand';

const useDeliveryStore = create((set) => ({
    storeData: {
        city: '',
        cityCode: null,
        pvzName: '',
        pvzCode: null,
        cityCode: null,
        tariffName: '',
        tariffCode: null,
        deliveryPrice: 0,
        orderUuid: '',
        username: '',
        phone: '',
        email: '',
        comment: '',
        deliveryDateMax: ''
    },

    setDeliveryData: (newData) =>
        set((state) => ({
            storeData: {
                ...state.storeData,
                ...newData,
            },
        })),

}));

// setDeliveryData({ city: city.city, cityCode: city.code });

export default useDeliveryStore;
