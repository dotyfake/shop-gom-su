import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ListOrder.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Cart } from '~/components';

const cx = classNames.bind(styles);

const ListOrder = ({ data }) => {
    const [show, setShow] = useState(false);
    let statusOrder;
    switch (data.status) {
        case 'Pending':
            statusOrder = { content: 'Đang xử lý', color: '#807832' };
            break;
        case 'Delivery':
            statusOrder = { content: 'Đang vận chuyển', color: '#325080' };
            break;
        case 'Success':
            statusOrder = { content: 'Đã nhận hàng', color: '#4BB543' };
            break;
        default:
            break;
    }
    return (
        <div className={cx('order-product')}>
            <div
                className={cx('info')}
                onClick={() => {
                    setShow(!show);
                }}
            >
                <div className={cx('left')}>
                    <div className={cx('title')}>{data.title}</div>
                    Ngày đặt hàng: {data.date}
                </div>
                <div className={cx('right')}>
                    <div className={cx('status')}>
                        Tình trạng: <span style={{ color: statusOrder.color }}> {statusOrder.content}</span>
                    </div>
                    <div className={cx('show')}>
                        {!show && <FontAwesomeIcon icon={solid('angle-down')} size="lg" />}
                        {show && <FontAwesomeIcon icon={solid('angle-up')} size="lg" />}
                    </div>
                </div>
            </div>
            {show && (
                <div className={cx('list-products')}>
                    <h2>Thông tin đơn hàng</h2>
                    <ul>
                        <li>Họ và tên: {data.name}</li>
                        <li>Số điện thoại: {data.phone}</li>
                        <li>Địa chỉ: {data.address}</li>
                        {data.note.length > 0 && <li>Ghi chú: {data.note}</li>}
                    </ul>
                    <h3>Danh sản phẩm trong đơn hàng:</h3>
                    <Cart isOrder cartOrder={data.arrayCart} />
                </div>
            )}
        </div>
    );
};

export default ListOrder;
