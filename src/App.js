import React, { useEffect } from "react";
import logo from "./logo.svg";
// import { Counter } from './features/counter/Counter';
import "./App.css";
import Transactions from "./features/transactions/Transactions";
import User from "./features/user/User";
import { useSelector } from "react-redux";
import { persistor } from "./app/store";

function App() {
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.isPro) {
      persistor.pause();
      console.log("persistor paused");
    } else {
      persistor.persist();
      console.log("persistor started");
    }
  });
  return (
    <div className="App">
      <User />
      <Transactions />
    </div>
  );
}

export default App;
