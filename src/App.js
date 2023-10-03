import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CreateListing from './pages/CreateListing';
import Explore from './pages/Explore';
import Find from './pages/Find';
import Profile from './pages/Profile';
import Category from './pages/Category';
import ForgotPassword from './pages/ForgotPassword';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Explore />} />
                    <Route path='/find' element={<Find />} />
                    <Route
                        path='/category/:categoryName'
                        element={<Category />}
                    />

                    <Route path='/profile' element={<PrivateRoute />}>
                        <Route path='/profile' element={<Profile />} />{' '}
                    </Route>
                    <Route path='/sign-in' element={<SignIn />} />
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route
                        path='/forgot-password'
                        element={<ForgotPassword />}
                    />
                    <Route path='/create-listing' element={<CreateListing />} />
                </Routes>
                <Navbar />
            </Router>
            <ToastContainer />
        </>
    );
}
export default App;
