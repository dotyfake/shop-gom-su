import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import { useContext } from 'react';
import { ProviderContext } from '~/store';

const cx = classNames.bind(styles);
const navItems = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Sản phẩm', path: '/Products' },
    { name: 'Gốm sứ cao cấp', path: '/Products' },
    { name: 'Tin mới', path: '/News' },
    { name: 'Liên hệ', path: '/Contact' },
];

const Navbar = () => {
    const { products, setProductsState } = useContext(ProviderContext);
    const goToTop = () => {
        window.scroll(0, 0);
    };
    return (
        <div className={cx('nav-bar')}>
            <nav>
                <ul className={cx('nav-list')}>
                    {navItems.map((item, i) => (
                        <li
                            key={i}
                            className={cx('nav-item', 'abc')}
                            onClick={() => {
                                if (item.name === 'Sản phẩm') {
                                    setProductsState(products);
                                } else if (item.name === 'Gốm sứ cao cấp') {
                                    setProductsState(products.filter((item) => item.status.includes('Luxury Product')));
                                }
                                goToTop();
                            }}
                        >
                            <Link to={item.path}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
