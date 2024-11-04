import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import TCRoutes from "./routes/TCRoutes.jsx";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster/>
      <Navbar/>
      <TCRoutes />
      <Footer/>
    </>
  );
}

export default App;
