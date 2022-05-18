import React from 'react';
import classNames from 'classnames/bind';
import styles from './BestProducts.module.scss';
import images from '~/assets/images';
import { useGetProducts } from '~/store';

const BestProducts = () => {
    const bestProducts = useGetProducts('Best');
    const fixProducts = bestProducts && bestProducts.slice(0, 6);
    const cx = classNames.bind(styles);

    return (
        <div className="wide">
            <div className={cx('container1')}>
                {bestProducts &&
                    fixProducts.map((product, i) => (
                        <div key={i} className={cx(`product-${i}`, 'product')}>
                            <div className={cx('best-products')}>
                                <div
                                    className={cx('best-img')}
                                    style={{
                                        background: `url(${product.imageThumb}) no-repeat center/ contain`,
                                        paddingLeft: '60%',
                                    }}
                                ></div>
                                <div className={cx('best-info')}>
                                    <h3>{product.title}</h3>
                                    <p>{product.newPrice.toLocaleString()} vnđ</p>
                                    <p>{product.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                <div className={cx('mid')} style={{ background: `url(${images.center}) center / contain` }}></div>
            </div>
        </div>
    );
};

export default BestProducts;
