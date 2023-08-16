import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { syncTransactions } from "../transactions/transactionsSlice";

export const fetchLogin = createAsyncThunk("user/fetchLogin", async () => {
  const userCredential = await signInWithEmailAndPassword(auth, "mohans8050@gmail.com", "123456");
  return userCredential.user;
});
export const fetchLogOut = createAsyncThunk("user/fetchLogOut", async () => {
  return await signOut(auth);
});

// this is only for testing in real app make user to sync data.
export const HandletoggleProship = createAsyncThunk(
  "user/toggleProship",
  async (isPro, thunkAPI) => {
    const user = thunkAPI.getState().user;
    const dispatch = thunkAPI.dispatch;
    if (user.isPro) {
      dispatch(toggleProship(false));
    } else {
      dispatch(toggleProship(true));
      console.log("uploading data to cloud");
      dispatch(syncTransactions());
      console.log("Done uploading data to cloud");
    }
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState: { email: "", uid: "", isPro: false },
  reducers: {
    toggleProship: (state, action) => {
      state.isPro = action.payload;
      console.log("state changed from " + !state.isPro + " to " + state.isPro);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      console.log("payload success", action.payload, state);
      const user = action.payload;

      state.email = user.email;
      state.uid = user.uid;
      state.isPro = true;
      //   state.isMigrated = true;
      console.log("done", action.payload);
    });
    builder.addCase(fetchLogOut.fulfilled, (state, action) => {
      state = null;
      console.log("done logout");
    });
  },
});

export const { login, toggleProship } = UserSlice.actions;
export default UserSlice.reducer;
