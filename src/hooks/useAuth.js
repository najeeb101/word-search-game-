// Custom hook for Firebase authentication
import { useState, useEffect } from 'react';
import {
    signInAnonymously,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../config/firebase';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    /**
     * Sign in anonymously
     */
    const signInAnon = async () => {
        try {
            setError(null);
            const result = await signInAnonymously(auth);
            return result.user;
        } catch (err) {
            setError(err.message);
            console.error('Anonymous sign in error:', err);
            return null;
        }
    };

    /**
     * Sign in with email and password
     */
    const signIn = async (email, password) => {
        try {
            setError(null);
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result.user;
        } catch (err) {
            setError(err.message);
            console.error('Sign in error:', err);
            return null;
        }
    };

    /**
     * Create account with email and password
     */
    const signUp = async (email, password) => {
        try {
            setError(null);
            const result = await createUserWithEmailAndPassword(auth, email, password);
            return result.user;
        } catch (err) {
            setError(err.message);
            console.error('Sign up error:', err);
            return null;
        }
    };

    /**
     * Sign out current user
     */
    const signOut = async () => {
        try {
            setError(null);
            await firebaseSignOut(auth);
        } catch (err) {
            setError(err.message);
            console.error('Sign out error:', err);
        }
    };

    return {
        user,
        loading,
        error,
        signInAnon,
        signIn,
        signUp,
        signOut,
    };
};
