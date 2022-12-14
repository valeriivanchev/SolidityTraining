import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe('BookStore', () => {
    let bookStoreFactory;
    let bookStore: any;
    let accounts: SignerWithAddress[];

    interface Book {
        title: string;
        allBooks: number;
    }

    const Book = {
        title: "Test Book",
        allBooks: 2,
    }

    before(async () => {
        bookStoreFactory = await ethers.getContractFactory('BookStore');
        bookStore = await bookStoreFactory.deploy();
        accounts = await ethers.getSigners();
        await bookStore.deployed();
    });

    it('Add a new book', async () => {
        const tnx = await bookStore.addNewBook(Book.title, Book.allBooks);
        await tnx.wait();
        const allBooks: Book = await bookStore.availibleBooks(await bookStore.bookIds(0));
        expect(allBooks.title).to.equal(Book.title);
        expect(allBooks.allBooks).to.equal(Book.allBooks);
        const getBookIdsLength = await bookStore.getBookIdLength();
        expect(getBookIdsLength).to.equal(1);
    });

    it('Borrow a book', async () => {
        const bookId = await bookStore.bookIds(0);
        const tnx = await bookStore.borrowBook(bookId);
        await tnx.wait();
        const otherUsers: Book[] = await bookStore.seeOtherUsers(bookId);
        expect(otherUsers[0]).to.equal(accounts[0].address)
    });

    it('Try getting the same book', async () => {
        expect(bookStore.borrowBook(await bookStore.bookIds(0))).to.be.revertedWith('You already have the book');
    });

    it('Get a book from another user', async () => {
        const bookId = await bookStore.bookIds(0);
        const tnx = await bookStore.connect(accounts[1]).borrowBook(bookId);
        await tnx.wait();
        const otherUsers: string[] = await bookStore.seeOtherUsers(bookId);
        expect(otherUsers[1]).to.equal(accounts[1].address);
    });

    it('Try adding book if not owner', async () => {
        expect(bookStore.connect(accounts[1]).addNewBook(Book.title, Book.allBooks)).to.be.revertedWith('Not the owner');
    });

    it('Try getting more books than the max number', async () => {
        expect(bookStore
            .connect(accounts[2])
            .borrowBook(await bookStore.bookIds(0))).to.be
            .revertedWith('No availible books');
    });

    it('Return a book and get one from another user', async () => {
        const bookId = await bookStore.bookIds(0);
        const tnx = await bookStore.connect(accounts[1]).returnBook(bookId);
        await tnx.wait();
        const borrowTnx = await bookStore.connect(accounts[2]).borrowBook(bookId);
        await borrowTnx.wait();
        const otherUsers: string[] = await bookStore.seeOtherUsers(bookId);
        expect(otherUsers[2]).to.equal(accounts[2].address);
    });

    it('Try returning the same book ', async () => {
        const bookId = await bookStore.bookIds(0);
        expect(bookStore.connect(accounts[1]).returnBook(bookId)).to.be.revertedWith(`You don't have the book`);
    });
})