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
          </div>
        </main>
      </div>
    );
  }

  // 3. Unauthenticated View (Login Page)
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>MCPUniDir</h1>
        <p>Please sign in to access your account.</p>
        <button onClick={login} style={styles.loginBtn}>
          Sign in with UniDir
        </button>
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
