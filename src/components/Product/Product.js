import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import images from '~/assets/images/';
import { Link, useNavigate } from 'react-router-dom';
import { ProductPage } from '~/pages';
import { useContext, useRef, useState } from 'react';
import { ProviderContext } from '~/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useViewport } from '~/store';

const cx = classNames.bind(styles);

const Product = ({ type, props, show, hide, event, counter, index, setSumPrice, isPayment, closeSidebar }) => {
    const { setProduct, setWatched, setCart, cart } = useContext(ProviderContext);
    const [currentCounter, setCurrentCounter] = useState(counter);
    const prevClick = useRef(0);
    const viewPort = useViewport();
    const isTablet = viewPort.width <= 740;
    const isMobile = viewPort.width <= 510;

    let navigate = useNavigate();
    const [currentSumPrice, setCurrentSumPrice] = useState(() => props.newPrice * counter);
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
                    {<div></div>}
                    <div
                        className={cx('wrapper')}
                        style={{
                            background: `url(${images.productBg}) no-repeat center/ contain`,
                        }}
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
                                        // top: isMobile && '0',
                                    }}
                                >
                                    {/* <img src={props.imageThumb} alt="" width="100%" /> */}
                                </div>
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
                                    <div
                                        onClick={(e) => {
                                            console.log('abc');
                                            if (e.nativeEvent.timeStamp - prevClick.current > 1200) {
                                                const cartOnlyId = cart.map((item) => item.newProduct);
                                                if (!cartOnlyId.includes(props.id)) {
                                                    setCart((prev) => {
                                                        const result = [
                                                            ...prev,
                                                            { counter: 1, newProduct: props.id, price: props.newPrice },
                                                        ];
                                                        localStorage.setItem('cart', JSON.stringify(result));
                                                        return result;
                                                    });
                                                }
                                            }
                                            prevClick.current = e.nativeEvent.timeStamp;
                                        }}
                                    >
                                        <button className={cx('buy')} onClick={show}>
                                            MUA NGAY
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {props.status.includes('Luxury Product') && !isTablet && <span>Sản phẩm cao cấp</span>}
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
                        closeSidebar();
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
                    <div className={cx('info')} style={{ height: isMobile ? '200px' : '250px' }}>
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
        case 'CART-PRODUCT':
            return (
                <div className={cx('product-search')}>
                    <div
                        className={cx('search-img')}
                        style={{
                            background: `url(${props.imageThumb}) no-repeat center/ contain`,
                            paddingLeft: '35%',
                        }}
                        onClick={() => {
                            navigate('/productPage');
                        }}
                    ></div>
                    <div className={cx('search-info')}>
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
                            <div className={cx('search-name')}>{props.title}</div>
                        </Link>
                        <div className={cx('search-price')}>{props.newPrice.toLocaleString()} vnđ</div>
                        <div className={cx('counter')}>
                            Số lượng:
                            <button
                                className={cx('down')}
                                onClick={() => {
                                    if (counter > 0) {
                                        setCart((prev) => {
                                            let currentProduct = prev[index];
                                            if (currentProduct.counter > 1) {
                                                currentProduct.counter -= 1;
                                            }
                                            setCurrentCounter(currentProduct.counter);
                                            setCurrentSumPrice(currentProduct.counter * props.newPrice);
                                            setSumPrice();
                                            prev.splice(index, 1, currentProduct);
                                            return prev;
                                        });
                                    }
                                }}
                            >
                                <span>-</span>
                            </button>
                            <div className={cx('value')}>{currentCounter.toLocaleString()}</div>
                            <button
                                className={cx('up')}
                                onClick={() => {
                                    const abc = cart.reduce((acc, item) => {
                                        acc += item.newProduct.newPrice * item.counter;
                                        return acc;
                                    }, 0);

                                    setCart((prev) => {
                                        let currentProduct = prev[index];
                                        currentProduct.counter += 1;
                                        prev.splice(index, 1, currentProduct);
                                        setCurrentCounter(currentProduct.counter);
                                        setCurrentSumPrice(currentProduct.counter * props.newPrice);
                                        setSumPrice();
                                        localStorage.setItem('cart', JSON.stringify(prev));
                                        return prev;
                                    });
                                }}
                            >
                                <span>+</span>
                            </button>
                        </div>
                        <span style={{ fontWeight: '500', color: '#444' }}>
                            Thành tiền: {currentSumPrice.toLocaleString()} vnđ
                        </span>
                    </div>
                    {!isPayment && (
                        <button
                            className={cx('delete')}
                            onClick={() => {
                                setCart();
                                event();
                            }}
                        >
                            <FontAwesomeIcon className={cx('trash')} icon={solid('trash')} />
                        </button>
                    )}
                    {isPayment && (
                        <button className={cx('delete-product')} onClick={event}>
                            <FontAwesomeIcon className={cx('trash')} icon={solid('trash')} />
                        </button>
                    )}
                </div>
            );

        default:
    }
};

export default Product;
