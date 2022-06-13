import { ContactElement } from '~/components';
import { useEffect } from 'react';
const Contact = () => {
    useEffect(() => {
        document.title = 'Liên hệ - Gốm nhà Khuê My';
    }, []);
    return (
        <div>
            <ContactElement />
        </div>
    );
};

export default Contact;
