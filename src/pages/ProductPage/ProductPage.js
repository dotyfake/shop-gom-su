import classNames from 'classnames/bind';
import { useContext, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom } from 'swiper';

import 'swiper/css';
import 'swiper/css/zoom';
import styles from './ProductPage.module.scss';
import { ProviderContext } from '~/store';

const cx = classNames.bind(styles);

const ProductPage = () => {
    const { product, watched } = useContext(ProviderContext);
    const [counter, setCounter] = useState(1);
    return (
        <div className="wrapper">
            <div className="wide">
                <div className="row">
                    <div className="col l-8 m-12 c-12">
                        <Swiper zoom={true} modules={[Zoom]}>
                            <SwiperSlide>
                                <div className="swiper-zoom-container">
                                    <img src={product.image} alt="product" />
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className={cx('col l-4 m-12 c-12', [styles.info])}>
                        <h3>{product.title}</h3>
                        <p className={cx('price')}>Giá: {product.newPrice.toLocaleString()}đ</p>
                        {product.sale > 0 && <p className={cx('old-price')}>{product.price.toLocaleString()}đ</p>}
                        <p className={cx('origin')}>
                            Xuất sứ: <span>{product.origin}</span>
                        </p>
                        <p className={cx('type')}>
                            Loại: <span>{product.type}</span>
                        </p>
                        <p className={cx('count')}>Số lượng:</p>
                        <div className={cx('counter')}>
                            <button
                                className={cx('down')}
                                onClick={() => {
                                    if (counter > 0) {
                                        setCounter(counter - 1);
                                    }
                                }}
                            >
                                -
                            </button>
                            <div className={cx('value')}>{counter}</div>
                            <button className={cx('up')} onClick={() => setCounter(counter + 1)}>
                                +
                            </button>
                        </div>

                        <button className={cx('buy')}>CHỌN MUA</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
