import { createSlice } from '@reduxjs/toolkit';

import * as profileAction from '../asyncActions/profile';

const initialState = {
  user: {},
};

const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(profileAction.getDataUser.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload.results;
    });
    builder.addCase(profileAction.editData.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload.results;
    });
  },
});

// export const {} = profile.actions;

export default profile.reducer;
