const express = require('express');
const router = express.Router();
const axios = require("axios"); // axiosをrequire

router.get('/:accountId', async (req, res) => {
    const accountId = req.params.accountId;

    try {
        const response = await axios.get(
            "https://api.sunabar.gmo-aozora.com/personal/v1/accounts/balances",
            {
              headers: {
                Accept: "application/json;charset=UTF-8",
                "Content-Type": "application/json;charset=UTF-8",
                "x-access-token": "ZGY3ZWRhMzkxMzNhNmExOTBjN2EwMmM0", // 安全のために、本番環境では環境変数から取得してください
              }
        });

        // HTTPステータスコードを直接確認
        if (response.status !== 200) {
            throw new Error(`API call failed with HTTP status ${response.status}`);
        }

        // Axiosは自動的にレスポンスボディをJSONとしてパースします
        const data = response.data;

        const accountBalance = data.spAccountBalances.find(account => account.accountId === accountId);
        if (accountBalance) {
            res.json({
                accountId: accountBalance.accountId,
                odBalance: accountBalance.odBalance
            });
        } else {
            res.status(404).send('サブ口座が見つかりません！');
        }
       
    } catch (error) {
        console.error(`Failed to fetch sub-account balance: ${error}`);
        // エラーレスポンスで更に適切なエラーメッセージを提供
        res.status(500).send(`Internal Server Error: ${error.message}`);
    }
});
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(
            "https://api.sunabar.gmo-aozora.com/personal/v1/accounts/balances",
            {
                headers: {
                    Accept: "application/json;charset=UTF-8",
                    "Content-Type": "application/json;charset=UTF-8",
                    "x-access-token": "ZGY3ZWRhMzkxMzNhNmExOTBjN2EwMmM0", // 安全のために、本番環境では環境変数から取得してください
                }
            }
        );

        if (response.status !== 200) {
            throw new Error(`API call failed with HTTP status ${response.status}`);
        }

        const data = response.data;

        // accountIdとodBalanceのみを含む新しい配列を作成
        const accounts = data.spAccountBalances.map(account => ({
            accountId: account.accountId,
            odBalance: account.odBalance
        }));

        res.json(accounts);
    } catch (error) {
        console.error(`Failed to fetch account balances: ${error}`);
        res.status(500).send(`Internal Server Error: ${error.message}`);
    }
});


module.exports = router;

