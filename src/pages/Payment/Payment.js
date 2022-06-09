import classNames from 'classnames/bind';

import styles from './Payment.module.scss';
import { Cart } from '~/components';

const cx = classNames.bind(styles);
const Payment = () => {
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
                                <div className={cx('name', 'item')}>
                                    <label>Họ tên:</label>
                                    <input type="text" placeholder="Họ và tên" />
                                </div>
                                <div className={cx('phone', 'item')}>
                                    <label>Điện thoại:</label>
                                    <input type="text" placeholder="Số điện thoại" />
                                </div>
                                <div className={cx('address', 'item')}>
                                    <label>Địa chỉ:</label>
                                    <input type="text" placeholder="Địa chỉ nhận hàng" />
                                </div>
                                <div className={cx('note', 'item')}>
                                    <label>Ghi chú:</label>
                                    <textarea placeholder="Ghi chú cho cửa hàng"></textarea>
                                </div>
                            </div>
                            <button className={cx('success')}>Xác nhận thanh toán</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
