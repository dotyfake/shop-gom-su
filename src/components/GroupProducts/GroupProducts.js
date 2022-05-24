import { useRef } from 'react';
import classNames from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid } from 'swiper';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './GroupProducts.module.scss';
import { Product } from '~/components';

const GroupProducts = ({ typeGroup, name, row }) => {
    const prevClick = useRef(0);

    const cx = classNames.bind(styles);
    const groupProducts = typeGroup;

    const show = (e) => {
        console.log(e.nativeEvent.timeStamp, prevClick.current);
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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {/* Same as */}
            <ToastContainer />
            {groupProducts && (
                <Swiper
                    slidesPerView={4}
                    spaceBetween={50}
                    navigation={true}
                    pagination={{
                        clickable: true,
                    }}
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
                    modules={[Navigation, Grid]}
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
