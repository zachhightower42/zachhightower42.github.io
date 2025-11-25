-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-10-10 01:35:27.484

-- tables
-- Table: Branch_book
CREATE TABLE Branch_book (
    Num_copies int  NOT NULL,
    BranchNum int  NOT NULL,
    ISBN int  NOT NULL,
    CONSTRAINT Branch_book_pk PRIMARY KEY (BranchNum,ISBN)
) COMMENT 'bridge between branch and books for the database';

-- Table: book
CREATE TABLE book (
    ISBN int  NOT NULL,
    Title varchar(30)  NOT NULL,
    Author varchar(30)  NOT NULL,
    Publisher varchar(30)  NOT NULL,
    CONSTRAINT book_pk PRIMARY KEY (ISBN)
) COMMENT 'Book within the branch of the library
';

-- Table: branch
CREATE TABLE branch (
    BranchNum int  NOT NULL,
    Branch_Addr varchar(30)  NOT NULL,
    CONSTRAINT branch_pk PRIMARY KEY (BranchNum)
) COMMENT 'branch of the bookstore';

-- foreign keys
-- Reference: Branch_book_book (table: Branch_book)
ALTER TABLE Branch_book ADD CONSTRAINT Branch_book_book FOREIGN KEY Branch_book_book (ISBN)
    REFERENCES book (ISBN);

-- Reference: Branch_book_branch (table: Branch_book)
ALTER TABLE Branch_book ADD CONSTRAINT Branch_book_branch FOREIGN KEY Branch_book_branch (BranchNum)
    REFERENCES branch (BranchNum);

-- End of file.

