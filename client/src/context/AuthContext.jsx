import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, use, useEffect, useState } from "react";
import { auth } from "../firebase.config";
import Spinner from "../components/shared/Spinner";

//create context
const AuthContext = createContext();
//custom hook
export const useAuth = () => use(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Auth functions
  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => signOut(auth);

  const updateUserProfile = (profile) =>
    updateProfile(auth.currentUser, profile);

  const value = {
    user,
    setUser,
    register,
    login,
    googleSignIn,
    logout,
    updateUserProfile,
  };

  return (
    <AuthContext value={value}>{loading ? <Spinner /> : children}</AuthContext>
  );
};

export default AuthProvider;
