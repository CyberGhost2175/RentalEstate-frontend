import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleForgotPassword = async () => {
        try {
            await axios.post('http://localhost:4444/send-registration-gmail', { email });
            alert('Reset email sent successfully. Check your inbox.');
        } catch (error) {
            console.error('Error sending reset email:', error);
            alert('Failed to send reset email. Please try again.');
        }
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            <input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} />
            <button onClick={handleForgotPassword}>Send Reset Email</button>
        </div>
    );
};

export default ForgotPassword;
