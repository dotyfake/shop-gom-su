import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import styles from './Slide.module.scss';
import images from '~/assets/images/';

const [slideA, slideB] = images.slide;
const cx = classNames.bind(styles);
const arrSlide = [
    { title: 'abc', description: 'xyz', path: slideA },
    { title: 'xyz', description: 'def', path: slideB },
];

const arrSlideRight = [
    {
        name: 'Gốm sứ chất lượng cao',
        description: 'Quy trình sản xuất đạt tiêu chuẩn',
        icon: <FontAwesomeIcon icon={solid('award')} />,
    },
    {
        name: 'Mua hàng(T2-CN)',
        description: 'Mở cửa tất cả các ngày trong tuần!',
        icon: <FontAwesomeIcon icon={solid('store')} />,
    },
    {
        name: 'Miễn phí giao hàng',
        description: 'Dành cho hóa đơn trên 300k và < 4km',
        icon: <FontAwesomeIcon icon={solid('truck-fast')} />,
    },
];

const Slide = () => {
    return (
        <div className={cx('slide', 'wide')}>
            <div className="row">
                <div className={cx('slide-img', 'col l-9 m-12 c-12')}>
                    <Swiper
                        loop={true}
                        slidesPerView={1}
                        spaceBetween={0}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                    >
                        {arrSlide.map((slide, i) => (
                            <SwiperSlide key={i}>
                                <div
                                    className={cx('swiper-slide')}
                                    style={{ background: `url(${slide.path})  no-repeat center/ cover` }}
                                >
                                    {slide.title}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="col l-3 m-12 c-12">
                    {arrSlideRight.map((item, i) => (
                        <div key={i} className={cx('slide-item')}>
                            <div className={cx('slide-icon')}>{item.icon}</div>
                            <div className={cx('slide-info')}>
                                <h3>{item.name}</h3>
                                <span>{item.description}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Slide;
