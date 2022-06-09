import classNames from 'classnames/bind';
import { useContext, useEffect, useState, useRef } from 'react';
import { ProviderContext } from '~/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Product } from '~/components';
import images from '~/assets/images';
import styles from './Products.module.scss';

const cx = classNames.bind(styles);

const optionsProducts = [
    { name: 'Tất Cả', image: images.all },
    { name: 'Bình hoa', image: images.binh },
    { name: 'Tách trà', image: images.chen },
    { name: 'Bát', image: images.bat },
    { name: 'Đĩa', image: images.dia },
    { name: 'Âu', image: images.au },
    { name: 'Bộ trà', image: images.am },
];

const Products = () => {
    const { products, productsState, setProductsState } = useContext(ProviderContext);
    const [optionsType, setOptionsType] = useState('');
    const [select, setSelected] = useState('');
    const [loadPage, setLoadPage] = useState(20);
    const [endProducts, setEndProducts] = useState(false);
    const productsRef = useRef();
    const { setCart } = useContext(ProviderContext);
    const prevClick = useRef(0);

    const newProductsState = productsState.slice(0, loadPage);
    const loadProducts = () => {
        setProductsState(productsState);
    };
    const loadAllProducts = () => {
        setProductsState(products);
    };

    const loadSelect = (e) => {
        switch (e) {
            case 'Tất cả sản phẩm':
                return loadAllProducts();
            case 'Giá: Thấp đến Cao':
                return setProductsState(products.sort((a, b) => a.price - b.price));
            case 'Giá: Cao đến thấp':
                return setProductsState(products.sort((a, b) => b.price - a.price));
            case 'Bán chạy':
                return setProductsState(products.filter((item) => item.status.includes('Hot')));
            case 'Mới nhất':
                return setProductsState(products.filter((item) => item.status.includes('New')));
            case 'Gốm sứ cao cấp':
                return setProductsState(products.filter((item) => item.status.includes('Luxury Product')));
            case 'Đang khuyến mãi':
                return setProductsState(products.filter((item) => item.sale > 0));
            default:
                break;
        }
    };
    loadSelect();

    const filterType = (products, type) => {
        return products.filter((item) => item.type === type);
    };

    const optionType = (name) => {
        if (name !== 'Tất Cả') {
            setOptionsType(name);
            setProductsState(filterType(products, name));
        } else {
            setOptionsType(name);
            loadAllProducts();
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(loadProducts, [products]);

    useEffect(() => {
        const trackScrolling = () => {
            if (productsRef.current.getBoundingClientRect().bottom <= window.innerHeight) {
                setLoadPage((prev) => prev + 4);
                loadPage >= newProductsState.length ? setEndProducts(true) : setEndProducts(false);
            }
        };
        window.addEventListener('scroll', trackScrolling);
        return () => window.removeEventListener('scroll', trackScrolling);
    });

    //Toast and add product to cart
    const show = (e) => {
        if (e.nativeEvent.timeStamp - prevClick.current < 1200) {
            toast.error('Bạn đã thao tác quá nhanh!', {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.success('Đã thêm sản phẩm vào giỏ hàng!', {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        prevClick.current = e.nativeEvent.timeStamp;
    };

    return (
        <div className={cx('wrapper', { active: true })}>
            <ToastContainer />
            <div className="wide">
                <div className="row">
                    <div className={cx('col l-12', 'content')}>
                        <div className="row">
                            <div className={cx('col l-12', [styles.tags])}>
                                <aside className={cx('side-bar')}>
                                    {/* <h3>Loại sản phẩm</h3> */}
                                    {optionsProducts.map((product, i) => (
                                        <div
                                            key={i}
                                            className={cx('options-item', {
                                                active: optionsType === product.name,
                                            })}
                                            onClick={() => optionType(product.name)}
                                        >
                                            <div
                                                style={{
                                                    background: `url(${product.image}) center / contain no-repeat`,
                                                    paddingTop: '70%',
                                                }}
                                            ></div>
                                            <h4>{product.name}</h4>
                                        </div>
                                    ))}
                                </aside>
                                <div className={cx('select-filter')}>
                                    <h4>Sản phẩm {!!select && ` - ` + select}</h4>
                                    <div className={cx('filter')}>
                                        Lọc sản phẩm theo
                                        <select
                                            className={cx('select-box')}
                                            value={select}
                                            onChange={(e) => {
                                                setOptionsType('');
                                                setSelected(e.target.value);
                                                loadSelect(e.target.value);
                                            }}
                                        >
                                            <option value="Tất cả sản phẩm">Tất cả sản phẩm</option>
                                            <option value="Giá: Thấp đến Cao">Giá: Thấp đến Cao </option>
                                            <option value="Giá: Cao đến thấp">Giá: Cao đến thấp</option>
                                            <option value="Bán chạy">Bán chạy</option>
                                            <option value="Mới nhất">Mới nhất</option>
                                            <option value="Đang khuyến mãi">Đang khuyến mãi</option>
                                            <option value="Gốm sứ cao cấp">Gốm sứ cao cấp</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('col l-12', [styles.products])} ref={productsRef}>
                                <div className="row">
                                    {productsState.length > 0 &&
                                        newProductsState.map((product, i) => (
                                            <div key={i} className="col l-3 m-6 c-6">
                                                <Product type="DEFAULT_PRODUCT" props={product} show={show} />
                                            </div>
                                        ))}
                                </div>
                                {endProducts && <h4 className={cx('end')}>Không còn sản phẩm nào</h4>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
