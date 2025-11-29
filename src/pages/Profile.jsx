import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

/**
 * Profile page shows user info and lastPlayed
 */

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!user) return;
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists() && mounted) setProfile(snap.data());
    };
    load();
    return () => (mounted = false);
  }, [user]);

  if (!user) return <div>Please login to see profile.</div>;

  return (
    <div className="profile-page" style={{ maxWidth: 700, margin: "24px auto" }}>
      <h2>Profile</h2>
      {profile ? (
        <>
          <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
          <p><strong>Email:</strong> {profile.email || user.email}</p>
          <p><strong>Last Played:</strong> {profile.lastPlayed ? new Date(profile.lastPlayed.seconds ? profile.lastPlayed.seconds * 1000 : profile.lastPlayed).toLocaleString() : "Never"}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
