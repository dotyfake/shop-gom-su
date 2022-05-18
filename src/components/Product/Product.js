import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import images from '~/assets/images/';
import { Link } from 'react-router-dom';
import { ProductPage } from '~/pages';

const cx = classNames.bind(styles);

const Product = ({ type, props }) => {
    switch (type) {
        case 'DEFAULT_PRODUCT':
            return (
                <div
                    className={cx('wrapper')}
                    style={{ background: `url(${images.productBg}) no-repeat center/ contain` }}
                >
                    <div className={cx('info')}>
                        <div
                            className={cx('image')}
                            style={{
                                background: `url(${props.imageThumb}) no-repeat center/ contain`,
                                paddingTop: '90%',
                            }}
                        ></div>
                        <div className={cx('desc')}>
                            <h4 className={cx('name')}>{props.title}</h4>
                            <div className={cx('price-buy')}>
                                <p className={cx('price')}>{props.newPrice.toLocaleString()}đ</p>
                                <button className={cx('buy')}>MUA NGAY</button>
                            </div>
                        </div>
                        {props.status.includes('Luxury Product') && <span>Sản phẩm cao cấp</span>}
                    </div>
                </div>
            );
        case 'SEARCH_PRODUCT':
            return (
                <Link to="/productPage" element={<ProductPage />}>
                    <div className={cx('product-search')}>
                        <div
                            className={cx('search-img')}
                            style={{
                                background: `url(${props.imageThumb}) no-repeat center/ contain`,
                                paddingLeft: '35%',
                            }}
                        ></div>
                        <div className={cx('search-info')}>
                            <div className={cx('search-name')}>{props.title}</div>
                            <div className={cx('search-price')}>{props.newPrice.toLocaleString()} vnđ</div>
                        </div>
                    </div>
                </Link>
            );
        case 'PAGE_PRODUCT':
            return <div className={cx('wrapper')}></div>;

        default:
    }
};

export default Product;
