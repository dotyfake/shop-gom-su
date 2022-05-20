import classNames from 'classnames/bind';
import styles from './BestProducts.module.scss';
import images from '~/assets/images';
import { useGetProducts } from '~/store';
import { Link } from 'react-router-dom';
import { ProductPage } from '~/pages';
import { useContext } from 'react';
import { ProviderContext } from '~/store';

const BestProducts = () => {
    const { setProduct, setWatched } = useContext(ProviderContext);
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
                                >
                                    <Link
                                        className={cx('link')}
                                        to="/productPage"
                                        element={<ProductPage />}
                                        onClick={() => {
                                            setProduct(product);
                                            setWatched(product);
                                        }}
                                    ></Link>
                                </div>
                                <div className={cx('best-info')}>
                                    <Link
                                        to="/productPage"
                                        element={<ProductPage />}
                                        onClick={() => {
                                            setProduct(product);
                                            setWatched(product);
                                        }}
                                    >
                                        <h3>{product.title}</h3>
                                    </Link>
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
