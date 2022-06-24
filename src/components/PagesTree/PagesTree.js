import classNames from 'classnames/bind';
import styles from './PagesTree.module.scss';
import { Link } from 'react-router-dom';
import { Home, Products } from '~/pages';

const cx = classNames.bind(styles);

const PagesTree = ({ page }) => {
    return (
        <div className={cx('wrapper')}>
            <Link to="/" element={<Home />} className={cx('nav-item')}>
                Trang chủ
            </Link>{' '}
            /{' '}
            <Link to="/products" element={<Products />} className={cx('nav-item')}>
                Sản Phẩm
            </Link>{' '}
            / {page}
        </div>
    );
};

export default PagesTree;
