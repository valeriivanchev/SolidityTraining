import { NextPage } from "next";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { abi } from "../../../utils/abi/contract.abi.json";
import { selectBooks, setBooks } from "../../../utils/book/book.slice";
import { useAppDispatch } from "../../../utils/dispatch";
import useWallet from "../../../utils/wallet/useWallet";
import { BookRawResponse } from "../../../utils/wallet/wallet";
import { selectWalletAddress } from "../../../utils/wallet/wallet.slice";

export const ContractComponent: NextPage = () => {
  const { callContract } = useWallet();
  const walletAddress = useSelector(selectWalletAddress);
  const books = useSelector(selectBooks);
  const dispatch = useAppDispatch();
  const [result, setResult] = useState('');

  const handleSeeAllBooks = async () => {
    const seeAllBooksResponse: BookRawResponse[] = await callContract("0xd7869c879F6d6381D1107216181E923F16aFd26d", abi, "seeAllBooks");
    let seeAllBooksResponseMap = seeAllBooksResponse.map((el, index) => {
      return {
        title: el.title,
        allBooks: el.allBooks.toNumber(),
        borrowed: el.borrowed.toNumber(),
        uniqueId: index
      }
    });
    dispatch(setBooks(seeAllBooksResponseMap));
    setResult(JSON.stringify(seeAllBooksResponseMap));
  };

  return (
    <>
      <span>You connected with {walletAddress}</span>
      <br />
      <button onClick={handleSeeAllBooks}>See all books</button>
      <br />
      <span>Results: {result}</span>
    </>
  )
}

export default ContractComponent;