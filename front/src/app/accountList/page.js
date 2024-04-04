"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';


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
       <ul>
        {accounts.map((account) => (
          <li key={account.accountId}>
            <Link href={`/accountDetail/${account.accountId}`}>
              {account.spAccountName}
            </Link>
          </li>
        ))}
      </ul>
      {/* <ul>
        {accounts.map((account, index) => (
         <li key={index}>{account.spAccountName}</li>
        ))}
      </ul> */}
    </div>
  );
}
