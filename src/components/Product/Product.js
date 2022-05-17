import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import images from '~/assets/images/';

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
                            <div className={cx('name')}>{props.title}</div>
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
            return <div className={cx('wrapper')}></div>;
        case 'PAGE_PRODUCT':
            return <div className={cx('wrapper')}></div>;

        default:
    }
};

export default Product;
