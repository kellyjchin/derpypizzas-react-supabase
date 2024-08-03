import React from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

function LogOut() {

    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error('Error logging out:', error.message);
        else {
            setUser(null);
            navigate('/');
        }
    }

    return (
        <button onClick={handleLogout}>Log Out</button>
    );
}

export default LogOut;