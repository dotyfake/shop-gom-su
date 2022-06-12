import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useViewport } from '~/store';

import { TitleGroup } from '~/components';
import styles from './News.module.scss';
const cx = classNames.bind(styles);

const News = () => {
    const [newsList, setNewsList] = useState([]);
    const [loadNews, setLoadNews] = useState(1);
    const loadNewsList = newsList.slice(0, loadNews);
    const [temporary, setTemporary] = useState(true);
    const [endNews, setEndNews] = useState(false);
    const newsRef = useRef();
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 740;

    setTimeout(() => {
        setTemporary(false);
    }, 1500);
    useEffect(() => {
        axios('/.netlify/functions/NewsAPI').then((res) => {
            const db = res.data.results;
            const data = db.map((item) => {
                const event = new Date(item.properties.dateCreated.created_time);
                return {
                    title: item.properties.Title.rich_text.map((item) => item.plain_text).join(''),
                    desc1: item.properties.Description1.rich_text.map((item) => item.plain_text).join(''),
                    desc2: item.properties.Description2.rich_text.map((item) => item.plain_text).join(''),
                    desc3: item.properties.Description3.rich_text.map((item) => item.plain_text).join(''),
                    desc4: item.properties.Description4.rich_text.map((item) => item.plain_text).join(''),
                    image1: item.properties.Image.files[0].file.url,
                    image2: item.properties.Image.files[1].file.url,
                    image3: item.properties.Image.files[2].file.url,
                    image4: item.properties.Image.files[3].file.url,
                    date: event.toLocaleString('vi-VN', { timeZone: 'GMT' }),
                };
            });
            setNewsList(data);
        });
    }, []);

    useEffect(() => {
        const trackScrolling = () => {
            if (newsRef.current.getBoundingClientRect().bottom <= window.innerHeight) {
                setLoadNews((prev) => ++prev);
                loadNews >= newsList.length ? setEndNews(true) : setEndNews(false);
            }
        };
        window.addEventListener('scroll', trackScrolling);
        return () => window.removeEventListener('scroll', trackScrolling);
    });
    return (
        <div>
            <div className="wide">
                <div className="row" ref={newsRef}>
                    <div className="col l-12 m-12 c-12">
                        <TitleGroup title="Tin mới" />
                        {temporary && (
                            <div className={cx('item-temporary')}>
                                <div>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                        {newsList.length > 0 &&
                            loadNewsList.map((item, i) => (
                                <div key={i} className={cx('news-item')} style={{ padding: isMobile && '25px 20px' }}>
                                    <h3>{item.date}</h3>
                                    <h1>{item.title}</h1>
                                    <p>{item.desc1}</p>
                                    <img src={item.image1} alt="" />
                                    <p>{item.desc2}</p>
                                    <img src={item.image2} alt="" />
                                    <p>{item.desc3}</p>
                                    <img src={item.image3} alt="" />
                                    <p>{item.desc4}</p>
                                    <img src={item.image4} alt="" />
                                </div>
                            ))}
                        {endNews && <h3 style={{ textAlign: 'center', color: '#333' }}>Không còn bài viết nào</h3>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default News;
