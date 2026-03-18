import React, { useState } from 'react'
import "../auth.form.scss"
import {useNavigate,Link} from "react-router-dom"
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const {loading,handleLogin}= useAuth()

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate=useNavigate();
  
  const handlesubmit=async(e)=>{
    e.preventDefault();
    setErrors({});
    
    if (!email || !password) {
      setErrors({ 
        general: 'Please fill in all fields' 
      });
      return;
    }
    
    await handleLogin({email,password});
    navigate("/");
  }

  return (
    <div className="auth-container">
      {/* Left Side - Branding */}
      <div className="auth-left">
        <div className="auth-logo">
          <span className="logo-icon">✦</span>
          <h1>InterviewPlanerAI</h1>
        </div>
        <div className="auth-message">
          <h2>Welcome Back</h2>
          <p>Your personalized interview preparation awaits. Log in to continue your journey.</p>
        </div>
        <div className="auth-features">
          <div className="feature">
            <span className="feature-icon">🎯</span>
            <p>AI-powered interview prep</p>
          </div>
          <div className="feature">
            <span className="feature-icon">📊</span>
            <p>Real-time performance tracking</p>
          </div>
          <div className="feature">
            <span className="feature-icon">💼</span>
            <p>Customized learning paths</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="auth-right">
        <div className="form-wrapper">
          <div className="form-header">
            <h2>Login to Your Account</h2>
            <p>Enter your credentials to access your dashboard</p>
          </div>

          {errors.general && (
            <div className="error-alert">
              <span className="error-icon">⚠️</span>
              {errors.general}
            </div>
          )}

          <form onSubmit={handlesubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">✉️</span>
                <input 
                  id="email"
                  type="email" 
                  placeholder="you@example.com" 
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className={errors.email ? 'error' : ''}
                />
              </div>
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔐</span>
                <input 
                  id="password"
                  type="password"  
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  className={errors.password ? 'error' : ''}
                />
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>

            <button 
              className="auth-button" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="form-separator">
            <span>Don't have an account?</span>
          </div>

          <Link to="/register" className="register-link">
            <span>Create New Account</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
