// import React from "react";

// function Transactions() {
//   return <div>Transactions</div>;
// }

// export default Transactions;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../resources/Transactions.css";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions from the backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("/api/transactions");
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="transactions-container">
      <h2 className="transactions-title">Transactions Management</h2>

      {/* Transactions Table */}
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Date</th>
            <th>Transaction ID</th>
            <th>Payment Method</th>
            <th>Amount Paid</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.transactionId}>
                <td>{transaction.bookingId}</td>
                <td>{transaction.date}</td>
                <td>{transaction.transactionId}</td>
                <td>{transaction.paymentMethod}</td>
                <td>{transaction.amountPaid}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-transactions">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
