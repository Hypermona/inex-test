import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { syncTransactions } from "../transactions/transactionsSlice";
import { fetchLogin, fetchLogOut, HandletoggleProship } from "./userSlice";

function User() {
  const user = useSelector((state) => state.user);
  //   console.log(user);
  const dispatch = useDispatch();
  return (
    <div>
      {/* {user ? <h5>{user} logged in successfuly</h5> : null} */}
      <button onClick={() => dispatch(fetchLogin())}>Login</button>
      <button onClick={() => dispatch(syncTransactions())}>Sync</button>
      <button onClick={() => dispatch(fetchLogOut())}>logout</button>
      <button onClick={() => dispatch(HandletoggleProship())}>
        {user.isPro ? "turn off is Pro" : "turn on is Pro"}
      </button>
    </div>
  );
}

export default User;
