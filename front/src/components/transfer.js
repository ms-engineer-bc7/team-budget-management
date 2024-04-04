import React, { useState } from 'react';
import axios from 'axios';

const Transfer = () => {
  const [depositSpAccountId, setDepositSpAccountId] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [transferData, setTransferData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTransfer = async () => {
    console.log('handleTransfer is called'); // デバッグのために追加
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3002/transfer/', {
        depositSpAccountId,
        debitSpAccountId: "SP30110008396", //親口座固定
        currencyCode: "JPY", //日本円
        paymentAmount
      });
      setTransferData(response.data);
    } catch (error) {
      console.error('Error making transfer:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // 日付をフォーマットする関数
  const formatDate = (dateString) => {
    // ISO 8601 形式の日付を "YYYY-MM-DD HH:MM" 形式に変換
    const date = dateString.split('T')[0]; // "2024-04-04"
    const time = dateString.split('T')[1].slice(0, 5); // "11:42"
    return `${date} ${time}`;
  };

  // 金額をフォーマットする関数
  const formatCurrency = (amount) => {
    return `${Number(amount).toLocaleString()}円`; //3桁区切り+円
  };

  return (
    <div>
      <h1>つかいわけ口座振替</h1>
      <div>
        <input
          type="text"
          value={depositSpAccountId}
          onChange={e => setDepositSpAccountId(e.target.value)}
          placeholder="つかいわけ口座AccountID"
        />
        <input
          type="text"
          value={paymentAmount}
          onChange={e => setPaymentAmount(e.target.value)}
          placeholder="入金金額"
        />
        <button onClick={handleTransfer} disabled={loading}>
          {loading ? '処理中...' : '振替実行'}
        </button>
      </div>
      {transferData && (
        <div>
          <h2>振替完了</h2>
          <p>{formatDate(transferData.acceptDatetime)}</p>
          <p>口座名：{transferData.depositSpAccountId}</p>
          <p>入金額：{formatCurrency(transferData.paymentAmount)}</p>
        </div>
      )}
      {error && <div>エラー: {error.message}</div>}
    </div>
  );
};


export default Transfer;
