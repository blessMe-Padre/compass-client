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
        orderUuid: ''
    },

    setDeliveryData: (newData) =>
        set((state) => ({
            storeData: {
                ...state.storeData,
                ...newData,
            },
        })),

}));

export default useDeliveryStore;
