import { useState, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless'; // different import path!
import 'tippy.js/dist/tippy.css';
import { ProviderContext } from '~/store';

const cx = classNames.bind(styles);

const Login = ({ closeSidebar, noOption }) => {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const auth = JSON.parse(localStorage.getItem('isAuth'));
    const displayName = localStorage.getItem('authName');
    const photo = localStorage.getItem('authPhoto');

    const { signUserOut } = useContext(ProviderContext);

    const hide = () => {
        setVisible(false);
    };

    return (
        <div className={cx('wrapper')}>
            {auth ? (
                <HeadlessTippy
                    visible={visible}
                    interactive={true}
                    onClickOutside={hide}
                    placement="bottom-start"
                    render={(attrs) => (
                        <div className={cx('options')} tabIndex="-1" {...attrs}>
                            <ul>
                                <li
                                    onClick={() => {
                                        navigate('/order');
                                    }}
                                >
                                    Đơn hàng
                                </li>
                                <li
                                    onClick={() => {
                                        signUserOut();
                                    }}
                                >
                                    Đăng xuất
                                </li>
                            </ul>
                        </div>
                    )}
                >
                    <div
                        className={cx('user')}
                        onClick={() => {
                            if (!noOption) {
                                setVisible(!visible);
                            }
                        }}
                    >
                        <img src={photo} alt="" />
                        <span>{displayName}</span>
                    </div>
                </HeadlessTippy>
            ) : (
                <button
                    onClick={() => {
                        navigate('/login');
                        closeSidebar && closeSidebar();
                    }}
                >
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M416 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c17.67 0 32 14.33 32 32v256c0 17.67-14.33 32-32 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c53.02 0 96-42.98 96-96V128C512 74.98 469 32 416 32zM342.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L242.8 224H32C14.31 224 0 238.3 0 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C355.1 266.1 355.1 245.9 342.6 233.4z" />
                </svg> */}
                    Đăng nhập
                </button>
            )}
        </div>
    );
};

export default Login;
