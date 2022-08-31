pragma solidity 0.8.3;

contract BookStore {
    address public owner;
    uint private numberOfBooks;
    
    struct Book{
        string title;
        uint256 borrowed;
        uint256 allBooks;
    }

     Book[] availibleBooks;
     mapping(string => address[]) userBooks;

    constructor(){
        owner = msg.sender;
    }

    function addNewBook(Book calldata book) public  {
        require(msg.sender == owner, "Not the owner");
        availibleBooks.push(book);
    }

    function seeAllBooks() public view returns (Book[] memory){
        return availibleBooks;
    }

    modifier checkIfBookwasBorrowed(uint256 bookId){
        for(uint i=0;i<userBooks[availibleBooks[bookId].title].length;i=i+1){
            require(userBooks[availibleBooks[bookId].title][i] != msg.sender,"You already have the book");
        }
        _;
    }

    function getABook(uint256 bookId) public checkIfBookwasBorrowed(bookId){
        require(availibleBooks[bookId].borrowed < availibleBooks[bookId].allBooks, "No availible books");
        availibleBooks[bookId].borrowed++;
        userBooks[availibleBooks[bookId].title].push(msg.sender);
    }

    function seeOtherUsers(uint256 bookId) public view returns(address[] memory){
        return userBooks[availibleBooks[bookId].title];
    }
}
