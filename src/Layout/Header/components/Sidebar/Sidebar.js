import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useContext } from 'react';
import { ProviderContext } from '~/store';
import { Link } from 'react-router-dom';

import { Modal, Title, Button, Login } from '~/components';
import { Home, Products, News, Contact, Order } from '~/pages';
import Search from '~/layout/Header/components/Search/Search';
import { useViewport } from '~/store';
import images from '~/assets/images';

import styles from './Sidebar.module.scss';
const cx = classNames.bind(styles);

const Sidebar = () => {
    const { products, setProductsState, signUserOut, isAuth } = useContext(ProviderContext);
    const [showModal, setShowModal] = useState(false);
    const refHandleShow = useRef();
    const viewPort = useViewport();
    const isTablet = viewPort.width <= 1100;
    const navbar = [
        {
            name: 'Trang chủ',
            icon: <FontAwesomeIcon icon={solid('house')} />,
            path: '/',
            element: <Home />,
            auth: true,
        },
        {
            name: 'Đơn hàng',
            icon: <FontAwesomeIcon icon={solid('table-list')} />,
            path: '/order',
            element: <Order />,
            auth: isAuth,
        },
        {
            name: 'Sản phẩm',
            icon: <FontAwesomeIcon icon={solid('box')} />,
            path: '/products',
            element: <Products />,
            auth: true,
        },
        {
            name: 'Tin mới',
            icon: <FontAwesomeIcon icon={solid('newspaper')} />,
            path: '/news',
            element: <News />,
            auth: true,
        },
        {
            name: 'Liên hệ',
            icon: <FontAwesomeIcon icon={solid('address-book')} />,
            path: '/contact',
            element: <Contact />,
            auth: true,
        },
    ];

    const goToTop = () => {
        window.scroll(0, 0);
    };
    const closeSidebar = () => {
        setTimeout(() => setShowModal(false), 200);
        refHandleShow.current();
    };
    return (
        <div
            className={cx('wrapper')}
            onClick={() => {
                setShowModal(true);
            }}
        >
            <FontAwesomeIcon icon={solid('bars')} />
            {showModal && (
                <Modal width={'350px'} left setShowModal={setShowModal} ref={refHandleShow}>
                    <div
                        className={cx('logo')}
                        onClick={() => {
                            setTimeout(() => setShowModal(false), 200);
                            refHandleShow.current();
                        }}
                    >
                        <Link to="/" element={<Home />}>
                            <img className={cx('logo-img')} src={images.logo} alt="Logo" />
                        </Link>
                    </div>
                    <Login closeSidebar={closeSidebar} noOption />
                    <Search width="350px" closeSidebar={closeSidebar} />
                    <ul>
                        {navbar.map(
                            (item, i) =>
                                item.auth && (
                                    <li key={i} className={cx('item')}>
                                        <Title
                                            primary
                                            large
                                            leftIcon={item.icon}
                                            to={item.path}
                                            element={item.element}
                                            onClick={() => {
                                                setTimeout(() => setShowModal(false), 200);
                                                refHandleShow.current();
                                                if (item.name === 'Sản phẩm') {
                                                    setProductsState(products);
                                                } else if (item.name === 'Gốm sứ cao cấp') {
                                                    setProductsState(
                                                        products.filter((item) =>
                                                            item.status.includes('Luxury Product'),
                                                        ),
                                                    );
                                                }
                                                goToTop();
                                            }}
                                        >
                                            {item.name}
                                        </Title>
                                    </li>
                                ),
                        )}
                    </ul>
                    <div className={cx('footer')}>
                        <Button
                            className={cx('close')}
                            onClick={() => {
                                setTimeout(() => setShowModal(false), 200);
                                refHandleShow.current();
                            }}
                            red
                            leftIcon={<FontAwesomeIcon icon={solid('close')} />}
                        >
                            Đóng
                        </Button>
                        {isAuth && (
                            <Button
                                className={cx('sign-out')}
                                onClick={() => {
                                    signUserOut();
                                }}
                                primary
                                leftIcon={<FontAwesomeIcon icon={solid('right-from-bracket')} />}
                            >
                                Đăng xuất
                            </Button>
                        )}
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Sidebar;
