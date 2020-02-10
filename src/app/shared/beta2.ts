import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { Subject, Observable } from "rxjs";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";

import { Book } from "../shared/book-search.model";

@Injectable({ providedIn: "root" })
export class DataStoreService {
  booksChanged = new Subject<Book[]>();
  books: Book[] = [];
  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
    afAuth: AngularFireAuth
  ) {}

  setBooks(books: Book[]) {
    if (books) {
      this.booksChanged.next(this.books.slice());
      this.books = books;
    }
  }

  getBooks() {
    return this.books.slice();
  }

  addBook(book: Book) {
    const books = JSON.parse(localStorage.getItem("booklist")) || [];
    if (books.indexOf(book.id) === -1) {
      books.push(book);
      this.booksChanged.next(books.slice());
      this.http
        .put("https://book-shelf-cebb3.firebaseio.com/books.json", books)
        .subscribe(response => {
          console.log(response);
        });
      localStorage.setItem("booklist", JSON.stringify(books));
    }
  }

  removeBook(index: number): void {
    this.books.splice(index, 1);
    this.booksChanged.next(this.books.slice());
    this.http
      .put("https://book-shelf-cebb3.firebaseio.com/books.json", this.books)
      .subscribe(response => {
        console.log(response);
      });
    localStorage.setItem("booklist", JSON.stringify(this.books));
  }

  fetchReadingList() {
    return this.http
      .get<Book[]>("https://book-shelf-cebb3.firebaseio.com/books.json")
      .pipe(
        map(books => {
          if (books) {
            return books.map(book => {
              return { ...book };
            });
          }
        }),
        tap(books => {
          this.setBooks(books);
        })
      );
  }
}
