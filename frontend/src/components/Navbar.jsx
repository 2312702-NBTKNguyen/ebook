import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav style={
            { 
                padding: '15px', 
                background: '#2c3e50', 
                color: 'white', 
                display: 'flex', 
                gap: '20px' }
            }>
            <Link to="/" style={
                { color: 'white', textDecoration: 'none'}}>Trang chủ</Link>
            <Link to="/profile" style={
                { color: 'white', textDecoration: 'none' }}>Tủ sách</Link>
            <Link to="/login" style={
                { color: 'white', textDecoration: 'none' }}>Đăng nhập</Link>
        </nav>
    );
}