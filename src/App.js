import { Header, Container } from '~/Layout';
import images from '~/assets/images/';

function App() {
    return (
        <div className="App" style={{ background: `url(${images.bg}) center/ cover` }}>
            <Header />
            <Container />
        </div>
    );
}

export default App;
