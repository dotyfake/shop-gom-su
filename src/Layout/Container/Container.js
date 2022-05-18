import { Routes, Route } from 'react-router-dom';
import { Home, Products, News, Contact, ProductPage } from '~/pages';

const Container = () => {
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/productPage" element={<ProductPage />} />
                <Route path="/news" element={<News />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </div>
    );
};

export default Container;
