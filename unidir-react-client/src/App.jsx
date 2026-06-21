// src/App.jsx
import { useUniDir } from "./useUniDir";

function App() {
  const { user, isAuthenticated, loading, login, logout } = useUniDir();

  // 1. Show a loading state while the SDK is verifying tokens
  if (loading) {
    return (
      <div style={styles.container}>
        <div className="spinner">Verifying Session...</div>
      </div>
    );
  }

  // 2. Authenticated View (Dashboard)
  if (isAuthenticated) {
    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <h1>UniDir Dashboard</h1>
          <button onClick={logout} style={styles.logoutBtn}>
            Logout
          </button>
        </header>
        <main style={styles.main}>
          <div style={styles.card}>
            <h2>Welcome Back!</h2>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>You are successfully logged in using your UniDir SDK.</p>
            {user.jkt ? (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                <p className="font-semibold text-green-700">✓ DPoP Bound</p>
                <p className="text-xs text-green-600 break-all">
                  JKT: {user.jkt}
                </p>
              </div>
            ) : (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <p className="font-semibold text-yellow-700">
                  ⚠ Bearer Token (No DPoP)
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // 3. Unauthenticated View (Login Page)
  const handleDirectLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    login({ email, password }).catch(err => {
      alert("Login failed: " + err.message);
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>MCPUniDir Direct Login</h1>
        <p>Sign in via the background authentication flow.</p>
        
        <form onSubmit={handleDirectLogin} style={styles.form}>
          <input 
            type="email" 
            name="email" 
            required 
            placeholder="john.doe@goodwork.com" 
            style={styles.input} 
          />
          <input 
            type="password" 
            name="password" 
            required 
            placeholder="Password" 
            style={styles.input} 
          />
          <button type="submit" style={styles.loginBtn}>
            Sign In Directly
          </button>
        </form>

        <div style={{ marginTop: '20px', fontSize: '14px' }}>
          <p>Or use the standard hosted UI:</p>
          <button onClick={() => login()} style={{ ...styles.loginBtn, backgroundColor: '#6c757d', marginTop: '10px' }}>
            Sign in with Hosted UI
          </button>
        </div>
      </div>
    </div>
  );
}

// Simple inline styles for demonstration
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    // Force children to fill the horizontal space
    alignItems: "stretch",
    width: "100vw", // Use viewport width to be certain
    minHeight: "100vh",
    backgroundColor: "rgba(201, 211, 145, 1)",
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    overflowX: "hidden", // Prevents accidental horizontal scrolling
  },
  card: {
    // Explicitly set width and ensure padding doesn't push it over 100%
    width: "100%",
    boxSizing: "border-box",
    padding: "2rem",
    backgroundColor: "blue",
    color: "white",
    textAlign: "center",
    // Remove border radius for a "full-bleed" look
    borderRadius: "0",
  },
  header: {
    width: "100%",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    backgroundColor: "rgba(201, 211, 145, 1)",
  },
  loginBtn: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4285F4",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "300px",
    margin: "20px auto",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    color: "#333",
  },
  logoutBtn: {
    padding: "8px 16px",
    margin: "30px 30px",
    backgroundColor: "#ff4d4f",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  main: { marginTop: "60px" },
};

export default App;
