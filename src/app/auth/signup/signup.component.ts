import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  isLoading = false;
  errorAlert: string = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSignup(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    this.authService.signup(email, password);

    this.authService.userData.subscribe(user => {
      if (user) {
        this.isLoading = false;
      } else {
        setTimeout(() => {
          this.errorAlert =
            "This email address is already in use by another account.";

          setTimeout(() => {
            this.errorAlert = "";
          }, 5000);

          this.isLoading = false;
        }, 1000);
      }
    });
    form.reset();
  }
}
