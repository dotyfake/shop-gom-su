import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import classNames from 'classnames/bind';

import styles from './IconComponent.module.scss';

const cx = classNames.bind(styles);

const primaryColor = '#325080';

const IconComponent = (name, fontSize, color = [primaryColor], classNameIcon) => {
    return (
        <div className={cx(`${classNameIcon}`)} style={{ fontSize: `${fontSize}`, color: `${color}` }}>
            <FontAwesomeIcon icon={solid('bars')} />
        </div>
    );
};

export default IconComponent;
