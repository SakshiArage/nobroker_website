import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import "../App.css";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@nobroker.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@nobroker.com" && password === "admin123") {
      navigate("/admin/dashboard");
      return;
    }
    alert("Invalid admin credentials");
  };

  return (
    <div className="login-page">

      {/* LEFT SIDE */}

      <div className="login-left">

        <div className="admin-logo">
          <div className="logo-circle">@</div>

          <span>noBroker</span>

          <strong>Admin</strong>
        </div>

        <div className="welcome-section">

          <h1>
            Welcome Back,
            <br />

            <span>Admin!</span>
          </h1>

          <div className="pink-line"></div>

          <p>
            Sign in to access the NoBroker admin
            dashboard and manage the platform
            efficiently.
          </p>

        </div>

        <div className="login-features">

          <div className="feature">
            <div className="feature-icon">
              📊
            </div>

            <div>
              <h3>Monitor Platform</h3>
              <p>
                Track key metrics and performance
                in real-time.
              </p>
            </div>
          </div>

          <div className="feature">
            <div className="feature-icon">
              👥
            </div>

            <div>
              <h3>Manage Users & Properties</h3>
              <p>
                Oversee users, listings and
                transactions seamlessly.
              </p>
            </div>
          </div>

          <div className="feature">
            <div className="feature-icon">
              🛡️
            </div>

            <div>
              <h3>Secure & Reliable</h3>
              <p>
                Built with security and reliability
                as our top priority.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="login-right">

        <div className="login-card">

          <div className="login-heading">

            <h2>Admin Login</h2>

            <p>
              Please enter your credentials to continue
            </p>

          </div>

          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="input-group">

              <label>Email Address</label>

              <div className="input-wrapper">

                <Mail size={22} />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nobroker.com"
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div className="input-group">

              <div className="password-label">

                <label>Password</label>

                <button type="button">
                  Forgot Password?
                </button>

              </div>

              <div className="input-wrapper">

                <Lock size={22} />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />

                <button
                  type="button"
                  className="eye-button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}
                </button>

              </div>

            </div>

            {/* REMEMBER */}

            <div className="remember">

              <input
                type="checkbox"
                defaultChecked
              />

              <span>Remember me</span>

            </div>

            {/* LOGIN */}

            <button className="login-button">

              <span>Login to Dashboard</span>

              <ArrowRight size={22} />

            </button>

          </form>

          <div className="or-divider">

            <span></span>

            <p>OR</p>

            <span></span>

          </div>

          <button className="otp-button">

            <ShieldCheck size={20} />

            Login with OTP

          </button>

        </div>

        <div className="login-footer">

          <p>
            Secure access for authorized administrators only.
          </p>

          <p>
            Kshetrapati Industries Private Limited,Pune.
          </p>

        </div>

      </div>

    </div>
  );
}

export default AdminLogin;
