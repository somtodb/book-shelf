import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../environments/environment";

import { AppComponent } from "./app.component";
import { BookSearchComponent } from "./book-search/book-search.component";
import { BookSearchDetailComponent } from "./book-search/book-search-detail/book-search-detail.component";
import { ReadingListComponent } from "./reading-list/reading-list.component";
import { BookItemComponent } from "./book-search/book-search-list/book-search-list.component";
import { BookSelectViewComponent } from "./book-search/book-select-view/book-select-view.component";
import { HeaderComponent } from "./header/header.component";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";
import { AppRoutesModule } from "./app-routes.module";
import { BookSearchService } from "./book-search/book-search.service";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
// import { AlertComponent } from "./shared/alert/alert.component";
import { HomeComponent } from "./home/home.component";
import { ErrorComponent } from "./error/error.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
// import { SearchComponent } from "./book-search/search/search.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // SearchComponent,
    BookSearchComponent,
    BookSearchDetailComponent,
    ReadingListComponent,
    BookItemComponent,
    BookSelectViewComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    LoadingSpinnerComponent,
    ErrorComponent,
    PageNotFoundComponent
    // AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutesModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ],
  providers: [BookSearchService],
  bootstrap: [AppComponent]
})
export class AppModule {}
