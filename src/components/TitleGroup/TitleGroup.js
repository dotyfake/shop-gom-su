import images from '~/assets/images/';
import classNames from 'classnames/bind';
import styles from './TitleGroup.module.scss';

const cx = classNames.bind(styles);

const TitleGroup = ({ title }) => {
    return (
        <div className={cx('title')}>
            <div className="wide">
                {title}
                <div
                    className={cx('line')}
                    style={{ background: `url(${images.line}) no-repeat center/ contain` }}
                ></div>
            </div>
        </div>
    );
};

export default TitleGroup;
