import { useRef } from 'react';
import classNames from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useViewport } from '~/store';

import styles from './GroupProducts.module.scss';
import { Product } from '~/components';

const GroupProducts = ({ typeGroup, name, row, loop, autoplay }) => {
    const prevClick = useRef(0);
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 740;

    const cx = classNames.bind(styles);
    const groupProducts = typeGroup;

    const show = (e) => {
        if (e.nativeEvent.timeStamp - prevClick.current < 1200) {
            toast.error('Bạn đã thao tác quá nhanh!', {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.success('Đã thêm sản phẩm vào giỏ hàng!', {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        prevClick.current = e.nativeEvent.timeStamp;
    };

    return (
        <div className={cx(name, 'wide')}>
            <ToastContainer />
            {groupProducts && (
                <Swiper
                    className={cx('wrapper-group')}
                    slidesPerView={4}
                    spaceBetween={50}
                    navigation={true}
                    loop={loop}
                    autoplay={autoplay}
                    style={{ width: isMobile && '270px' }}
                    grid={{
                        rows: row,
                        fill: 'row',
                    }}
                    breakpoints={{
                        100: {
                            slidesPerView: 1,
                            spaceBetween: 30,
                        },
                        740: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                        1100: {
                            slidesPerView: 4,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Navigation, Grid, Autoplay]}
                >
                    {groupProducts.map((product, i) => (
                        <SwiperSlide key={i}>
                            <Product type="DEFAULT_PRODUCT" props={product} show={show} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default GroupProducts;
