import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import ListOrder from './Components/ListOrder/ListOrder';

const cx = classNames.bind(styles);
const Order = () => {
    const [data, setData] = useState([]);
    const id = localStorage.getItem('authId');

    useEffect(() => {
        axios
            .post('/.netlify/functions/test', {
                id,
            })
            .then((res) => {
                const newListOrder = res.data.results.map((item, i) => {
                    const event = new Date(item.created_time);
                    return {
                        id: item.id,
                        date: event.toLocaleString('vi-VN'),
                        title: item.properties.Name.title[0].plain_text,
                        address: item.properties.Address.rich_text[0].plain_text,
                        arrayCart: JSON.parse(item.properties.ArrayCart.rich_text[0].plain_text),
                        email: item.properties.Email.rich_text[0].plain_text,
                        name: item.properties.FullName.rich_text[0].plain_text,
                        note: item.properties.Note.rich_text[0].plain_text,
                        phone: item.properties.Phone.number,
                        status: item.properties.Status.select.name,
                        sumPrice: item.properties.SumPrice.number,
                    };
                });
                setData(newListOrder);
            });
    }, []);

    console.log(data);

    return (
        <div className={cx('wrapper')}>
            <div className="wide">
                {data.map((item, i) => (
                    <div key={i}>
                        <ListOrder data={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Order;
