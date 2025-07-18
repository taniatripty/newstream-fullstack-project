import React, { useEffect, useState } from 'react';
import { AuthContex } from './AuthContex';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase.init';
import { EmailAuthCredential } from 'firebase/auth/web-extension';

const Authprovider = ({children}) => {
    const[user,setUser]=useState(null)
    const[loading,setLoading]=useState(true)
    const [isSubscribed, setIsSubscribed] = useState(false);
     const provider = new GoogleAuthProvider();


     useEffect(() => {
  if (user) {
    // fetch subscription info from your backend or Firebase custom claims
    // for demo, just set true/false manually
    setIsSubscribed(true); // or false
  } else {
    setIsSubscribed(false);
  }
}, [user]);

   const createuser=(email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
   }
   const Googlelogin=()=>{
     setLoading(true)
    return signInWithPopup(auth,provider)
}

   const login=(email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
   }
    const upadeteuser=(updatadata)=>{
        return updateProfile(auth.currentUser,updatadata)
      }

    const logOut = () => {
     setLoading(true)
    return signOut(auth);
   
  };
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
    });
    return () => {
        unsubscribe();
      };
    },
    [])

    const userInfo={
        createuser,
        user,
        setUser,
        loading,
        setLoading,
        login,
        logOut,
        Googlelogin,
        upadeteuser,
        isSubscribed

    }

    return <AuthContex value={userInfo}> {children}</AuthContex>
           
        
   
};

export default Authprovider;