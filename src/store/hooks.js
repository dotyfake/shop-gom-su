import { useContext } from 'react';

import Context from './Context';

export const useGetProducts = (type) => {
    const state = useContext(Context);
    const products = state.filter((product) => {
        return product.status.includes(type);
    });
    if (products.length > 0) {
        return products;
    }
};
