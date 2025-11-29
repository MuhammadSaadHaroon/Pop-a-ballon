import { createSlice } from "@reduxjs/toolkit";


const gameSlice = createSlice({
name: "game",
initialState: {
score: 0,
level: 1,
lifelines: 3,
},
reducers: {
setLevel: (state, action) => {
state.level = action.payload;
},
addScore: (state) => {
state.score += 1;
},
removeLife: (state) => {
if (state.lifelines > 0) state.lifelines -= 1;
},
addLife: (state) => {
state.lifelines += 1;
},
resetGame: (state) => {
state.score = 0;
state.level = 1;
state.lifelines = 3;
},
},
});


export const { setLevel, addScore, removeLife, addLife, resetGame } = gameSlice.actions;
export default gameSlice.reducer;