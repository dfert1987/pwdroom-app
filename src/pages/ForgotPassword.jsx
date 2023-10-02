import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const onChange = (e) => setEmail(e.target.value);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            toast.success('Email was sent. Check you inbox.');
        } catch (error) {
            toast.error(
                "Something went wrong, we couldn't send the reset email."
            );
        }
    };

    return (
        <div className='pageContainer'>
            <header className='pageHeader'>Forgot Password</header>
            <main>
                <form onSubmit={onSubmit}>
                    <input
                        id='email'
                        value={email}
                        type='text'
                        className='emailInput'
                        onChange={onChange}
                    />
                    <Link className='forgotPasswordLink' to='/sign-in'>
                        Sign In
                    </Link>
                    <div className='signInBar'>
                        <div className='signInText'>Send Reset Link</div>
                        <button className='signInButton'>
                            <ArrowRightIcon
                                fill='#ffffff'
                                width='34px'
                                height='34px'
                            />
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default ForgotPassword;
