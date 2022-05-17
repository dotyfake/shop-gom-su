import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import TypeWriterEffect from 'react-typewriter-effect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used
const cx = classNames.bind(styles);

const Search = () => {
    const [typeWriter, setTypeWriter] = useState(true);
    const [clearSearch, setClearSearch] = useState(false);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('child')}>
                <input
                    type="text"
                    onFocus={(e) => {
                        setTypeWriter(false);
                    }}
                    onBlur={(e) => {
                        e.target.value !== '' ? setTypeWriter(false) : setTypeWriter(true);
                    }}
                    onChange={(e) => {
                        if (e.target.value !== '') {
                            setClearSearch(true);
                        } else {
                            setClearSearch(false);
                        }
                    }}
                />
                {typeWriter && (
                    <div className={cx(typeWriter && 'type-writer')}>
                        <TypeWriterEffect
                            textStyle={{
                                fontFamily: 'Red Hat Display',
                                color: '#07142e',
                                fontWeight: 500,
                                fontSize: '1.2em',
                                opacity: 0.8,
                            }}
                            startDelay={2000}
                            cursorColor="#3F3D56"
                            multiText={[
                                'Đĩa sâu lòng Lộc Lạc...',
                                'Bát lục diệp...',
                                'Bộ trà Hoàng gia...',
                                'Bát cơm Lạc Hồng...',
                                'Đĩa súp quốc sắc...',
                            ]}
                            multiTextDelay={1000}
                            typeSpeed={30}
                            multiTextLoop
                        />
                    </div>
                )}
                <div className={cx('buttons')}>
                    {clearSearch && (
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={solid('circle-xmark')} size="lg" />
                        </button>
                    )}
                    <button className={cx('btn-search')}>
                        <FontAwesomeIcon icon={solid('magnifying-glass')} size="lg" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Search;
