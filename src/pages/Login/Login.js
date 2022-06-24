import { useState, useContext } from 'react';
import { Button } from '~/components';
import { signInWithPopup } from 'firebase/auth';
import { auth, providerGoogle, providerFacebook } from '~/Firebase/firebase-config';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Home } from '~/pages';
import images from '~/assets/images/';
import { ProviderContext } from '~/store';

const cx = classNames.bind(styles);

const Login = () => {
    const { isAuth, setIsAuth } = useContext(ProviderContext);
    const navigate = useNavigate();
    const signInWithGoogle = () => {
        signInWithPopup(auth, providerGoogle)
            .then((result) => {
                setIsAuth(true);
                navigate('/');
                localStorage.setItem('isAuth', true);
                localStorage.setItem('authName', result.user.displayName);
                localStorage.setItem('authEmail', result.user.email);
                localStorage.setItem('authPhoto', result.user.photoURL);
                localStorage.setItem('authId', result.user.uid);
            })
            .catch((error) => console.log(error));
    };
    const signInWithFacebook = () => {
        signInWithPopup(auth, providerFacebook)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <Link to="/" element={<Home />}>
                    <img className={cx('logo-img')} src={images.logo} alt="Logo" />
                </Link>
            </div>
            <p>Hãy đăng nhập để bắt đầu đặt hàng!</p>
            <h1>Đăng nhập</h1>
            <Button onClick={signInWithGoogle}>
                <img src="https://accounts.fullstack.edu.vn/assets/images/signin/google-18px.svg" alt="" />
                <span>Đăng nhập bằng Google</span>
            </Button>
            <Button onClick={signInWithFacebook}>
                <img src="https://accounts.fullstack.edu.vn/assets/images/signin/facebook-18px.svg" alt="" />
                <span>Đăng nhập bằng Facebook</span>
            </Button>
        </div>
    );
};

export default Login;
