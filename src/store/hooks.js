import { useContext } from 'react';

import Context from './Context';

export const useGetProducts = (type) => {
    const { products } = useContext(Context);
    const result = products.filter((product) => {
        return product.status.includes(type);
    });
    if (result.length > 0) {
        return result;
    }
};

// export const useIncreaseView = (id) => {
//     const state = useContext(Context);

// };
