// src/components/Auth.js
import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleEmailAuth = async () => {
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registered successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully!");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Logged in with Google!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

 if (user) {
  return (
    <div className="d-flex justify-content-between align-items-center px-4 py-3 bg-light border-bottom mb-4">
      <h5 className="mb-0">Welcome, {user.email}</h5>
      <button
        className="btn btn-danger"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}


  return (
    <div style={styles.box}>
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <input
        type="email"
        placeholder="Email"
        style={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        style={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleEmailAuth} style={styles.button}>
        {isRegister ? "Register" : "Login"}
      </button>
      <button
        onClick={() => setIsRegister(!isRegister)}
        style={styles.toggle}
      >
        {isRegister ? "Already have an account? Login" : "New user? Register"}
      </button>
      <hr style={styles.hr} />
      <button onClick={handleGoogleSignIn} style={styles.google}>
        Sign in with Google
      </button>
    </div>
  );
}

const styles = {
  box: {
    padding: 20,
    backgroundColor: "#f7f8fc",
    borderRadius: 10,
    textAlign: "center",
    maxWidth: 400,
    margin: "auto",
  },
  input: {
    width: "100%",
    margin: "10px 0",
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: 10,
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: 5,
    fontSize: 16,
    cursor: "pointer",
    marginBottom: 10,
  },
  toggle: {
    width: "100%",
    padding: 10,
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: 5,
    fontSize: 14,
    cursor: "pointer",
    marginBottom: 10,
  },
  google: {
    width: "100%",
    padding: 10,
    border: "1px solid black",
    borderRadius: 5,
    fontSize: 16,
    cursor: "pointer",
    backgroundColor: "white",
  },
  hr: {
    margin: "20px 0",
  },
  logout: {
    padding: 10,
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: 5,
    fontSize: 16,
    cursor: "pointer",
  }
};

export default Auth;
