"use strict"
class BookList {
    constructor() {
        this.inputTitle = document.querySelector(".input-title");
        this.inputAuthor = document.querySelector(".input-author");
        this.inputISBN = document.querySelector(".input-isbn");
        this.submitBtn = document.querySelector(".book-list__btn");
        this.parentItems = document.querySelector(".book-result__items");
        this.deleteItem = document.querySelector(".delete");
        this.allBooks = [];
    }
    clearValues() {
        this.inputTitle.value = "";
        this.inputAuthor.value = "";
        this.inputISBN.value = "";
    }
    addItem() {
        let titleValue = this.inputTitle.value;
        let authorValue = this.inputAuthor.value;
        let isbnValue = this.inputISBN.value;

        let newItem = document.createElement("div");

        newItem.classList.add("book-result__item");

        newItem.innerHTML = `
      <p class="book-result__itemtitle">${titleValue}</p>
      <p class="book-result__itemauthor">${authorValue}</p>
      <p class="book-result__itemisbn">${isbnValue}</p>
        <button class="delete">
          <i class="fas fa-times"></i>
        </button>
      `;
        this.parentItems.append(newItem);
    }
    verifyTheValue() {
        this.submitBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (
                this.inputTitle.value === "" ||
                this.inputAuthor.value === "" ||
                this.inputISBN.value === ""
            ) {
                return false;
            } else {
                this.setLocalStorage();
                this.addItem();
                this.clearValues();
            }
        });
    }
    deleteAnItem() {
        this.parentItems.addEventListener("click", (e) => {
            e.preventDefault();
            const item = e.target;
            if (item.classList.contains("delete")) {
                item.parentElement.classList.add("fall");
                item.parentElement.addEventListener("transitionend", () => {
                    item.parentElement.remove();
                });
            }
        });
    }
    setLocalStorage() {
        const booksArray = {
            name: this.inputTitle.value,
            author: this.inputAuthor.value,
            isbn: this.inputISBN.value
        };
        let bookItem = JSON.stringify(booksArray);
        localStorage.setItem("Books", bookItem);

        this.allBooks.push(bookItem);

        console.table("Book", booksArray);
    }
}
let list = new BookList();
list.verifyTheValue();
list.deleteAnItem();