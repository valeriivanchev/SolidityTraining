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
        borrowed: number;
    }

    const Book = {
        title: "Test Book",
        allBooks: 10,
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
        const allBooks: Book[] = await bookStore.seeAllBooks();
        expect(allBooks[0].title).to.equal(Book.title);
        expect(allBooks[0].allBooks).to.equal(Book.allBooks);
    });

    it('Borrow a book', async () => {
        const tnx = await bookStore.getABook(0);
        await tnx.wait();
        const allBooks: Book[] = await bookStore.seeAllBooks();
        expect(allBooks[0].borrowed).to.equal(1);
    });

    it('Try getting the same book', async () => {
        expect(bookStore.getABook(0)).to.be.revertedWith('You already have the book');
    });

    it('Get a book from another user', async () => {
        const tnx = await bookStore.connect(accounts[1]).getABook(0);
        await tnx.wait();
        const allBooks: Book[] = await bookStore.seeAllBooks();
        expect(allBooks[0].borrowed).to.equal(2);
    });

    it('Try adding book if not owner', async () => {
        expect(bookStore.connect(accounts[1]).addNewBook(Book.title, Book.allBooks)).to.be.revertedWith('Not the owner');
    });

    it('See the other users', async () => {
        const userAddresses = await bookStore.seeOtherUsers(0);
        expect(userAddresses[0]).to.equal(accounts[0].address);
    });

    it('See all books', async () => {
        const books: Book[] = await bookStore.seeAllBooks();
        expect(books[0].title).to.equal(Book.title);
        expect(books[0].borrowed).to.equal(2);
        expect(books[0].allBooks).to.equal(Book.allBooks);
    })
})