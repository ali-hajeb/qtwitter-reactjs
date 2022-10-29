import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '#4dabf7',
};

const profileColorSlice = createSlice({
  name: 'profileColor',
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default profileColorSlice.reducer;
