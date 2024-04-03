const express = require('express');
const axios = require('axios');
// import { PrismaClient } from '@prisma/client';
// import winston from 'winston';

const router = express.Router();  // ルーターを初期化
// const prisma = new PrismaClient();

router.post('/', async(req, res) => {
  console.log('Received POST request on /');
    const options = {
      method: 'POST',
      url: 'https://api.sunabar.gmo-aozora.com/personal/v1/transfer/spaccounts-transfer',
      headers: {
        'Accept': 'application/json;charset=UTF-8',
        'Content-Type': 'application/json;charset=UTF-8',
        'x-access-token': 'ZGY3ZWRhMzkxMzNhNmExOTBjN2EwMmM0'
      },
      data: {  // ここをbodyからdataに変更
        "depositSpAccountId":"SP50220608077",   //req.body.depositSpAccountId,
        "debitSpAccountId":"SP30110008396",   //req.body.debitSpAccountId,
        "currencyCode":"JPY",   //req.body.currencyCode,
        "paymentAmount":"1000"  //req.body.paymentAmount
      },
      json: true
    };

    try {
        const response = await axios(options);
        console.log(response.data);
        res.send(response.data);
    } catch (error) {
        console.error('Error making request:', error);
        res.status(500).send(error.response ? error.response.data : 'Server error');
    }
});

module.exports = router;