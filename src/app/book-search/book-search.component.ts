import { Component, OnInit, Input } from "@angular/core";
import { NgForm } from "@angular/forms";

import { BookSearchService } from "./book-search.service";

@Component({
  selector: "app-book-search",
  templateUrl: "./book-search.component.html",
  styleUrls: ["./book-search.component.css"]
})
export class BookSearchComponent implements OnInit {
  books: any;
  isLoading = false;

  constructor(private bookSearchService: BookSearchService) {}

  ngOnInit() {}

  onSearch(form: NgForm) {
    this.isLoading = true;
    const value = form.value.search;
    this.bookSearchService.searchBooks(value).subscribe(resData => {
      console.log(resData);
      this.books = resData.items;

      this.isLoading = false;
      form.reset();
    });
  }
}
