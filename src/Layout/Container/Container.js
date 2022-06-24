import { Routes, Route } from 'react-router-dom';
import { Home, Products, News, Contact, ProductPage, Payment, Login, Order } from '~/pages';
import classNames from 'classnames/bind';
import styles from './Container.module.scss';
import { useViewport } from '~/store';

const Container = () => {
    const cx = classNames.bind(styles);
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 740;
    return (
        <div className={cx('container', { marginTop: isMobile })}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/productPage" element={<ProductPage />} />
                <Route path="/news" element={<News />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/login" element={<Login />} />
                <Route path="/order" element={<Order />} />
            </Routes>
        </div>
    );
};

export default Container;
