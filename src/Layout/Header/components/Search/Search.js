import React, { useState, useContext, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import TypeWriterEffect from 'react-typewriter-effect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless'; // different import path!
import 'tippy.js/dist/tippy.css';
import { Link, useNavigate } from 'react-router-dom';

import { Product } from '~/components';
import { ProviderContext } from '~/store';
import { Products } from '~/pages';

const Search = (mini) => {
    const [typeWriter, setTypeWriter] = useState(true);
    const [clearSearch, setClearSearch] = useState(false);
    const [visible, setVisible] = useState(false);
    const [inputSearch, setInputSearch] = useState('');
    const searchRef = useRef();
    const { products, searchProducts, setSearchProducts, setProductsState } = useContext(ProviderContext);

    let navigate = useNavigate();
    const cx = classNames.bind(styles);
    const searchResults = searchProducts.slice(0, 4);
    const show = () => {
        setVisible(true);
    };
    const hide = () => {
        setVisible(false);
    };

    return (
        <HeadlessTippy
            visible={visible}
            interactive={true}
            onClickOutside={hide}
            placement="bottom"
            render={(attrs) => (
                <div className={cx('box-result')} tabIndex="-1" {...attrs}>
                    {/* <div className={cx('title')}>Kết quả tìm kiếm</div> */}
                    {searchResults.map((item, i) => (
                        <Product key={i} type="SEARCH_PRODUCT" props={item} />
                    ))}
                    {searchProducts.length > 4 && (
                        <Link
                            to="/products"
                            element={<Products />}
                            onClick={() => {
                                hide();
                                setProductsState(searchProducts);
                            }}
                        >
                            <div className={cx('more')}>Xem thêm</div>
                        </Link>
                    )}
                </div>
            )}
        >
            <div className={cx('wrapper', { hide: mini })}>
                <div className={cx('child')}>
                    <input
                        type="text"
                        ref={searchRef}
                        value={inputSearch}
                        onFocus={(e) => {
                            setTypeWriter(false);
                        }}
                        onBlur={(e) => {
                            e.target.value !== '' ? setTypeWriter(false) : setTypeWriter(true);
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                setProductsState(searchProducts);
                                hide();
                                navigate('/products');
                            }
                        }}
                        onChange={(e) => {
                            setInputSearch(e.target.value);
                            console.log(e.nativeEvent.inputType);
                            if (e.target.value.length > 0) {
                                setClearSearch(true);
                            } else {
                                setClearSearch(false);
                            }

                            if (e.nativeEvent.inputType === 'insertText' && e.target.value.length > 2) {
                                show();
                                const results = products.filter((product) =>
                                    product.title.toUpperCase().includes(e.target.value.toUpperCase()),
                                );
                                setSearchProducts(results);
                            } else if (e.nativeEvent.inputType === 'deleteContentBackward') {
                                hide();
                            }
                        }}
                    />

                    {typeWriter && (
                        <div className={cx(typeWriter && 'type-writer')}>
                            <TypeWriterEffect
                                textStyle={{
                                    fontFamily: 'Red Hat Display',
                                    color: '#07142e',
                                    fontWeight: 500,
                                    fontSize: '1.2em',
                                    opacity: 0.8,
                                }}
                                startDelay={2000}
                                cursorColor="#3F3D56"
                                multiText={[
                                    'Đĩa sâu lòng Lộc Lạc...',
                                    'Bát lục diệp...',
                                    'Bộ trà Hoàng gia...',
                                    'Bát cơm Lạc Hồng...',
                                    'Đĩa súp quốc sắc...',
                                ]}
                                multiTextDelay={1000}
                                typeSpeed={50}
                            />
                        </div>
                    )}
                    <div className={cx('buttons')}>
                        {clearSearch && (
                            <button
                                className={cx('clear')}
                                onClick={(e) => {
                                    hide();
                                    setInputSearch('');
                                    setClearSearch(false);
                                    searchRef.current.focus();
                                }}
                            >
                                <FontAwesomeIcon icon={solid('circle-xmark')} size="lg" />
                            </button>
                        )}
                        <Tippy content="Tìm kiếm" placement="right">
                            <Link to="/Products" element={<Products />}>
                                <button
                                    className={cx('btn-search')}
                                    onClick={() => {
                                        hide();
                                        setProductsState(searchProducts);
                                    }}
                                >
                                    <FontAwesomeIcon icon={solid('magnifying-glass')} size="lg" />
                                </button>
                            </Link>
                        </Tippy>
                    </div>
                </div>
            </div>
        </HeadlessTippy>
    );
};

export default Search;
