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

    const goToTop = () => {
        window.scroll(0, 0);
    };

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
                                            setProduct(() => {
                                                localStorage.setItem('product', JSON.stringify(product.id));
                                                return product.id;
                                            });
                                            setWatched((prev) => {
                                                const newWatched = [...new Set([...prev, product.id])];
                                                localStorage.setItem('watched', JSON.stringify(newWatched));
                                                return newWatched;
                                            });
                                            goToTop();
                                        }}
                                    ></Link>
                                </div>
                                <div className={cx('best-info')}>
                                    <Link
                                        to="/productPage"
                                        element={<ProductPage />}
                                        onClick={() => {
                                            setProduct(() => {
                                                localStorage.setItem('product', JSON.stringify(product.id));
                                                return product.id;
                                            });
                                            setWatched((prev) => {
                                                const newWatched = [...new Set([...prev, product.id])];
                                                localStorage.setItem('watched', JSON.stringify(newWatched));
                                                return newWatched;
                                            });
                                            goToTop();
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
