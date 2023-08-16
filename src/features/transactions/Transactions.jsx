import { useEffect, useState } from "react";
import { add, getTransactions, postTransactions } from "./transactionsSlice";
import { useDispatch, useSelector } from "react-redux";
function Transactions() {
  const [addv, setAddv] = useState({
    reason: "",
    amount: "",
    type: "",
    category: "",
    pyment_method: "",
    date: "",
  });
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user);
  const tran = useSelector((s) => s.transactions);
  useEffect(() => {
    if (user.isPro) {
      dispatch(getTransactions());
    }
  }, []);
  console.log(tran);
  return (
    <div style={{ width: "95vw", height: "95vh", display: "flex", flexDirection: "column" }}>
      <h4>Transactions</h4>
      <table>
        <thead align="left">
          <tr>
            <th>Reason</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody align="left">
          {tran.map((t, i) => (
            <tr key={i}>
              <td>{t.reason}</td>
              <td>{t.date}</td>
              <td>₹ {t.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <label>
        type
        <input
          type="text"
          value={addv.type}
          onChange={(e) => setAddv((ps) => ({ ...ps, type: e.target.value }))}
          placeholder="for milk,for grosary...."
        />
      </label>
      <label>
        category
        <input
          type="text"
          value={addv.category}
          onChange={(e) => setAddv((ps) => ({ ...ps, category: e.target.value }))}
          placeholder="for milk,for grosary...."
        />
      </label>
      <label>
        Reason
        <input
          type="text"
          value={addv.reason}
          onChange={(e) => setAddv((ps) => ({ ...ps, reason: e.target.value }))}
          placeholder="for milk,for grosary...."
        />
      </label>
      <label>
        pyment_method
        <input
          type="text"
          value={addv.pyment_method}
          onChange={(e) => setAddv((ps) => ({ ...ps, pyment_method: e.target.value }))}
          placeholder="for milk,for grosary...."
        />
      </label>
      <label>
        date
        <input
          type="date"
          value={addv.date}
          onChange={(e) => setAddv((ps) => ({ ...ps, date: e.target.value }))}
          placeholder="for milk,for grosary...."
        />
      </label>
      <label>
        Amount
        <span>Rs.</span>
        <input
          type="text"
          placeholder="Amount"
          value={addv.amount}
          onChange={(e) => setAddv((ps) => ({ ...ps, amount: e.target.value }))}
        />
      </label>
      <button onClick={(e) => dispatch(postTransactions(addv))}>Submit</button>
    </div>
  );
}

export default Transactions;
