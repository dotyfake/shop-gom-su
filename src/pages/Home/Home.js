import classNames from 'classnames/bind';

import { useGetProducts } from '~/store';
import styles from './Home.module.scss';
import Slide from './components/Slide/Slide';
import { GroupProducts, TitleGroup } from '~/components';

const cx = classNames.bind(styles);

const Home = () => {
    return (
        <div className={cx('content')}>
            <Slide />
            <TitleGroup title="Sản phẩm mới" />
            <GroupProducts typeGroup={useGetProducts('New')} name="NewProducts" />
        </div>
    );
};

export default Home;
