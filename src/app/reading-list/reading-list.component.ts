import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Book } from "../shared/book-search.model";
import { DataStoreService } from "../shared/datastore.service";

@Component({
  selector: "app-reading-list",
  templateUrl: "./reading-list.component.html",
  styleUrls: ["./reading-list.component.css"]
})
export class ReadingListComponent implements OnInit, OnDestroy {
  books: Book[];
  private sub: Subscription;

  constructor(private dataStoreService: DataStoreService) {}

  ngOnInit() {
    this.sub = this.dataStoreService.getBooks().subscribe(res => {
      this.books = res;
    });

    // this.sub = this.dataStoreService
    //   .fetchReadingList()
    //   .subscribe((books: Book[]) => {
    //     this.booklist = books;
    //   });
  }

  deleteConfirmation(key: string) {
    const userValue = confirm(
      "Are you sure you want to delete book from Reading list?"
    );

    if (userValue === true) {
      this.onRemoveBook(key);
      return true;
    } else {
      return false;
    }
  }

  onRemoveBook(key: string) {
    this.dataStoreService.removeBook(key);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
