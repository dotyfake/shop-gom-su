import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Grid } from 'swiper';

import styles from './GroupProducts.module.scss';
import { Product } from '~/components';

const GroupProducts = ({ typeGroup, name }) => {
    const cx = classNames.bind(styles);
    const groupProducts = typeGroup;
    return (
        <div className={cx(name, 'wide')}>
            {groupProducts && (
                <Swiper
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    slidesPerView={4}
                    spaceBetween={50}
                    navigation={true}
                    hashNavigation={{
                        watchState: true,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    grid={{
                        rows: 2,
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
                            <Product type="DEFAULT_PRODUCT" props={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default GroupProducts;
