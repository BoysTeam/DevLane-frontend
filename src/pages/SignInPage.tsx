import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    console.log({ email, password, remember });
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.whiteSide} />
      <div style={styles.card}>

        {/* Left Panel */}
        <div style={styles.leftPanel}>
          <div style={styles.brandContainer}>
            <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: "14px" }}>
              <path d="M32 10 C32 10, 20 20, 20 36 C20 46, 26 54, 32 56 C38 54, 44 46, 44 36 C44 20, 32 10, 32 10Z" fill="#2B5EBE" />
              <path d="M22 18 C22 18, 8 22, 8 38 C8 46, 14 52, 22 52 C24 44, 24 36, 26 28 C24 24, 22 18, 22 18Z" fill="#2B5EBE" opacity="0.75" />
              <path d="M42 18 C42 18, 56 22, 56 38 C56 46, 50 52, 42 52 C40 44, 40 36, 38 28 C40 24, 42 18, 42 18Z" fill="#2B5EBE" opacity="0.75" />
            </svg>
            <h1 style={styles.brandTitle}>DEVLANE DASHBOARD</h1>
            <p style={styles.brandSubtitle}>Organize your content Publishing Habits.</p>
          </div>
        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel}>
          <div style={styles.formCard}>

            <div style={styles.formGroup}>
              <label style={styles.label}>Your email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                onFocus={(e) => (e.currentTarget.style.outline = "2px solid #a0b8f0")}
                onBlur={(e) => (e.currentTarget.style.outline = "none")}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.passwordInput}
                  onFocus={(e) => (e.currentTarget.style.outline = "2px solid #a0b8f0")}
                  onBlur={(e) => (e.currentTarget.style.outline = "none")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeBtn}
                >
                  {showPassword ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div style={styles.row}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  style={styles.checkbox}
                />
                Remember me
              </label>
              <a href="#" style={styles.recoverLink}>Recover password</a>
            </div>

            <button onClick={handleSubmit} style={styles.signInBtn}>
              SIGN IN
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    position: "relative",
    display: "flex",
    width: "100vw",
    height: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#2B5EBE",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  whiteSide: {
  position: "absolute",
  top: 0,
  left: 0,
  width: "46%",
  height: "100%",
  backgroundColor: "#ffffff",
  clipPath: "polygon(0 0, 100% 0, 70% 100%, 0 100%)",
  zIndex: 0,
},
  card: {
  position: "relative",
  display: "flex",
  width: "90%",
  height: "525px",
  maxWidth: "1094",
  maxHeight: "525px",
  borderRadius: "1px",
  border: "5px #4a7fd4",
  overflow: "hidden",
  boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
  zIndex: 1,
  backgroundColor: "transparent",
},

  leftPanel: {
    width: "45%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    zIndex: 2,
  },

  brandContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    paddingRight: "20px",
    paddingBottom: "20px"
  },
  brandTitle: {
    fontSize: "clamp(1.2rem, 3vw, 2rem)",
    fontWeight: 700,
    letterSpacing: "1.5px",
    color: "#2B5EBE",
    margin: "0 15px 0 1",
  },
  brandSubtitle: {
    fontSize: "15px",
    color: "black",
    fontWeight: 500,
    letterSpacing: "0.1px",
    margin: 0,
    maxWidth: "200px",
    lineHeight: "1.5",
  },
  rightPanel: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    zIndex: 1,
  },
  formCard: {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  marginLeft: "0px",
  marginRight: "20px",
  maxWidth: "260px"
},
  formGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "12px",
  },
  label: {
    color: "#d0dff8",
    fontSize: "11px",
    marginBottom: "5px",
    fontWeight: 500,
  },
  input: {
    padding: "7px 10px",
    border: "none",
    borderRadius: "3px",
    fontSize: "12px",
    backgroundColor: "#ffffff",
    color: "#333",
    outline: "none",
  },
  passwordWrapper: {
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
  },
  passwordInput: {
    width: "100%",
    padding: "7px 32px 7px 10px",
    border: "none",
    borderRadius: "3px",
    fontSize: "12px",
    backgroundColor: "#ffffff",
    color: "#333",
    outline: "none",
    boxSizing: "border-box" as const,
  },
  eyeBtn: {
    position: "absolute" as const,
    right: "8px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0",
    display: "flex",
    alignItems: "center",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#d0dff8",
    fontSize: "11px",
    cursor: "pointer",
  },
  checkbox: {
    accentColor: "#ffffff",
    width: "13px",
    height: "13px",
    cursor: "pointer",
  },
  recoverLink: {
    color: "#a0c0ff",
    fontSize: "11px",
    textDecoration: "none",
    cursor: "pointer",
  },
  signInBtn: {
    width: "100%",
    padding: "8px",
    backgroundColor: "#4a7fd4",
    color: "#ffffff",
    border: "none",
    borderRadius: "3px",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "1.5px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
};