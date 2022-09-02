import { BigNumber } from "ethers";

export interface Book {
  title: string;
  allBooks: number;
  borrowed: number;
}

export interface BookRawResponse {
  title: string;
  allBooks: BigNumber;
  borrowed: BigNumber;
}