import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { Subject, Observable } from "rxjs";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";

import { Book } from "../shared/book-search.model";

@Injectable({ providedIn: "root" })
export class DataStoreService {
  booksChanged = new Subject<Book[]>();
  booksRef: AngularFireList<any>;
  books: Observable<any[]>;
  userId: string;

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) this.userId = user.uid;
    });
  }

  // setBooks(books: Book[]) {
  //   if (books) {
  //     this.booksChanged.next(this.books.slice());
  //     this.books = books;
  //   }
  // }

  getBooks(): Observable<Book[]> {
    // return this.books.slice();

    if (!this.userId) return;
    this.booksRef = this.db.list<Book>(`/books/${this.userId}`);
    this.books = this.booksRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
    return this.books;
  }

  addBook(book: Book) {
    this.booksRef.push(book);

    // const books = JSON.parse(localStorage.getItem("booklist")) || [];
    // if (books.indexOf(book.id) === -1) {
    // books.push(book);
    //   this.booksChanged.next(books.slice());
    //   this.http
    //     .put("https://book-shelf-cebb3.firebaseio.com/books.json", books)
    //     .subscribe(response => {
    //       console.log(response);
    //     });
    //   localStorage.setItem("booklist", JSON.stringify(books));
    // }
  }

  removeBook(key: string) {
    this.booksRef.remove(key);

    // this.booksChanged.next(this.books.slice());
    // this.http
    //   .put("https://book-shelf-cebb3.firebaseio.com/books.json", this.books)
    //   .subscribe(response => {
    //     console.log(response);
    //   });
    // localStorage.setItem("booklist", JSON.stringify(this.books));
  }

  // fetchReadingList() {
  //   return this.http
  //     .get<Book[]>("https://book-shelf-cebb3.firebaseio.com/books.json")
  //     .pipe(
  //       map(books => {
  //         if (books) {
  //           return books.map(book => {
  //             return { ...book };
  //           });
  //         }
  //       }),
  //       tap(books => {
  //         this.setBooks(books);
  //       })
  //     );
  // }
}
