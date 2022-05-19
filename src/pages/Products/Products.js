import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { ProviderContext } from '~/store';

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

    useEffect(loadProducts, [products]);

    return (
        <div className={cx('wrapper', { active: true })}>
            <div className="wide">
                <div className="row">
                    <div className="col l-2">
                        <aside className={cx('side-bar')}>
                            <h3>Loại sản phẩm</h3>
                            <div className="row.no-gutters">
                                <div className="col l-12">
                                    {optionsProducts.map((product, i) => (
                                        <div
                                            key={i}
                                            className={cx('options-item', { active: optionsType === product.name })}
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
                                </div>
                            </div>
                        </aside>
                    </div>
                    <div className={cx('col l-10', 'content')}>
                        <div className="row">
                            <div className={cx('col l-12', [styles.tags])}>
                                <h2>Sản phẩm {!!select && ` - ` + select}</h2>
                                <div className={cx('filter')}>
                                    Lọc sản phẩm theo
                                    <select
                                        value={select}
                                        onChange={(e) => {
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
                            <div className={cx('col l-12', [styles.products])}>
                                <div className="row">
                                    {productsState.length > 0 &&
                                        productsState.map((product, i) => (
                                            <div key={i} className="col l-3 m-6 c-6">
                                                <Product type="DEFAULT_PRODUCT" props={product} />
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
