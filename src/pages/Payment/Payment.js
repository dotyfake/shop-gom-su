import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import styles from './Payment.module.scss';
import { Cart } from '~/components';
import { useViewport } from '~/store';
import { ProviderContext } from '~/store';

const schema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập Họ và tên.').max(50, 'Họ và tên có tối đa 50 ký tự.'),
    phone: yup
        .number()
        .typeError('Vui lòng nhập số điện thoại để nhận hàng (Chỉ nhận ký tự số).')
        .required('Vui lòng nhập số điện thoại.'),
    address: yup.string().required('Vui lòng nhập địa chỉ nhận hàng.').min(16, 'Địa chỉ nhận hàng tối thiểu 16 ký tự.'),
});

const cx = classNames.bind(styles);
const Payment = () => {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 450;

    const navigate = useNavigate();

    const { cart, setCart, isAuth } = useContext(ProviderContext);

    const displayName = localStorage.getItem('authName');
    const email = localStorage.getItem('authEmail');
    const id = localStorage.getItem('authId');

    const api = `/.netlify/functions/order`;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onOrderSubmit = (data) => {
        if (isAuth) {
            fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    accountName: displayName,
                    phone: data.phone,
                    address: data.address,
                    note: data.note,
                    cart: cart,
                    email,
                    id,
                }),
            });
            setCart([]);
            localStorage.setItem('cart', '[]');
            navigate('/success');
        } else {
            navigate('/login');
        }
    };
    useEffect(() => {
        document.title = 'Thanh toán - Gốm nhà Khuê My';
    }, []);

    return (
        <div className="wide">
            <h1 className={cx('title')}>Thanh toán</h1>
            <div className={cx('wrapper')}>
                <div className="row">
                    <div className="col l-6 m-6 c-12">
                        <div className={cx('cart')}>
                            <h3 className={cx('title')}>Sản phẩm chọn mua</h3>
                            <div className={cx('list-products')}>
                                <Cart isPayment />
                            </div>
                        </div>
                    </div>
                    <div className="col l-6 m-6 c-12">
                        <div className={cx('info')}>
                            <div className={cx('info-user')}>
                                <h3 className={cx('title')}>Thông tin khách hàng</h3>
                                <form onSubmit={handleSubmit(onOrderSubmit)}>
                                    <div className={cx('name', 'item')} style={{ display: isMobile && 'block' }}>
                                        <label>Họ tên:</label>
                                        <input
                                            style={{
                                                display: isMobile && 'block',
                                                width: isMobile && '100%',
                                            }}
                                            type="text"
                                            placeholder="Họ và tên"
                                            {...register('name')}
                                        />
                                    </div>
                                    {errors.name && <p className="error">{errors.name?.message}</p>}

                                    <div className={cx('phone', 'item')} style={{ display: isMobile && 'block' }}>
                                        <label>Điện thoại:</label>
                                        <input
                                            style={{
                                                display: isMobile && 'block',
                                                width: isMobile && '100%',
                                            }}
                                            type="text"
                                            placeholder="Số điện thoại"
                                            {...register('phone')}
                                        />
                                    </div>
                                    {errors.phone && <p className="error">{errors.phone?.message}</p>}

                                    <div className={cx('address', 'item')} style={{ display: isMobile && 'block' }}>
                                        <label>Địa chỉ:</label>
                                        <input
                                            style={{
                                                display: isMobile && 'block',
                                                width: isMobile && '100%',
                                            }}
                                            placeholder="Địa chỉ nhận hàng"
                                            {...register('address')}
                                        />
                                    </div>
                                    {errors.address && <p className="error">{errors.address?.message}</p>}

                                    <div className={cx('note', 'item')} style={{ display: isMobile && 'block' }}>
                                        <label>Ghi chú:</label>
                                        <textarea
                                            style={{
                                                display: isMobile && 'block',
                                                width: isMobile && '100%',
                                            }}
                                            placeholder="Ghi chú cho cửa hàng"
                                            {...register('note')}
                                        ></textarea>
                                    </div>
                                    <button className={cx('success')} type="submit">
                                        Xác nhận thanh toán
                                    </button>
                                </form>
                            </div>
                            {/* <Form /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
