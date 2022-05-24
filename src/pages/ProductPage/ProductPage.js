import classNames from 'classnames/bind';
import { useContext, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom, Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import styles from './ProductPage.module.scss';
import { ProviderContext } from '~/store';
import { Product } from '~/components';

const cx = classNames.bind(styles);

const ProductPage = () => {
    const handleSetProduct = () => products.find((item) => item.id === product);
    const handleSetWatched = () =>
        products.reduce((acc, product) => {
            if (watched.includes(product.id)) {
                acc = [...acc, product];
            }
            return acc;
        }, []);

    const { product, watched, products } = useContext(ProviderContext);
    const [newWatched, setNewWatched] = useState(handleSetWatched);
    const [newProduct, setNewProduct] = useState(handleSetProduct);
    const [counter, setCounter] = useState(1);

    useEffect(() => setNewProduct(handleSetProduct), [product]);

    return (
        <div className="wrapper">
            <div className="wide">
                {newProduct && (
                    <div className="row">
                        <div className={cx('col l-8 m-12 c-12')}>
                            <Swiper
                                style={{ height: '450px' }}
                                zoom={true}
                                navigation={true}
                                modules={[Zoom, Navigation]}
                            >
                                <SwiperSlide>
                                    <div className="swiper-zoom-container">
                                        <img src={newProduct.image} alt="product" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={cx('slideImg')}>
                                        <img className={cx('img-thumb')} src={newProduct.imageThumb} alt="product" />
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <div className={cx('col l-4 m-12 c-12', [styles.info])}>
                            <h3>{newProduct.title}</h3>
                            <p className={cx('price')}>Giá: {newProduct.newPrice.toLocaleString()}đ</p>
                            {newProduct.sale > 0 && (
                                <p className={cx('old-price')}>{newProduct.price.toLocaleString()}đ</p>
                            )}
                            <p className={cx('origin')}>
                                Xuất sứ: <span>{newProduct.origin}</span>
                            </p>
                            <p className={cx('type')}>
                                Loại: <span>{newProduct.type}</span>
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
                        <div className={cx('col l-12', [styles.infoProduct])}>
                            <h3>Thông tin về sản phẩm</h3>
                            <p>{newProduct.desc}</p>
                        </div>
                    </div>
                )}
                <div className="row">
                    {newWatched.length > 0 && (
                        <div className={cx('watched')}>
                            <h2>Sản phẩm đã xem gần đây</h2>
                            <Swiper
                                // style={{ width: '90%' }}
                                navigation={true}
                                slidesPerView={4}
                                spaceBetween={50}
                                modules={[Navigation]}
                            >
                                {newWatched
                                    .sort((a, b) => b - a)
                                    .map((item, i) => (
                                        <SwiperSlide key={i}>
                                            <Product type="WATCHED_PRODUCT" props={item} />
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
