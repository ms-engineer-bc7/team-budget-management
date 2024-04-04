"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AccountList() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get("http://localhost:3002/accountList");
        setAccounts(response.data); 
      } catch (error) {
        console.error('口座の取得に失敗しました', error);
      }
    };

    fetchAccounts(); 
  }, []);

  return (
    <div>
      {/* <h1>口座一覧</h1> */}
      <ul>
        {accounts.map((account, index) => (
          <li key={index}>{account}</li>
        ))}
      </ul>
    </div>
  );
}
