import { useContext, useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Context from './Context';
import { ProviderContext } from '~/store';

export const useGetProducts = (type) => {
    const { products } = useContext(Context);
    const result = products.filter((product) => {
        return product.status.includes(type);
    });
    if (result.length > 0) {
        return result;
    }
};

export const useToast = ({ newProduct, counter = 1 }) => {
    const { setCart, setCounterCart, cart } = useContext(ProviderContext);
    const prevClick = useRef();

    const show = (e) => {
        setCounterCart(cart.length);
        if (e.nativeEvent.timeStamp - prevClick.current < 1200) {
            toast.error('Bạn đã thao tác quá nhanh!', {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            setCart((prev) => {
                const result = [...prev, { counter: counter, newProduct: newProduct.id, price: newProduct.newPrice }];
                localStorage.setItem('cart', JSON.stringify(result));
                return result;
            });
            toast.success('Đã thêm sản phẩm vào giỏ hàng!', {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        prevClick.current = e.nativeEvent.timeStamp;
    };
    return <ToastContainer show={show} />;
};

export const useViewport = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    return { width };
};
