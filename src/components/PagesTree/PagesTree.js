import classNames from 'classnames/bind';
import styles from './PagesTree.module.scss';
import { NavLink } from 'react-router-dom';
import { Home } from '~/pages';

const cx = classNames.bind(styles);

const PagesTree = ({ Page }) => {
    const currentPage = <Page />;
    return (
        <div className={cx('wrapper')}>
            <NavLink to="/" element={<Home />} className={cx('nav-item')}>
                Trang chủ
            </NavLink>
            <NavLink to={'/' + Page} element={currentPage} className={cx('nav-item')} avtiveClassName="active">
                {Page}
            </NavLink>
        </div>
    );
};

export default PagesTree;
