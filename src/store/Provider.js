import Context from '~/store/Context';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '~/Firebase/firebase-config';
import { signOut } from 'firebase/auth';
const Provider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(() => {
        return JSON.parse(localStorage.product ?? `[]`);
    });
    const [watched, setWatched] = useState(() => {
        return JSON.parse(localStorage.watched ?? '[]');
    });
    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.cart ?? '[]');
    });
    const [searchProducts, setSearchProducts] = useState([]);
    const [productsState, setProductsState] = useState([]);
    const [counterCart, setCounterCart] = useState(0);
    const [isAuth, setIsAuth] = useState(() => {
        return JSON.parse(localStorage.getItem('isAuth'));
    });

    const signUserOut = () => {
        signOut(auth).then(() => {
            setIsAuth(false);
            localStorage.removeItem('isAuth');
            window.location.pathname = '/';
        });
    };

    useEffect(() => {
        axios('/.netlify/functions/ProductsAPI').then((res) => {
            const db = res.data.results;
            const data = db.map((item) => {
                const fixDesc = item.properties.Title.rich_text.map((item) => item.plain_text);
                return {
                    title: fixDesc.join(''),
                    id: item.id,
                    desc: item.properties.Description.rich_text[0].plain_text,
                    price: item.properties.Price.number,
                    newPrice: item.properties.NewPrice.formula.number,
                    sale: item.properties.Sale.number,
                    origin: item.properties.Origin.select.name,
                    image: item.properties.Image.files[0].file.url,
                    imageThumb: item.properties.Image.files[1].file.url,
                    status: item.properties.Status.multi_select.map((item) => item.name),
                    type: item.properties.Type.select.name,
                    viewed: { view: item.properties.Viewed.number, id: item.properties.Viewed.id },
                };
            });
            setProducts(data);
        });
    }, []);
    return (
        <Context.Provider
            value={{
                products,
                product,
                setProduct,
                searchProducts,
                setSearchProducts,
                productsState,
                setProductsState,
                watched,
                setWatched,
                cart,
                setCart,
                counterCart,
                setCounterCart,
                isAuth,
                setIsAuth,
                signUserOut,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default Provider;
