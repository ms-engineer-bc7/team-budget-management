"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AccountDetailPage = () => {
  const [accountDetail, setAccountDetail] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAccountDetail = async () => {
      if (router.isReady) {
        const { id } = router.query;
        try {
          const response = await axios.get(`http://localhost:3002/accountList`);
          const accountData = response.data.find(account => account.accountId === id);
          setAccountDetail(accountData);
        } catch (error) {
          console.error('アカウント情報の取得に失敗しました', error);
        }
      }
    };

    fetchAccountDetail();
  }, [router.isReady, router.query]);

  if (!accountDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>口座詳細</h1>
      <p>Account ID: {accountDetail.accountId}</p>
      <p>Account Name: {accountDetail.spAccountName}</p>
      {/* その他の情報があれば表示 */}
    </div>
  );
};

export default AccountDetailPage;