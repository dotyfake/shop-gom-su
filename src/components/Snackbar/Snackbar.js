import React, { useState, forwardRef, useImperativeHandle } from 'react';
import styles from './Snackbar.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Snackbar = forwardRef((props, ref) => {
    const [showSnackbar, setShowSnackbar] = useState(false);
    console.log(props);

    useImperativeHandle(ref, () => ({
        show() {
            setShowSnackbar(true);
            setTimeout(() => {
                setShowSnackbar(false);
            }, 3000);
        },
    }));
    return (
        <div
            className={cx('snackbar', { show: showSnackbar }, { hide: !showSnackbar })}
            style={{
                backgroundColor: props.type === 'success' ? '#53a653' : '#FF0033',
                color: props.type === 'success' ? '#fff' : '#000',
            }}
        >
            <div className={cx('symbol')}>{props.type === 'success' ? <h1>&#x2713;</h1> : <h1>&#x2613;</h1>}</div>
            <div className={cx('message')}>{props.message}</div>
        </div>
    );
});

export default Snackbar;
