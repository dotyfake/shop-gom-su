import classNames from 'classnames/bind';

import { useGetProducts } from '~/store';
import styles from './Home.module.scss';
import Slide from './components/Slide/Slide';
import { GroupProducts, TitleGroup, ContactElement } from '~/components';
import BestProducts from './components/BestProducts/BestProducts';
import Feedback from './components/Feedback/Feedback';

const cx = classNames.bind(styles);

const Home = () => {
    return (
        <div className={cx('content')}>
            <Slide />
            <TitleGroup title="Sản phẩm mới" noMargin />
            <GroupProducts typeGroup={useGetProducts('New')} name="NewProducts" row={2} />
            <TitleGroup title="Sản phẩm bán chạy" />
            <GroupProducts typeGroup={useGetProducts('Hot')} name="HotProducts" row={1} />
            <TitleGroup title="Sản phẩm tiêu biểu" />
            <BestProducts />
            <TitleGroup title="Phản hồi từ khách hàng" />
            <Feedback />
            <TitleGroup title="Về chúng tôi" />
            <ContactElement />
        </div>
    );
};

export default Home;
