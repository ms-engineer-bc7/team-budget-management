"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Box, Heading, Text, Input, Button } from '@chakra-ui/react';

const AccountDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/api/v1/accounts/${id}`)
        .then(response => setAccount(response.data))
        .catch(error => console.error('Error fetching account details:', error));
    }
  }, [id]);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // ここで振替のAPIを呼び出し、振替処理を行う
    //APIエンドポイントに対して振替情報を送信する処理
    console.log('Transfer amount:', amount);
  };

  if (!account) return <div>Loading...</div>;

  return (
    <Box>
      <Heading>{account.name}</Heading>
      <Text>予算: {account.budget}</Text>
      <Text>残高: {account.balance}</Text>

      <form onSubmit={handleSubmit}>
        <Input type="number" value={amount} onChange={handleAmountChange} placeholder="振替金額" />
        <Button type="submit">振替</Button>
      </form>
    </Box>
  );
};

export default AccountDetail;
