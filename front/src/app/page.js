"use client";
import { useState, useEffect } from 'react';
import { Heading, Flex, Box, Link, ChakraProvider } from '@chakra-ui/react';
import Balance from '@/components/balance';
import Transfer from '@/components/transfer';
import AccountList from './accountList/page';
import axios from 'axios';
// import { useRouter } from 'next/navigation';

// 子口座の型定義
// interface Account {
//   id: number;
//   name: string; //子口座名
//   budget: number; // この口座の予算
//   balance: number; // 現在の残高
// }

export default function Home() {


  return (
    <ChakraProvider>
      <Flex direction="column" align="center" justify="center" margin="10">
        <Box padding="5" width="70%" >
          <Heading as="h2" size="xl" marginBottom="5" textAlign="center">
            生活費予算管理
          </Heading>
          <Heading as="h3" fontSize="20" marginBottom="5" textAlign="center">
          <Balance />
          <Transfer />
             つかいわけ口座一覧
          </Heading> 
          <AccountList />
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
