import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Book } from "../shared/book-search.model";

@Injectable({ providedIn: "root" })
export class ReadingListService {
  booksChanged = new Subject<Book[]>();
  private booklist: Book[] = [];

  constructor(private http: HttpClient) {}

  getBooks() {
    return this.booklist.slice();
  }

  addBook(book: Book) {
    if (this.booklist.find(e => e.id === book.id) === undefined) {
      this.booklist.push(book);
      this.booksChanged.next(this.booklist.slice());
      this.http
        .put(
          "https://book-shelf-cebb3.firebaseio.com/books.json",
          this.booklist
        )
        .subscribe(response => {
          console.log(response);
        });
    }
  }
}
