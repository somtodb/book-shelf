import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Book } from "../shared/book-search.model";
import { DataStoreService } from "../shared/datastore.service";

export interface GoogleBooksResponse {
  items: [
    {
      id: string;
      volumeInfo: {
        authors: [string];
        averageRating: any;
        categories: [string];
        description: string;
        imageLinks: {
          smallThumbnail: string;
        };
        publishedDate: any;
        publisher: string;
        title: string;
      };
    }
  ];
}

@Injectable({
  providedIn: "root"
})
export class BookSearchService {
  constructor(
    private http: HttpClient,
    private dataStoreService: DataStoreService
  ) {}

  searchBooks(value) {
    return this.http.get<GoogleBooksResponse>(
      "https://www.googleapis.com/books/v1/volumes?q=" + value
    );
  }

  addBookToReadingList(book: Book) {
    this.dataStoreService.addBook(book);
  }
}
