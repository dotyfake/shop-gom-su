import images from '~/assets/images/';
import classNames from 'classnames/bind';
import styles from './TitleGroup.module.scss';

const cx = classNames.bind(styles);

const TitleGroup = ({ title, noMarginBot, noMarginTop }) => {
    return (
        <div className={cx('title')}>
            <div className="wide">
                <h3 style={{ margin: '0' }}>{title}</h3>
                <div
                    className={cx('line')}
                    style={{
                        background: `url(${images.line}) no-repeat center/ contain`,
                        marginBottom: `${noMarginBot && '0'}`,
                        marginTop: `${noMarginTop && '0'}`,
                    }}
                ></div>
            </div>
        </div>
    );
};

export default TitleGroup;
