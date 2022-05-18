import classNames from 'classnames/bind';
import styles from './Feedback.module.scss';
import images from '~/assets/images';

const listFeedback = [
    {
        name: 'Huyền Thị Đề',
        feed: 'Mua về phải vào bếp nấu luôn chị ạ!! Bộ bát đĩa quá trời là đẹp, rất ủng hộ chị!',
        avata: images.a2,
        bg: images.r1,
    },
    {
        name: 'Chị Thị Hằng',
        feed: 'Được bộ sứ đẹp, ăn cơm ngon hẳn lun! Em thích lắm chị ạ!',
        avata: images.a1,
        bg: images.r2,
    },
    {
        name: 'Lung Thị Linh',
        feed: 'Mẹ em cứ bảo mua về làm gì cho chật nhà, rồi đến giờ thì hôm nào nấu ăn cũng dùng bộ này chị ạ!',
        avata: images.a3,
        bg: images.r3,
    },
    {
        name: 'Linh thị Lung',
        feed: 'Hôm qua mua về mà chồng em cứ bảo em nấu nhìn ảo diệu hơn, nhìn bộ sứ đẹp quá!',
        avata: images.a4,
        bg: images.r4,
    },
];
const cx = classNames.bind(styles);

const Feedback = () => {
    return (
        <div className={cx('wrapper')}>
            {listFeedback.map((feedback, i) => (
                <div
                    key={i}
                    className={cx('feed-item')}
                    style={{
                        background: `linear-gradient(rgba(231, 242, 251,.3), rgba(231, 242, 251,.3)), url(${feedback.bg}) no-repeat center/ cover`,
                    }}
                >
                    <div
                        className={cx('img')}
                        style={{ background: `url(${feedback.avata}) no-repeat center/ cover` }}
                    ></div>
                    <div className={cx('desc')}>
                        <h2>{feedback.name}</h2>
                        <p>{feedback.feed}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Feedback;
