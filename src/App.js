import { Header, Container, Footer } from '~/Layout';
import images from '~/assets/images/';
import { useEffect } from 'react';

function App() {
    useEffect(() => {
        document.title = 'Gốm nhà Khuê My';
    }, []);
    return (
        <div className="App" style={{ background: `url(${images.bg}) center/ cover fixed` }}>
            <Header />
            <Container />
            <Footer />
        </div>
    );
}

export default App;
