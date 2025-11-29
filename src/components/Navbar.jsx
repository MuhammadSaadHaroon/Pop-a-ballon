    import React from "react";
    import { useDispatch, useSelector } from "react-redux";
    import { logoutUser } from "../redux/userSlice";
    import { auth } from "../firebase/config";
    import { signOut } from "firebase/auth";
    import { useLocation, useNavigate } from "react-router-dom";

    export function Navbar() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const game = useSelector((state) => state.game);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        dispatch(logoutUser());
        navigate("/login");
    };

    const isGamePage = location.pathname === "/game";

    return (
        <div
        className="navbar"
        style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 24px",
            background: "linear-gradient(to right, #1b1b2f, #2a2a3d)",
            color: "#ff66cc",
            boxShadow: "0 3px 6px rgba(0,0,0,0.5)",
            position: "sticky",
            top: 0,
            zIndex: 999,
        }}
        >
        <div className="logo" style={{ fontWeight: "bold", fontSize: 24 }}>
            POP A BALLOON
        </div>

        {isGamePage ? (
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <div>Score: {game.score}</div>
            </div>
        ) : (
            <div>
            {user && (
                <button
                style={{
                    padding: "6px 14px",
                    background: "#ff4dff",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                }}
                onClick={handleLogout}
                >
                Logout
                </button>
            )}
            </div>
        )}
        </div>
    );
    }
