import { NextPage } from "next";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { abi } from "../../../utils/abi/contract.abi.json";
import { setBooks } from "../../../utils/book/book.slice";
import { useAppDispatch } from "../../../utils/dispatch";
import useWallet from "../../../utils/wallet/useWallet";
import { BookRawResponse } from "../../../utils/wallet/wallet";
import { selectWalletAddress } from "../../../utils/wallet/wallet.slice";

export const ContractComponent: NextPage = () => {
  const { callContract } = useWallet();
  const walletAddress = useSelector(selectWalletAddress);
  const dispatch = useAppDispatch();
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [bookId, setBookId] = useState('');

  const handleSeeAllBooks = async () => {
    setResult('');
    setError('');

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

  const handleGetABook = async () => {
    setResult('');
    setError('');

    try {
      await callContract("0xd7869c879F6d6381D1107216181E923F16aFd26d", abi, "getABook", +bookId);
    } catch (e: any) {
      setError(e.message);
    }
  }

  const handleSeeOtherUsers = async () => {
    setResult('');
    setError('');

    try {
      const users = await callContract("0xd7869c879F6d6381D1107216181E923F16aFd26d", abi, "seeOtherUsers", +bookId);
      setResult(JSON.stringify(users));
    } catch (e: any) {
      setError(e.message);
    }
  }

  const handleChange = (event: any) => {
    setBookId(event.target.value);
  };

  return (
    <>
      <span>You connected with {walletAddress}</span>
      <br />
      <input type="text"
        placeholder="Set the book id to borrow a book or to see other users that have this kind of book"
        onChange={handleChange}
      />
      <br />
      <button onClick={handleSeeAllBooks}>See all books</button>
      <button onClick={handleGetABook}>Get a book</button>
      <button onClick={handleSeeOtherUsers}>See other users</button>
      <br />
      <span>Results: {result}</span>
      <span>Error: {error}</span>
    </>
  )
}

export default ContractComponent;