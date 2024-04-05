import React, { useState, useEffect} from 'react';
import axios from 'axios';


const Transfer = () => {
  const [accounts, setAccounts] = useState([]); // 口座リストの状態
  const [selectedDebitAccountId, setSelectedDebitAccountId] = useState(''); // 選択された振替元口座ID
  const [selectedCreditAccountId, setSelectedCreditAccountId] = useState(''); // 選択された振替先口座ID
  const [paymentAmount, setPaymentAmount] = useState('');
  const [transferData, setTransferData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // コンポーネントマウント時に口座リストを取得
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:3002/accountList');
        setAccounts(response.data); 
      } catch (error) {
        console.error('Error fetching accounts:', error);
        setError(error);
      }
    };
    fetchAccounts();
  }, []);

  const handleTransfer = async () => {
    setLoading(true);
    try {
      // `selectedAccountId` が未選択の場合のエラーチェックを追加
      if (!selectedDebitAccountId || !selectedCreditAccountId) {
        throw new Error('両方の口座を選択してください。');
      }
  
      const response = await axios.post('http://localhost:3002/transfer/', {
        depositSpAccountId: selectedDebitAccountId, 
        debitSpAccountId: selectedCreditAccountId,
        currencyCode: "JPY", // 日本円
        paymentAmount
      });
      setTransferData(response.data);
    } catch (error) {
      console.error('振替処理中にエラーが発生しました:', error);
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
      <div>
      <label>出金口座:</label>
        <select
          value={selectedCreditAccountId}
          onChange={e => setSelectedCreditAccountId(e.target.value)}
        >
          <option value="">口座を選択してください</option>
          {accounts.map(account => (
            <option key={account.accountId} value={account.accountId}>
              {account.spAccountName}
            </option>
          ))}
        </select>
      </div>  
      <div>
      <label>入金口座:</label>
        <select
          value={selectedDebitAccountId}
          onChange={e => setSelectedDebitAccountId(e.target.value)}
        >
          <option value="">口座を選択してください</option>
          {accounts.map(account => (
            <option key={account.accountId} value={account.accountId}>
              {account.spAccountName}
            </option>
          ))}
        </select>
      </div>
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
        <p>{accounts.find(account => account.accountId === selectedCreditAccountId).spAccountName}から
           {accounts.find(account => account.accountId === selectedDebitAccountId).spAccountName}へ
           {formatCurrency(transferData.paymentAmount)}入金されました</p>
      </div>
    )}
    {error && <div>エラー: {error.message}</div>}
  </div>
  );
};

export default Transfer;
