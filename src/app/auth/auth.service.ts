import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

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

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.userData = afAuth.authState;
  }

  // Signup User
  signup(email: string, password: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log("You have succesfully Signed up!", res);
        this.router.navigate(["reading-list"]);
      })
      .catch(err => {
        console.log("Unsuccessful signup.", err.message);
        alert("This email in already use by another user.");
      });
  }

  // Login User
  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log("Login successful!");
        this.router.navigate(["reading-list"]);
      })
      .catch(err => {
        console.log("Invalid credentials!", err.message);
        alert("Invalid credentials!");
      });
  }

  // Logout User
  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(["./login"]);
  }
}
