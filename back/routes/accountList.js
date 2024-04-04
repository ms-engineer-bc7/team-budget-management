var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
  var options = {
    method: 'GET',
    url: 'https://api.sunabar.gmo-aozora.com/personal/v1/accounts',
    headers: {
      Accept: 'application/json;charset=UTF-8',
      'Content-Type': 'application/json;charset=UTF-8',
      'x-access-token': 'ZGY3ZWRhMzkxMzNhNmExOTBjN2EwMmM0'
    }
  };

  request(options, function (error, response, body) {
    if (error) {
      console.error(error);
      res.status(500).send('APIからデータを取得できませんでした。');
      return;
    }
    try {
       const parsedBody = JSON.parse(body);
       const accountDetails = parsedBody.spAccounts.map(function(account) {
        return {
          accountId: account.accountId,
          spAccountName: account.spAccountName
        };
      });
      res.json(accountDetails);
    } catch (parseError) {
      console.error(parseError);
      res.status(500).send('レスポンスのパースに失敗しました。');
    }
  });
});

module.exports = router;