import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { doc, collection, addDoc, writeBatch, getDocs } from "firebase/firestore";
import uncommonEntries from "../../utils/uncommonEntries";

let initialState = [];

export const syncTransactions = createAsyncThunk("transactions/sync", async (_, thunkAPI) => {
  //getting existing data from cloud
  console.log("synchronization is started>>>>");
  const user = thunkAPI.getState().user;
  if (user?.isPro === true) {
    const results = await getDocs(collection(db, "transactions"));
    const cloudTransactions = [];
    results.docs.forEach((doc) => {
      cloudTransactions.push({ ...doc.data(), id: doc.id });
    });
    console.log("cloud transaction data", cloudTransactions);
    // getting local data
    const localTransactions = thunkAPI.getState().transactions;
    console.log("local transaction data", localTransactions);
    // comparing and removing duplicate data
    const transactions = uncommonEntries(cloudTransactions, localTransactions);
    if (transactions.length <= 0) {
      console.log(" trasactions are alreday synchronized :)");
      return null;
    }
    const batch = writeBatch(db);
    transactions.forEach((transaction) => {
      delete transaction.id;
      console.log("the syncronysing data", transaction);
      batch.set(doc(collection(db, "transactions")), transaction);
    });
    const batchResult = await batch.commit();
    console.log("batch result", batchResult);
    return null;
  }
});
export const postTransactions = createAsyncThunk(
  "transactions/post",
  async (transactionData, thunkAPI) => {
    const state = thunkAPI.getState();
    console.log(state);
    if (state?.user?.isPro === true) {
      const results = await addDoc(collection(db, "transactions"), transactionData);
      return { ...transactionData, id: results.id };
    } else {
      thunkAPI.dispatch(add(transactionData));
    }
  }
);
export const getTransactions = createAsyncThunk("transactions/get", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  console.log("inside get transactions", state);
  if (state?.user?.isPro === true) {
    const results = await getDocs(collection(db, "transactions"));
    const transactions = [];
    results.docs.forEach((doc) => {
      transactions.push({ ...doc.data(), id: doc.id });
    });
    return transactions;
  }
});

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
      console.log("success local add data", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postTransactions.fulfilled, (state, action) => {
      if (action.payload) {
        state.push(action.payload);
      }
      console.log("success cloud post Data", action.payload);
      return state;
    });
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      console.log("success cloud get Data", action.payload);
      return action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { add } = transactionsSlice.actions;
export default transactionsSlice.reducer;
