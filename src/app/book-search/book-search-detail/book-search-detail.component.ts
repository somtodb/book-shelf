import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";

import { BookSearchService } from "../book-search.service";
import { Book } from "../../shared/book-search.model";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-book-search-detail",
  templateUrl: "./book-search-detail.component.html",
  styleUrls: ["./book-search-detail.component.css"]
})
export class BookSearchDetailComponent implements OnInit, OnDestroy {
  book: any;
  selectedBook;
  id: any;
  subscription: Subscription;
  subs: Subscription;
  isAuthenticated = false;
  dropdownOpen = false;

  constructor(
    private route: ActivatedRoute,
    private bookSearchService: BookSearchService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = params["id"];

      this.bookSearchService.searchBooks(this.id).subscribe(resData => {
        this.book = resData.items[0];
      });
      console.log(this.id);
      return this.book;
    });

    this.subs = this.authService.userData.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onAddToList() {
    if (this.isAuthenticated === false) {
      alert("Login or Signup to add books to reading list.");
    } else {
      this.bookSearchService.addBookToReadingList(this.book);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subs.unsubscribe();
  }
}
