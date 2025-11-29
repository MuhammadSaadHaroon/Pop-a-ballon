import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";


export function HighScore() {
const [scores, setScores] = useState([]);


useEffect(() => {
const load = async () => {
const snap = await getDocs(collection(db, "scores"));
const arr = snap.docs.map((d) => d.data());
setScores(arr.sort((a,b) => b.score - a.score));
};
load();
}, []);


return (
<div className="highscore-container">
<h2>Top Scores</h2>
{scores.map((s, i) => (
<p key={i}>#{i+1} - {s.email} - {s.score}</p>
))}
</div>
);
}