import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './style.css'

function Signup() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    block: '',
    flatNo: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/register',
        formData
      )

     alert(response.data.msg)
      navigate('/login')
    } catch (err) {
  console.log(err)

  alert(
    err.response?.data?.msg ||
    err.message ||
    'Registration Failed'
  )
}
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <div className="store-icon"></div>

          <h2>Community Store</h2>
          <p>Fresh essentials delivered to your door</p>

          <div className="auth-tabs">
            <div
              className="auth-tab"
              onClick={() => navigate('/login')}
            >
              🔑 Login
            </div>

            <div className="auth-tab active">
              👤 Sign Up
            </div>
          </div>
        </div>

        <div className="auth-right">
          <h3>Create account</h3>

          <p className="sub">
            Join your community store today
          </p>

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Zay"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Block</label>

            <select
              name="block"
              value={formData.block}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '11px 14px',
                border: '1.5px solid #d1fae5',
                borderRadius: '10px',
                fontSize: '13px',
                color: '#111827',
                outline: 'none',
                background: '#f0fdf4',
                cursor: 'pointer'
              }}
            >
              <option value="">Select Block</option>
              <option value="A">Block A</option>
              <option value="B">Block B</option>
              <option value="C">Block C</option>
              <option value="D">Block D</option>
            </select>
          </div>

          <div className="form-group">
            <label>Flat Number</label>

            <input
              type="text"
              name="flatNo"
              placeholder="Enter your flat number (e.g. 203)"
              value={formData.flatNo}
              onChange={handleChange}
            />
          </div>

          <button
            className="btn"
            onClick={handleSignup}
          >
            Create Account →
          </button>

          <p className="switch">
            Have an account?{' '}
            <span onClick={() => navigate('/login')}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup