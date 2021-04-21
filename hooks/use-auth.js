import { useState, useEffect, useContext, createContext } from "react";
import useLocalStorage from "./use-localstorage";

import { auth } from "loaders/firebase";
import axios from "axios";

const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useLocalStorage("firebase-auth", null);

  const signin = async (email, password, name, dob) => {
    try {
      const res = await auth.signInWithEmailAndPassword(email, password);
      const token = await auth.currentUser.getIdTokenResult();
      setUser({ user: { uid: res.user.uid, email: res.user.email, isAdmin: token.claims.admin } });

      return { user: { uid: res.user.uid, email: res.user.email, isAdmin: token.claims.admin } };
    } catch (e) {
      return { error: e };
    }
  };

  const signup = async (email, password, name, dob) => {
    try {
      const res = await axios.post("http://localhost:4000/api/profile", { email, password, name, dob });

      return res.data;
    } catch (e) {
      return { error: e };
    }
  };

  const signout = () => {
    return auth.signOut().then(() => {
      setUser(false);
    });
  };

  const sendPasswordResetEmail = (email) => {
    return auth.sendPasswordResetEmail(email).then(() => {
      return true;
    });
  };
  const confirmPasswordReset = (code, password) => {
    return auth.confirmPasswordReset(code, password).then(() => {
      return true;
    });
  };

  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
