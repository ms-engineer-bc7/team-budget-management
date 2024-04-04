import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AccountBalances = ({ accountId }) => { // accountIdをpropsとして受け取る
    const [balance, setBalances] = useState({});

    useEffect(() => {
        const fetchBalances = async () => {
            try {
                // APIエンドポイントにaccountIdを埋め込んでリクエストを送る
                const response = await axios.get(`http://localhost:3002/subAccountBalance/${accountId}`);
　　　　　　　　　　setBalances(response.data);

                // const response = await axios.get('http://localhost:3002/subAccountBalance/${accountId}');
                // setBalances(response.data);
            } catch (error) {
                console.error('Error fetching account balances:', error);
            }
        };

        fetchBalances();
    }, [accountId]);// accountIdが変更された場合に再フェッチ

    return (
        <div>
              {/* アカウントIDを表示せず、残高(odBalance)のみを表示 */}
              <div>残高: ￥{new Intl.NumberFormat('ja-JP').format(balance.odBalance)}-</div>
        </div>
    );
};

export default AccountBalances;
