import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';

import styles from './Cart.module.scss';

import images from '~/assets/images/';
import { Product } from '~/components';
import { ProviderContext } from '~/store';
import { useViewport } from '~/store';
import { Link } from 'react-router-dom';
import { Products } from '~/pages';

const cx = classNames.bind(styles);

const Cart = ({ isOrder, cartOrder, isPayment }) => {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;
    const [isEmptyCart, setIsEmptyCart] = useState(false);

    const { cart, products, setCart, setCounterCart } = useContext(ProviderContext);

    const cartProducts = isOrder ? cartOrder : cart;
    const newCart = cartProducts.map((item) => item.newProduct);
    const ResultCartByIds = products.reduce((acc, item) => {
        if (newCart.includes(item.id)) {
            acc = [...acc, item];
        }
        return acc;
    }, []);
    const getCartByIds = ResultCartByIds.map((item, i) => {
        return { newProduct: item, counter: cartProducts[i].counter, price: item.newPrice };
    });

    const handleSumPrice = () => {
        setSumPrice(
            cartProducts.reduce((sum, product) => {
                sum += product.counter * product.price;
                return sum;
            }, 0),
        );
    };

    const [sumPrice, setSumPrice] = useState(() => {
        return getCartByIds.reduce((sum, product) => {
            sum += product.counter * product.newProduct.newPrice;
            return sum;
        }, 0);
    });

    useEffect(handleSumPrice, [cartProducts, sumPrice]);

    useEffect(() => {
        setCounterCart(cart.length);
        setIsEmptyCart(cart.length === 0);
    }, [cartProducts, setCounterCart]);

    return (
        <div className={cx('cart-result')}>
            {isEmptyCart + isOrder < 2 && (
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
                        noPrice
                        height="100px"
                        isPayment={isPayment}
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
                        isOrder={isOrder}
                    />
                ))}
            </div>
            {!isEmptyCart + isOrder > 0 && (
                <div className={cx('cart-footer')}>
                    <div className={cx('wrapper-coupon')}>
                        {!isOrder && (
                            <div>
                                <input className={cx('coupon')} type="text" placeholder="Nhập mã giảm giá" />
                                <button>Áp dụng mã </button>
                            </div>
                        )}
                    </div>
                    <div style={{ margin: '10px auto', fontWeight: '500' }}>
                        <span>Tạm tính:</span> <p>{sumPrice.toLocaleString()} vnđ</p>
                    </div>
                    <div style={{ margin: '10px auto', fontWeight: '500' }}>
                        <span>Giảm giá:</span>
                        <p>- 0 vnđ</p>
                    </div>
                    <div style={{ margin: '10px auto', fontWeight: '600' }}>
                        <span>Tổng tiền đơn hàng:</span> <p>{sumPrice.toLocaleString()} vnđ</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
