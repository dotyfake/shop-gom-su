import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './Payment.module.scss';
import { Cart } from '~/components';
import { useViewport } from '~/store';
import { ProviderContext } from '~/store';

const schema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập Họ và tên.').max(50, 'Họ và tên có tối đa 50 ký tự.'),
    phone: yup
        .number()
        .typeError('Hãy nhập để nhận hàng (Chỉ nhận ký tự số).')
        .required('Vui lòng nhập số điện thoại.'),
    address: yup.string().required('Vui lòng nhập địa chỉ nhận hàng.').min(16, 'Địa chỉ nhận hàng tối thiểu 16 ký tự.'),
});

const cx = classNames.bind(styles);
const Payment = () => {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 450;
    const [name, setName] = useState('');
    const [text, setText] = useState('');

    const { cart } = useContext(ProviderContext);

    const api = `/.netlify/functions/order`;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onOrderSubmit = (data) => {
        console.log(data);
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                phone: data.phone,
                address: data.address,
                note: data.note,
                cart: cart,
            }),
        });
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
                                <Cart />
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
