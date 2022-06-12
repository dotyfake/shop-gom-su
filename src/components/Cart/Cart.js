import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';

import styles from './Cart.module.scss';

import images from '~/assets/images/';
import { Product } from '~/components';
import { ProviderContext } from '~/store';
import { useViewport } from '~/store';

const cx = classNames.bind(styles);

const Cart = () => {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;
    const [isEmptyCart, setIsEmptyCart] = useState(false);

    const { cart, products, setCart, setCounterCart } = useContext(ProviderContext);

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
        setCounterCart(cart.length);
        setIsEmptyCart(cart.length === 0);
    }, [cart, setCounterCart]);

    return (
        <div className={cx('cart-result')}>
            {isEmptyCart && (
                <div className={cx('empty-cart')}>
                    Giỏ hàng trống
                    <img src={images.emptyCart} alt="Empty cart" />
                </div>
            )}
            <div className={cx('list-product')}>
                {getCartByIds.map((item, i) => (
                    <Product
                        noPrice
                        height="100px"
                        isPayment
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
            {!isEmptyCart && (
                <div className={cx('cart-footer')}>
                    <div className={cx('item')}>
                        <input className={cx('coupon')} type="text" placeholder="Nhập mã giảm giá" />
                        <button>Áp dụng mã </button>
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