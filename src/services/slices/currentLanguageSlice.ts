import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLanguage: 'en',
};
const currentLanguageSlice = createSlice({
  name: 'currentLanguage',
  initialState,
  reducers: {
    setCurrentLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const { setCurrentLanguage } = currentLanguageSlice.actions;
export default currentLanguageSlice.reducer;
