import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Explore from './pages/explore';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Explore />} />
                    <Route path='/profile' element={<SignIn />} />
                    <Route path='/sign-in' element={<SignIn />} />
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route
                        path='/forgot-password'
                        element={<ForgotPassword />}
                    />
                </Routes>
            </Router>
        </>
    );
}
export default App;
