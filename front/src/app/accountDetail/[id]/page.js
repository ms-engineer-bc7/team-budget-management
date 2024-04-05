"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Box, Flex, Heading, Text, Image, useColorModeValue } from '@chakra-ui/react';
import AccountBalances from '@/components/accountBalances';

import Transfer from '@/components/transfer';
import Budget from '@/components/budget';

const AccountDetailPage = ({ params }) => {
  const [accountDetail, setAccountDetail] = useState(null);
  const [accountBudget, setAccountBudget] = useState(null);
  const router = useRouter();
  // const bgColor = useColorModeValue("pink.50", "purple.900");
  // const textColor = useColorModeValue("purple.700", "pink.200");
  const bgColor = useColorModeValue("pink.100", "purple.900"); // ライトモードでの背景色をピンクの明るい色に更新
  const textColor = useColorModeValue("pink.600", "pink.200"); // ライトモードでのテキスト色を濃いピンク色に更新
  const detailBgColor = "gray.100"; // 詳細ボックスの背景色をグレーの明るい色に更新
  const detailTextColor = "gray.600"; // 詳細テキストの色をグレーに更新

  console.log(params); //これでとれる

  useEffect(() => {
    const fetchAccountDetail = async () => {
      console.log('fetchAccountDetail.');//動いている
      // console.log(router);//違う形　ページズルーター
      // console.log(router.isReady);//undefind　ページズルーター
      // console.log(router.query);//undefind　ページズルーター
      if (params.id) {
        console.log('if文入った？');//
        const { id } = params;
        console.log('params.id:', params.id);//
        try {
          const response = await axios.get(`http://localhost:3002/accountList`);
          console.log('response.data:', response.data);//オブジェクト取得
          const accountData = response.data.find(account => account.accountId === id);
          setAccountDetail(accountData);
          console.log('account ID:', id);//
          console.log('accountData:', accountData);//

          const budgetAmount = Budget[id]; //予算
          console.log('Budget[id]:', Budget[id]);//
          console.log('budgetAmount:', budgetAmount);//
          setAccountBudget(budgetAmount);
        } catch (error) {
          console.error('アカウント情報の取得に失敗しました', error);
        }
      }
    };
    console.log('AccountDetailPage');//動いている
    fetchAccountDetail();
  }, [params.id]);

  if (!accountDetail) {
    return <div>Loading...</div>;
  }

  return (

    <Flex bgColor={bgColor} minHeight="100vh" align="center" justify="center" direction="column">
      <Flex align="center" justify="center" mb="5">
        <Image
          src="/images/sunabar.png"
          alt="sunabarの画像"
          boxSize="200px"
          objectFit="cover"
          mr="4"
        />
        <Box bg="lightblue" p="4" borderRadius="lg" position="relative">
          <Text fontSize="lg">貴重な経験をさせていただきありがとうございます！</Text>
          <Box position="absolute" left="-20px" top="50%" transform="translateY(-50%)" width="0" height="0" borderStyle="solid" borderColor="transparent lightblue transparent transparent" borderWidth="10px" />
        </Box>
      </Flex>

    <Box bg="white" shadow="md" borderRadius="lg" padding="6" width={["95%", "85%", "70%"]} m="4">
        <Flex direction="column" align="center" justify="center">
          <Heading as="h1" size="xl" color={textColor} marginBottom="4" textAlign="center">
          口座名: {accountDetail.spAccountName}
          </Heading>
          <Text as="h2" size="x" color={detailTextColor} marginBottom="5">
          {/* <Text fontSize="lg" color="gray.600" marginBottom="5"> */}
          口座詳細
          </Text>
          <Text fontSize="lg" color="gray.600" marginBottom="2">
          つかいわけ口座ID: {accountDetail.accountId}
          </Text>
          <Text fontSize="lg" color="gray.600" marginBottom="5">
          予算: 
          </Text>
          <Text fontSize="lg" color="gray.600" marginBottom="5">
          <AccountBalances accountId={accountDetail.accountId} />
          </Text>
          <Text fontSize="lg" color="gray.600" marginBottom="5">
          <Transfer />
          </Text>
        </Flex>
    </Box>
  </Flex>

  );
};

export default AccountDetailPage;
