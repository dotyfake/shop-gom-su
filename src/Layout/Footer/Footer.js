import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <div
            className={cx('wrapper')}
            style={{
                background: `linear-gradient(rgba(231, 242, 251,.9), rgba(231, 242, 251,.8)),url(${images.slide[0]}) no-repeat center/ cover`,
            }}
        >
            <div className="row">
                <div className="col l-3 m-12 c-12">
                    <div className={cx('f1')}>
                        <iframe
                            title="page"
                            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FG%25E1%25BB%2591m-nh%25C3%25A0-Khu%25C3%25AA-My-106591728105268&tabs&width=260&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=5147914965295677"
                            width="260"
                            height="110"
                            style={{ border: 'none', overflow: 'hidden' }}
                            scrolling="no"
                            frameBorder="0"
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        ></iframe>
                        <iframe
                            title="like"
                            src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FG%25E1%25BB%2591m-nh%25C3%25A0-Khu%25C3%25AA-My-106591728105268&width=260&layout=standard&action=like&size=small&share=true&height=35&appId=5147914965295677"
                            width="260"
                            height="35"
                            style={{ border: 'none', overflow: 'hidden' }}
                            scrolling="no"
                            frameBorder="0"
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        ></iframe>
                    </div>
                </div>
                <div className="col l-3 m-12 c-12">
                    <p style={{ margin: '0' }}>Địa chỉ: Vùng tối của mặt trăng, Mặt trăng</p>
                    <p>Số điện thoại: 7749</p>
                    <p>Số fax: 4953</p>
                    <p>Email: mailmeow@meow.meow</p>
                    <p>
                        Website:
                        <a href="gomsu.tk"> Gốm nhà Khuê My</a>
                    </p>
                </div>
                <div className="col l-3 m-12 c-12">
                    <ul style={{ margin: '0' }}>
                        <li>
                            <strong>Gốm sứ chất lượng cao</strong>
                            <p>Quy trình sản xuất đạt tiêu chuẩn</p>
                        </li>
                        <li>
                            <strong>Mua hàng(T2-CN)</strong>
                            <p>Mở cửa tất cả các ngày trong tuần!</p>
                        </li>
                        <li>
                            <strong>Miễn phí giao hàng</strong>
                        </li>
                    </ul>
                </div>
                <div className="col l-3 m-12 c-12">
                    <div className={cx('f4')}>
                        <img src={images.logo} alt="logo" className={cx('logo')} />
                    </div>
                </div>
            </div>
            <p className={cx('copyright')}>{`Copyright 2022 © Doty - Design & code by Doty`}</p>
        </div>
    );
};

export default Footer;
