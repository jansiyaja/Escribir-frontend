import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { AdState } from "../../Interfaces/slice";




const  initialState :AdState ={
 advertisement:null
   

}

const adSlice= createSlice({
    name:'advertisement',
    initialState,
    reducers: {
         setAdvertisement: (state, action: PayloadAction<AdState['advertisement']>) => {
      state.advertisement = action.payload;
        },
         clearAdvertisement: (state) => {
      state.advertisement = null;
    },
       
    }
})
export const { setAdvertisement, clearAdvertisement } = adSlice.actions;
export default adSlice.reducer;