// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract BookStore is Ownable {
    struct Book {
        string title;
        uint32 allBooks;
    }
    event BorrowBook(address user, bytes32 bookId);
    event AddBook(Book book);

    mapping(bytes32 => Book) public availibleBooks;
    bytes32[] public bookIds;
    mapping(address => mapping(bytes32 => bool)) booksByUsers;
    mapping(bytes32 => uint32) numberOfBorrowedBooks;
    mapping(bytes32 => address[]) userBooks;

    constructor() {}

    function addNewBook(string calldata title, uint32 allBooks)
        public
        onlyOwner
    {
        Book memory book = Book(title, allBooks);
        bytes32 bookId = keccak256(abi.encodePacked(title, title));
        if (availibleBooks[bookId].allBooks == 0) {
            bookIds.push(bookId);
        }
        availibleBooks[bookId] = book;
        emit AddBook(book);
    }

    function getBookIdLength() public view returns (uint256) {
        return bookIds.length;
    }

    modifier checkIfUserCanBorrowABook(bytes32 bookId) {
        require(
            booksByUsers[msg.sender][bookId] != true,
            "You already have the book"
        );
        require(
            numberOfBorrowedBooks[bookId] < availibleBooks[bookId].allBooks,
            "No availible books"
        );
        _;
    }

    function borrowBook(bytes32 bookId)
        public
        checkIfUserCanBorrowABook(bookId)
    {
        booksByUsers[msg.sender][bookId] = true;
        userBooks[bookId].push(msg.sender);
        numberOfBorrowedBooks[bookId]++;

        emit BorrowBook(msg.sender, bookId);
    }

    function seeOtherUsers(bytes32 bookId)
        public
        view
        returns (address[] memory)
    {
        return userBooks[bookId];
    }
}
