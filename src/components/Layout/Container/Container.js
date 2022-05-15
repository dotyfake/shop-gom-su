import { Routes, Route } from 'react-router-dom';
import { Home, News, LuxuryProducts, Contact } from '~/pages';
import Products from '~/pages/Products/Products';

const Container = () => {
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Products" element={<Products />} />
                <Route path="/LuxuryProducts" element={<LuxuryProducts />} />
                <Route path="/News" element={<News />} />
                <Route path="/Contact" element={<Contact />} />
            </Routes>
        </div>
    );
};

export default Container;