import classNames from 'classnames/bind';
import styles from './ContactElement.module.scss';

import images from '~/assets/images';

const cx = classNames.bind(styles);
const ContactElement = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('bg')} style={{ background: `url(${images.contact}) center / cover no-repeat` }}>
                <h2>LIÊN HỆ</h2>
                <h4>Chăm sóc khách hàng là niềm vui của chúng tôi!</h4>
            </div>
            <div className="wide">
                <div
                    className={cx('contact')}
                    // style={{ background: `url(${images.slide[1]}) center / cover no-repeat` }}
                >
                    <div className="row">
                        <div className="col l-6 m-6 c-12">
                            <div className={cx('info1')}>
                                <h2>Cửa hàng 1</h2>
                                <p>Địa chỉ: Vùng tối của mặt trăng, Mặt trăng</p>
                                <span>Số điện thoại: 6699</span>
                                <span>Số fax: 9966</span>
                                <span>Email: mailmeow@meow.meow</span>
                                <span>
                                    Website:
                                    <a href="gomsu.tk"> Gốm nhà Khuê My</a>
                                </span>
                            </div>
                        </div>
                        {/* <img src={images.all} alt="" /> */}
                        <div className="col l-6 m-6 c-12">
                            <div className={cx('info1')}>
                                <h2>Cửa hàng 2</h2>
                                <p>Địa chỉ: Nhà của chị Hằng, Nhưng ở Sao Hoả</p>
                                <span>Số điện thoại: 6699</span>
                                <span>Số fax: 9966</span>
                                <span>Email: mailmeow@meow.meow</span>
                                <span>
                                    Website:
                                    <a href="gomsu.tk"> Gốm nhà Khuê My</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactElement;
