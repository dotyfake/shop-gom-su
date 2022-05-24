import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import images from '~/assets/images/';
import { Link } from 'react-router-dom';
import { ProductPage } from '~/pages';
import { useContext } from 'react';
import { ProviderContext } from '~/store';

const cx = classNames.bind(styles);

const Product = ({ type, props, show, hide }) => {
    const { setProduct, setWatched, products } = useContext(ProviderContext);

    const handleSetWatched = () => {
        setWatched((prev) => {
            const newWatched = [...new Set([...prev, props.id])];
            localStorage.setItem('watched', JSON.stringify(newWatched));
            return newWatched;
        });
    };

    const goToTop = () => {
        window.scroll(0, 0);
    };

    switch (type) {
        case 'DEFAULT_PRODUCT':
            return (
                <>
                    <div
                        className={cx('wrapper')}
                        style={{ background: `url(${images.productBg}) no-repeat center/ contain` }}
                    >
                        <div className={cx('info')}>
                            <div className={cx('tags')}>
                                {props.sale > 0 && <p className={cx('sale')}>{`-` + props.sale + `%`}</p>}
                                {props.status.includes('New') && <p className={cx('new')}>New</p>}
                                {props.status.includes('Hot') && <p className={cx('hot')}>Hot</p>}
                            </div>
                            <Link
                                to="/productPage"
                                element={<ProductPage />}
                                onClick={() => {
                                    setProduct(() => {
                                        localStorage.setItem('product', JSON.stringify(props.id));
                                        return props.id;
                                    });
                                    handleSetWatched();
                                    goToTop();
                                }}
                            >
                                <div
                                    className={cx('image')}
                                    style={{
                                        background: `url(${props.imageThumb}) no-repeat center/ contain`,
                                        paddingTop: '90%',
                                    }}
                                ></div>
                            </Link>
                            <div className={cx('desc')}>
                                <Link
                                    to="/productPage"
                                    element={<ProductPage />}
                                    onClick={() => {
                                        setProduct(() => {
                                            localStorage.setItem('product', JSON.stringify(props.id));
                                            return props.id;
                                        });
                                        handleSetWatched();
                                        goToTop();
                                    }}
                                >
                                    <h4 className={cx('name')}>{props.title}</h4>
                                </Link>
                                <div className={cx('price-buy')}>
                                    <p className={cx('price')}>{props.newPrice.toLocaleString()}đ</p>
                                    {props.sale > 0 && (
                                        <p className={cx('old-price')}>{props.price.toLocaleString()}đ</p>
                                    )}
                                    <button className={cx('buy')} onClick={show}>
                                        MUA NGAY
                                    </button>
                                </div>
                            </div>
                            {props.status.includes('Luxury Product') && <span>Sản phẩm cao cấp</span>}
                        </div>
                    </div>
                </>
            );
        case 'SEARCH_PRODUCT':
            return (
                <Link
                    to="/productPage"
                    element={<ProductPage />}
                    onClick={() => {
                        hide();
                        setProduct(() => {
                            localStorage.setItem('product', JSON.stringify(props.id));
                            return props.id;
                        });
                        handleSetWatched();
                        goToTop();
                    }}
                >
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
        case 'WATCHED_PRODUCT':
            return (
                <div
                    className={cx('wrapper')}
                    style={{ background: `url(${images.productBg2}) no-repeat center/ contain` }}
                >
                    <div className={cx('info')}>
                        {/* <div className={cx('tags')}>
                            {props.sale > 0 && <p className={cx('sale')}>{`-` + props.sale + `%`}</p>}
                            {props.status.includes('New') && <p className={cx('new')}>New</p>}
                            {props.status.includes('Hot') && <p className={cx('hot')}>Hot</p>}
                        </div> */}
                        <Link
                            to="/productPage"
                            element={<ProductPage />}
                            onClick={() => {
                                setProduct(() => {
                                    localStorage.setItem('product', JSON.stringify(props.id));
                                    return props.id;
                                });
                                handleSetWatched();
                                goToTop();
                            }}
                        >
                            <div
                                className={cx('image')}
                                style={{
                                    background: `url(${props.imageThumb}) no-repeat center/ contain`,
                                    paddingTop: '100%',
                                }}
                            ></div>
                        </Link>
                        <div className={cx('desc')}>
                            <Link
                                to="/productPage"
                                element={<ProductPage />}
                                onClick={() => {
                                    setProduct(() => {
                                        localStorage.setItem('product', JSON.stringify(props.id));
                                        return props.id;
                                    });
                                    handleSetWatched();
                                    goToTop();
                                }}
                            >
                                <h4 className={cx('name', 'watched')}>{props.title}</h4>
                            </Link>
                        </div>
                        {/* {props.status.includes('Luxury Product') && <span>Sản phẩm cao cấp</span>} */}
                    </div>
                </div>
            );

        default:
    }
};

export default Product;
