// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract BookStore {
    address public owner;
    uint private numberOfBooks;
    
    struct Book{
        string title;
        uint256 borrowed;
        uint256 allBooks;
    }

     Book[] availibleBooks;
     mapping(uint256 => address[]) userBooks;

    constructor(){
        owner = msg.sender;
    }

    function addNewBook(string calldata title, uint256 allBooks) public  {
        require(msg.sender == owner, "Not the owner");
        Book memory book = Book(title,0,allBooks);
        availibleBooks.push(book);
    }

    function seeAllBooks() public view returns (Book[] memory){
        return availibleBooks;
    }

    modifier checkIfBookwasBorrowed(uint256 bookId){
        for(uint i=0;i<userBooks[bookId].length;i=i+1){
            require(userBooks[bookId][i] != msg.sender,"You already have the book");
        }
        _;
    }

    function getABook(uint256 bookId) public checkIfBookwasBorrowed(bookId){
        require(availibleBooks[bookId].borrowed < availibleBooks[bookId].allBooks, "No availible books");
        availibleBooks[bookId].borrowed++;
        userBooks[bookId].push(msg.sender);
    }

    function seeOtherUsers(uint256 bookId) public view returns(address[] memory){
        return userBooks[bookId];
    }
}
