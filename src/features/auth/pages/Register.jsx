import React, { useState } from 'react'
import {useNavigate,Link} from "react-router-dom"
import { useAuth } from '../hooks/useAuth'
import "../auth.form.scss"

const Register = () => {
  const {loading,handleRegister} = useAuth();
  const navigate=useNavigate();
  
  const[username,setUsername] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[confirmPassword,setConfirmPassword] = useState("");
  const[errors,setErrors] = useState({});
  
  const handlesubmit= async(e)=>{
    e.preventDefault();
    setErrors({});
    
    // Validation
    if (!username || !email || !password || !confirmPassword) {
      setErrors({ general: 'Please fill in all fields' });
      return;
    }
    
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }
    
    if (password.length < 6) {
      setErrors({ password: 'Password must be at least 6 characters' });
      return;
    }

    await handleRegister({username,email,password});
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
          <h2>Start Your Journey</h2>
          <p>Join thousands of professionals preparing for their dream interviews with our AI-powered platform.</p>
        </div>
        <div className="auth-features">
          <div className="feature">
            <span className="feature-icon">🚀</span>
            <p>Get started in minutes</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🎓</span>
            <p>Learn from industry experts</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🏆</span>
            <p>Achieve your goals faster</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="auth-right">
        <div className="form-wrapper">
          <div className="form-header">
            <h2>Create Your Account</h2>
            <p>Join our platform and start preparing today</p>
          </div>

          {errors.general && (
            <div className="error-alert">
              <span className="error-icon">⚠️</span>
              {errors.general}
            </div>
          )}

          <form onSubmit={handlesubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input 
                  id="username"
                  type="text" 
                  placeholder="Choose your username" 
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                  className={errors.username ? 'error' : ''}
                />
              </div>
              {errors.username && <span className="error-text">{errors.username}</span>}
            </div>

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
              <p className="password-hint">At least 6 characters</p>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔐</span>
                <input 
                  id="confirmPassword"
                  type="password"  
                  placeholder="Confirm your password" 
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                  className={errors.confirmPassword ? 'error' : ''}
                />
              </div>
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>

            <div className="form-options">
              <label className="terms-checkbox">
                <input type="checkbox" required />
                <span>I agree to the Terms and Conditions</span>
              </label>
            </div>

            <button 
              className="auth-button" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="form-separator">
            <span>Already have an account?</span>
          </div>

          <Link to="/login" className="register-link">
            <span>Sign In Here</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
