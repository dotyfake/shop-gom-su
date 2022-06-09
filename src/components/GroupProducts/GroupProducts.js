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

import styles from './GroupProducts.module.scss';
import { Product } from '~/components';

const GroupProducts = ({ typeGroup, name, row, loop, autoplay }) => {
    const prevClick = useRef(0);

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
                    slidesPerView={4}
                    spaceBetween={50}
                    navigation={true}
                    loop={loop}
                    autoplay={autoplay}
                    grid={{
                        rows: row,
                        fill: 'row',
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 50,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                        1024: {
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
