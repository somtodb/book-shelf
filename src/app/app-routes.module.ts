import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { AngularFireAuthGuard } from "@angular/fire/auth-guard";

import { HomeComponent } from "./home/home.component";
import { BookSearchComponent } from "./book-search/book-search.component";
import { BookSearchDetailComponent } from "./book-search/book-search-detail/book-search-detail.component";
import { BookSelectViewComponent } from "./book-search/book-select-view/book-select-view.component";
import { ReadingListComponent } from "./reading-list/reading-list.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { AuthGuard } from "./auth/auth.guard";
import { UserAccessGuard } from "./auth/auth2.guard";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [UserAccessGuard],
    runGuardsAndResolvers: "always"
  },
  {
    path: "books",
    component: BookSearchComponent,
    children: [
      { path: "", component: BookSelectViewComponent },
      { path: ":id", component: BookSearchDetailComponent }
    ]
  },
  {
    path: "reading-list",
    component: ReadingListComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: "always"
  },
  { path: "signup", component: SignupComponent },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [UserAccessGuard],
    runGuardsAndResolvers: "always"
  },
  { path: "not-found", component: PageNotFoundComponent },
  { path: "**", redirectTo: "/not-found" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      onSameUrlNavigation: "reload"
    })
  ],
  exports: [RouterModule]
})
export class AppRoutesModule {}
