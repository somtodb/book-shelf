import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Book } from "../../shared/book-search.model";
import { Subscription } from "rxjs";
import { DataStoreService } from "src/app/shared/datastore.service";

@Component({
  selector: "app-book-search-list",
  templateUrl: "./book-search-list.component.html",
  styleUrls: ["./book-search-list.component.css"]
})
export class BookItemComponent implements OnInit, OnDestroy {
  @Input() book;
  books: Book[];
  subcription: Subscription;

  constructor(private dataStoreService: DataStoreService) {}

  ngOnInit() {
    this.subcription = this.dataStoreService.booksChanged.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    // this.books = this.dataStoreService.getBooks();
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
