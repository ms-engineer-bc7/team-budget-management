"use client";
import { useState, useEffect } from 'react';
import { Heading, Flex, Box, Link, ChakraProvider } from '@chakra-ui/react';
import Balance from '@/components/balance';

// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// 子口座の型定義
// interface Account {
//   id: number;
//   name: string; //子口座名
//   budget: number; // この口座の予算
//   balance: number; // 現在の残高
// }

export default function Home() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/accounts/');
        const sortedAccounts = response.data.accounts.sort((a, b) => a.id - b.id); //ソート
        setAccounts(sortedAccounts);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
    fetchAccounts();
  }, []);

  return (
    <ChakraProvider>
      <Flex direction="column" align="center" justify="center" margin="10">
        <Box padding="5" width="70%" >
          <Heading as="h2" size="xl" marginBottom="5" textAlign="center">
            生活費予算管理
          </Heading>
          <Heading as="h3" fontSize="20" marginBottom="5" textAlign="center">
          <Balance />
             つかいわけ口座一覧
          </Heading>  
          {accounts.map(account => (
            <Flex as="li" key={account.id} justifyContent="center" marginBottom="2">
              <Link
                href={`/accountDetail/${account.id}`}
                _hover={{ textDecoration: 'underline', color: 'blue.500' }}
              >
                {account.name}
              </Link>
            </Flex>
          ))}
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
