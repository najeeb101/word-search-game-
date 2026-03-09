import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';
import '../styles/Auth.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resetSent, setResetSent] = useState(false);
    const [resetError, setResetError] = useState('');
    const { signIn, resetPassword, error: authError, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await signIn(email, password);
        if (user) {
            navigate('/levels');
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setResetError('Please enter your email address above first.');
            return;
        }
        setResetError('');
        const sent = await resetPassword(email);
        if (sent) setResetSent(true);
    };

    return (
        <div className="auth-page">
            <Header />
            <div className="auth-container">
                <div className="auth-card">
                    <h2>Welcome Back</h2>
                    <p className="auth-subtitle">Sign in to continue your word search adventure</p>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="enter your email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="password"
                                required
                            />
                        </div>

                        {authError && <p className="auth-error">{authError}</p>}
                        {resetError && <p className="auth-error">{resetError}</p>}
                        {resetSent && <p className="auth-success">Reset email sent! Check your inbox.</p>}

                        <button type="submit" className="auth-button" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>

                        <button type="button" className="forgot-password-button" onClick={handleForgotPassword}>
                            Forgot password?
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>Don't have an account? <Link to="/signup">Create one</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
