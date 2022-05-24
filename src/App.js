import { Header, Container, Footer } from '~/Layout';
import images from '~/assets/images/';

function App() {
    return (
        <div className="App" style={{ background: `url(${images.bg}) center/ cover fixed` }}>
            <Header />
            <Container />
            <Footer />
        </div>
    );
}

export default App;
