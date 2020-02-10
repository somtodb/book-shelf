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
  booklist: Book[];
  private sub: Subscription;

  constructor(private dataStoreService: DataStoreService) {}

  ngOnInit() {
    // this.sub = this.dataStoreService.getBooks().subscribe(books => {
    //   this.booklist = books;
    // });

    this.booklist = this.dataStoreService.getBooks();
    this.sub = this.dataStoreService
      .fetchReadingList()
      .subscribe((books: Book[]) => {
        this.booklist = books;
      });
  }

  deleteConfirmation(i) {
    const userValue = confirm(
      "Are you sure you want to delete book from Reading list?"
    );

    if (userValue === true) {
      this.onRemoveBook(i);
      return true;
    } else {
      return false;
    }
  }

  onRemoveBook(index: number) {
    this.dataStoreService.removeBook(index);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
