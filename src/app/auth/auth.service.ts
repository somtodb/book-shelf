import { Injectable, Output } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { ErrorService } from "../error/error.service";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  userData: Observable<firebase.User>;
  error: string = null;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private errorService: ErrorService
  ) {
    this.userData = afAuth.authState;
  }

  // Signup User
  signup(email: string, password: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log("You have succesfully Signed up!", res);
        this.router.navigate(["books"]);
      })
      .catch(error => {
        console.log("Unsuccessful signup.", error.message);
        // alert("This email is already in use by another user.");

        // this.errorService.handleError(error);
        // return throwError(error);
      });
  }

  // Login User
  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log("Login successful!", res);
        this.router.navigate(["reading-list"]);
      })
      .catch(error => {
        console.log("Invalid credentials!", error.message);
        // alert("Invalid credentials!");

        // this.errorService.handleError(error);
        // return throwError(error);
      });
  }

  // isLoggedIn() {
  //   if (this.userData == null) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  // Logout User
  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(["./login"]);
  }
}
