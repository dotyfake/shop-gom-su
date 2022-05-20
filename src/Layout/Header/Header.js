import { useState, useEffect } from 'react';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import { Home } from '~/pages';
import styles from './Header.module.scss';
import Search from './components/Search/Search';
import Navbar from './components/Navbar/Navbar';
import images from '~/assets/images/';

const cx = classNames.bind(styles);
const Header = () => {
    const [minimizeHeader, setMinimizeHeader] = useState(false);

    useEffect(() => {
        const handleMinimize = () => {
            setMinimizeHeader(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleMinimize);
    }, []);
    return (
        <div className={cx('wrapper', { minimize: minimizeHeader })}>
            <div className="wide">
                <div className={cx('header')}>
                    <div className={cx('logo')}>
                        <Link to="/" element={<Home />}>
                            <img className={cx('logo-img')} src={images.logo} alt="Logo" />
                        </Link>
                    </div>
                    <div className={cx('center')}>
                        <Navbar />
                        <Search mini={minimizeHeader} />
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('login')}>
                            <button>Đăng nhập</button>
                        </div>
                        <Tippy content="Giỏ hàng" placement="bottom">
                            <div className={cx('cart')}>
                                <button>
                                    <FontAwesomeIcon icon={solid('basket-shopping')} />
                                </button>
                            </div>
                        </Tippy>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
