import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { setDoc, doc } from "firebase/firestore";

const AuthContext = createContext();

// ovo je nas context
function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
    //matching user
    setDoc(doc(db, "users", email), {
      savedShows: [],
      watchlist: [],
    });
  };

  const logOut = () => {
    return signOut(auth);
  };

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  });

  const shareContextObject = {
    user,
    signUp,
    logOut,
    logIn,
  };
  return (
    <AuthContext.Provider value={shareContextObject}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
export function UserAuth() {
  return useContext(AuthContext);
}
