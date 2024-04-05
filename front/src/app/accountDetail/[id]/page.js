"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AccountBalances from '@/components/accountBalances';

import Transfer from '@/components/transfer';
import Budget from '@/components/budget';

const AccountDetailPage = ({ params }) => {
  const [accountDetail, setAccountDetail] = useState(null);
  const [accountBudget, setAccountBudget] = useState(null);
  const router = useRouter();

  console.log(params); //これでとれる

  useEffect(() => {
    const fetchAccountDetail = async () => {
      console.log('fetchAccountDetail.');//動いている
      // console.log(router);//違う形　ページズルーター
      // console.log(router.isReady);//undefind　ページズルーター
      // console.log(router.query);//undefind　ページズルーター
      if (params.id) {
        console.log('if文入った？');//
        const { id } = params;
        console.log('params.id:', params.id);//
        try {
          const response = await axios.get(`http://localhost:3002/accountList`);
          console.log('response.data:', response.data);//オブジェクト取得
          const accountData = response.data.find(account => account.accountId === id);
          setAccountDetail(accountData);
          console.log('account ID:', id);//
          console.log('accountData:', accountData);//

          const budgetAmount = Budget[id]; //予算
          console.log('Budget[id]:', Budget[id]);//
          console.log('budgetAmount:', budgetAmount);//
          setAccountBudget(budgetAmount);
        } catch (error) {
          console.error('アカウント情報の取得に失敗しました', error);
        }
      }
    };
    console.log('AccountDetailPage');//動いている
    fetchAccountDetail();
  }, [params.id]);

  if (!accountDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>口座詳細</h1>
      <p>つかいわけ口座ID: {accountDetail.accountId}</p>
      <p>口座名: {accountDetail.spAccountName}</p>
      <div>予算: ￥{new Intl.NumberFormat('ja-JP').format(accountBudget)}-</div>
      <AccountBalances accountId={accountDetail.accountId} />
      <Transfer />
    </div>
  );
};

export default AccountDetailPage;