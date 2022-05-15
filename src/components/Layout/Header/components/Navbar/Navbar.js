import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';

const cx = classNames.bind(styles);
const navItems = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Sản phẩm', path: '/Products' },
    { name: 'Gốm sứ cao cấp', path: 'LuxuryProducts' },
    { name: 'Tin mới', path: 'News' },
    { name: 'Liên hệ', path: 'Contact' },
];

const Navbar = () => {
    return (
        <div className={cx('nav-bar')}>
            <nav>
                <ul className={cx('nav-list')}>
                    {navItems.map((item, i) => (
                        <li key={i} className={cx('nav-item', 'abc')}>
                            <Link to={item.path}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
