import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { ThemeState } from "../../Interfaces/slice";


const  initialState :ThemeState ={
    darkMode:false

}

const themeSlice= createSlice({
    name:'theme',
    initialState,
    reducers:{
        toggleTheme(state) {
            state.darkMode = !state.darkMode;
          },
        setTheme(state, action: PayloadAction<boolean>) {
            state.darkMode = action.payload;
          },
    }
})
export const { setTheme ,toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;