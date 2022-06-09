import { useState, forwardRef, useImperativeHandle } from 'react';
import classNames from 'classnames/bind';

import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

const Modal = ({ children, width, left, right, setShowModal }, ref) => {
    const [show, setShow] = useState(false);
    useImperativeHandle(ref, () => handleShow);
    const handleShow = () => {
        setShow(true);
        setTimeout(() => {
            setShowModal(false);
        }, 190);
    };
    return (
        <>
            <div
                className={cx('modal', { hide: show })}
                style={{
                    width: `${width}px`,
                    left: left && '0',
                    right: right && '0',
                }}
            >
                {children}
            </div>
            <div className={cx('modal-overlay')} onClick={handleShow}></div>
        </>
    );
};

export default forwardRef(Modal);
