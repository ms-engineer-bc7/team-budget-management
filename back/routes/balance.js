const express = require("express");
const router = express.Router();
const axios = require("axios"); // axiosをrequire

// 日付をフォーマットする関数
function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

// 金額をフォーマットする関数（例: ¥1,000）
function formatCurrency(amount) {
  return `¥${Number(amount).toLocaleString()}`;
}

// /balanceへのGETリクエストに対する処理
router.get("/", async (req, res) => {
  console.log("Received a request to /balance");
  try {
    const response = await axios.get(
      "https://api.sunabar.gmo-aozora.com/personal/v1/accounts/balances",
      {
        headers: {
          Accept: "application/json;charset=UTF-8",
          "Content-Type": "application/json;charset=UTF-8",
          "x-access-token": "ZGY3ZWRhMzkxMzNhNmExOTBjN2EwMmM0", // 実際のアプリでは安全に管理
        },
      }
    );

    // ここでAPIからの応答をコンソールに出力
    console.log("API Response:", response.data);

    const balancesData = response.data.balances.map((account) => ({
      日付:formatDate(account.baseDate),
      残高: formatCurrency(account.balance),
    }));

    res.json(balancesData);
    // res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
