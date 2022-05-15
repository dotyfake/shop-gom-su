import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import styles from './Header.module.scss';
import Search from './components/Search/Search';
import Navbar from './components/Navbar/Navbar';
import images from '~/assets/images/';

const cx = classNames.bind(styles);
const Header = () => {
    return (
        <div className={cx('wrapper')}>
            <div className="pc-wide">
                <div className={cx('header')}>
                    <div className={cx('logo')}>
                        <a href="/">
                            <img className={cx('logo-img')} src={images.logo} alt="Logo" />
                        </a>
                    </div>
                    <div className={cx('center')}>
                        <Navbar />
                        <Search />
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('login')}>
                            <button>Đăng nhập</button>
                        </div>
                        <div className={cx('cart')}>
                            <button>
                                <FontAwesomeIcon icon={solid('basket-shopping')} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;