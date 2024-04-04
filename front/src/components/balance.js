import React, { useState, useEffect } from 'react';

const Balance = () => {
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    // APIからデータをフェッチする関数
    const fetchBalances = async () => {
      try {
        const response = await fetch('http://localhost:3002/balance');
        const data = await response.json();
        setBalances(data);
      } catch (error) {
        console.error('残高の取得に失敗しました:', error);
      }
    };

    // コンポーネントがマウントされたらデータをフェッチする
    fetchBalances();
  }, []); // 空の依存配列を渡すことで、コンポーネントのマウント時にのみ実行される

  return (
    <div>
      <h1>残高情報</h1>
      {balances.length > 0 ? (
        <ul>
          {balances.map((balance, index) => (
            <li key={index}>
              {/* キーをバックエンドの応答データに合わせて変更 */}
              日付: {balance.日付}, 残高: {balance.残高}-
            </li>
          ))}
        </ul>
      ) : (
        <p>残高情報がありません。</p>
      )}
    </div>
  );
};

export default Balance;
