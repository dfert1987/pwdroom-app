import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Explore from './pages/Explore';
import Find from './pages/Find';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Explore />} />
                    <Route path='/find' element={<Find />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/sign-in' element={<SignIn />} />
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route
                        path='/forgot-password'
                        element={<ForgotPassword />}
                    />
                </Routes>
                <Navbar />
            </Router>
        </>
    );
}
export default App;
