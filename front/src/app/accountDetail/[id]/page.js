import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AccountDetail = () => {
  const [accountDetail, setAccountDetail] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchAccountDetail = async () => {
        try {
          // バックエンドにアカウント詳細をリクエスト
          const response = await axios.get(`http://localhost:3002/accounts/${id}`);
          setAccountDetail(response.data);
        } catch (error) {
          console.error('口座詳細の取得に失敗しました', error);
        }
      };
      fetchAccountDetail();
    }
  }, [id]);

  if (!accountDetail) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Account Detail</h1>
      {/* ここで accountDetail の内容を表示 */}
      <p>Account ID: {accountDetail.accountId}</p>
      <p>Account Name: {accountDetail.spAccountName}</p>
      {/* その他の詳細情報 */}
    </div>
  );
};

export default AccountDetail;
