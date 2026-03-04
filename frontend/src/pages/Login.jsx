import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'
import './Login.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('auth/login/', {
                username: username,
                password: password
            });

            const { access, refresh } = response.data;

            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            navigate('/');
            
        } catch (err) {
            setError('Sai tên đăng nhập hoặc mật khẩu. Vui lòng thử lại!');
            console.error(err);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2 className="login-title">Đăng Nhập</h2>
                
                {error && <div className="error-message">{error}</div>}

                <div className="form-group">
                    <label>Tên đăng nhập</label>
                    <input 
                        type="text" 
                        className="form-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nhập username của bạn"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Mật khẩu</label>
                    <input 
                        type="password" 
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu"
                        required
                    />
                </div>

                <button type="submit" className="login-btn">
                    Đăng Nhập
                </button>
            </form>
        </div>
    );
}