import { app } from "../firebase/config";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [cancelled, setCancelled] = useState(false);
  const auth = getAuth(app);
  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      await updateProfile(user, {
        displayName: data.displayName,
      });
    
     await auth.currentUser.reload();
     setLoading(false);

    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);
      let systemErrorMessage;
      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage =
          "Ocorreu um erro, por favor tente novamente mais tarde.";
      }
      setLoading(false);
      setError(systemErrorMessage);
    }
  };
  //login - sign in
  const login = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(false);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemErrorMessage;
      if (error.message.includes("invalid-credential")) {
        systemErrorMessage = "Dados inválidos.";
      } else {
        systemErrorMessage =
          "Ocorreu um erro, por favor tente novamente mais tarde.";
      }
      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  });

  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  return { auth, createUser, error, loading, logout, login };
};
