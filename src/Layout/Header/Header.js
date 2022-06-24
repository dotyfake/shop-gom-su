import { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { Home, Products } from '~/pages';
import styles from './Header.module.scss';
import Search from './components/Search/Search';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import images from '~/assets/images/';
import { Product, Modal, Login } from '~/components';
import { ProviderContext } from '~/store';
import { useViewport } from '~/store';

const cx = classNames.bind(styles);

const Header = () => {
    const viewPort = useViewport();
    const isTablet = viewPort.width <= 1100;
    const isMobile = viewPort.width <= 740;
    const [minimizeHeader, setMinimizeHeader] = useState(false);
    const [goTop, setGoTop] = useState(false);
    const [isEmptyCart, setIsEmptyCart] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const { cart, products, setCart, counterCart, setCounterCart, isAuth } = useContext(ProviderContext);
    const closeModal = useRef();

    const navigate = useNavigate();

    const newCart = cart.map((item) => item.newProduct);
    const ResultCartByIds = products.reduce((acc, item) => {
        if (newCart.includes(item.id)) {
            acc = [...acc, item];
        }
        return acc;
    }, []);
    const getCartByIds = ResultCartByIds.map((item, i) => {
        return { newProduct: item, counter: cart[i].counter, price: item.newPrice };
    });

    const handleSumPrice = () => {
        setSumPrice(
            cart.reduce((sum, product) => {
                sum += product.counter * product.price;
                return sum;
            }, 0),
        );
    };

    const [sumPrice, setSumPrice] = useState(() => {
        return getCartByIds.reduce((sum, product) => {
            sum += product.counter * product.newProduct.newPrice;
            console.log(product.counter, product.newProduct.newPrice, sum);
            return sum;
        }, 0);
    });

    useEffect(handleSumPrice, [cart, sumPrice]);

    useEffect(() => {
        window.addEventListener('scroll', () => setGoTop(window.scrollY > 300));
        return () => {
            window.removeEventListener('scroll', () => setGoTop(window.scrollY > 300));
        };
    });

    useEffect(() => {
        setCounterCart(cart.length);
        setIsEmptyCart(cart.length === 0);
    }, [cart, setCounterCart]);

    useEffect(() => {
        const handleMinimize = () => {
            setMinimizeHeader(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleMinimize);
    }, []);

    return (
        <div className={cx({ wrapper: !minimizeHeader }, { minimize: isMobile || minimizeHeader })}>
            <div className="wide">
                <div className={cx('header')}>
                    {isTablet && <Sidebar />}
                    <div className={cx('logo')}>
                        <Link to="/" element={<Home />}>
                            <img className={cx('logo-img', { transformX: isTablet })} src={images.logo} alt="Logo" />
                        </Link>
                    </div>
                    {!isTablet && (
                        <div className={cx('center')}>
                            <Navbar />
                            <Search mini={minimizeHeader} />
                        </div>
                    )}
                    <div className={cx('right')}>
                        <div className={isTablet || minimizeHeader ? 'hide' : 'login'}>
                            <Login />
                        </div>
                        <div
                            className={cx('cart')}
                            onClick={() => {
                                setShowModal(true);
                            }}
                        >
                            <button className={cx('cart-icon')}>
                                {!isEmptyCart && <span>{counterCart}</span>}
                                <FontAwesomeIcon icon={solid('basket-shopping')} />
                            </button>
                        </div>

                        {showModal && (
                            <Modal
                                width={isMobile ? '100vw' : '400px'}
                                right
                                setShowModal={setShowModal}
                                ref={closeModal}
                            >
                                <div className={cx('cart-result')}>
                                    <div className={cx('title')}>Gỏi hàng</div>
                                    {isEmptyCart && (
                                        <div className={cx('empty-cart')}>
                                            Giỏ hàng trống
                                            <p>
                                                Để tiếp tục mua sắm xin hãy ấn vào{' '}
                                                <Link to="/products" element={<Products />}>
                                                    đây
                                                </Link>
                                                .
                                            </p>
                                            <img src={images.emptyCart} alt="Empty cart" />
                                        </div>
                                    )}
                                    <div className={cx('list-product')}>
                                        {getCartByIds.map((item, i) => (
                                            <Product
                                                index={i}
                                                key={i}
                                                type="CART-PRODUCT"
                                                props={item.newProduct}
                                                counter={item.counter}
                                                event={() => {
                                                    const b = getCartByIds.filter((product) => product !== item);
                                                    const c = b.map((item) => {
                                                        return {
                                                            newProduct: item.newProduct.id,
                                                            counter: item.counter,
                                                            price: item.price,
                                                        };
                                                    });
                                                    console.log(c);
                                                    localStorage.setItem('cart', JSON.stringify(c));
                                                    setCart(c);
                                                }}
                                                setSumPrice={handleSumPrice}
                                            />
                                        ))}
                                    </div>

                                    <div className={cx('cart-footer')}>
                                        {!isEmptyCart && (
                                            <div
                                                style={{
                                                    margin: '10px auto',
                                                    fontWeight: '600',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                Tổng tiền đơn hàng: {sumPrice.toLocaleString()} vnđ
                                            </div>
                                        )}
                                        {!isEmptyCart && (
                                            <button
                                                onClick={() => {
                                                    if (isAuth) {
                                                        setTimeout(() => setShowModal(false), 200);
                                                        closeModal.current();
                                                        window.scroll(0, 0);
                                                        navigate('/payment');
                                                    } else {
                                                        closeModal.current();
                                                        window.scroll(0, 0);
                                                        navigate('/login');
                                                    }
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={solid('cart-shopping')}
                                                    style={{ margin: '0 6px', fontSize: '2.2rem' }}
                                                />
                                                Thanh toán
                                            </button>
                                        )}
                                        <button
                                            onClick={() => {
                                                setTimeout(() => setShowModal(false), 200);
                                                closeModal.current();
                                            }}
                                            style={{ backgroundColor: '#803242' }}
                                        >
                                            <FontAwesomeIcon
                                                icon={solid('close')}
                                                style={{ margin: '0 6px', fontSize: '2.2rem' }}
                                            />
                                            Đóng
                                        </button>
                                    </div>
                                </div>
                            </Modal>
                        )}
                    </div>
                </div>
                {goTop && (
                    <button className={cx('goToTop')} onClick={() => window.scroll(0, 0)}>
                        <FontAwesomeIcon icon={solid('angles-up')} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;
