import Context from '~/store/Context';
import { useState, useEffect } from 'react';
import axios from 'axios';
const Provider = ({ children }) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios('/.netlify/functions/ProductsAPI').then((res) => {
            const db = res.data.results;
            const data = db.map((item) => {
                const fixDesc = item.properties.Title.rich_text.map((item) => item.plain_text);
                return {
                    title: fixDesc.join(' '),
                    desc: item.properties.Description.rich_text[0].plain_text,
                    price: item.properties.Price.number,
                    newPrice: item.properties.NewPrice.formula.number,
                    sale: item.properties.Sale.number,
                    origin: item.properties.Origin.select.name,
                    image: item.properties.Image.files[0].file.url,
                    imageThumb: item.properties.Image.files[1].file.url,
                    status: item.properties.Status.multi_select.map((item) => item.name),
                    type: item.properties.Type.select.name,
                    view: item.properties.Viewed.number,
                };
            });
            setProducts(data);
        });
    }, []);
    return <Context.Provider value={products}>{children}</Context.Provider>;
};

export default Provider;
