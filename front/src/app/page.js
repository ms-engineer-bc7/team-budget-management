"use client";

import { useState, useEffect } from 'react';
import { Image ,Heading, Flex, Box, Link, ChakraProvider ,useColorModeValue, Icon,Text} from '@chakra-ui/react';
import { FaPiggyBank } from 'react-icons/fa';
import Balance from '@/components/balance';
import Transfer from '@/components/transfer';
import AccountList from './accountList/page';
import axios from 'axios';
// import { useRouter } from 'next/navigation';

export default function Home() {
  const bgColor = useColorModeValue("pink.50", "purple.900");
  const textColor = useColorModeValue("purple.700", "pink.200");

  return (
    <ChakraProvider>
          <Flex bgColor={bgColor} minHeight="100vh" direction="column" align="center" justify="center" padding="5">
          <Flex direction="row" align="center" justify="center" mb="5">
          <Image
          src="/images/sunabar.png" // 画像のパスを指定
          alt="subabar"
          boxSize="200px" // 画像のサイズを設定
          objectFit="cover" // 画像の比率を保ちながら、指定したボックスに合わせて表示
          mr="4"
        />
         <Box bg="lightblue" p="4" borderRadius="lg" position="relative" >
         <Text fontSize="lg">一週間ありがとうございました！</Text>
         <Box position="absolute" left="-20px" top="50%" transform="translateY(-50%)" width="0" height="0" borderStyle="solid" borderColor="transparent lightblue transparent transparent" borderWidth="10px" />
         </Box>
        </Flex>
        <Box bg="white" shadow="md" borderRadius="lg" padding="6" width={["95%", "85%", "70%"]}>
          <Flex direction="column" align="center" justify="center">
            <Icon as={FaPiggyBank} w={10} h={10} color="pink.400" />
            <Heading as="h2" size="xl" color={textColor} marginBottom="4" textAlign="center">
            生活費予算管理簿
          </Heading>
          <Heading as="h3" fontSize="lg" color="gray.600" marginBottom="5" textAlign="center">
              <Balance /> 
          </Heading>
          <Heading as="h3" fontSize="lg" color="gray.600" marginBottom="5" textAlign="center">

          </Heading>
          <Heading as="h3" fontSize="lg" color="gray.600" marginBottom="5" textAlign="center">
             項目（つかいわけ口座）
          </Heading>
             <AccountList />
          </Flex>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
