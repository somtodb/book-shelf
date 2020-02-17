import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  isLoading = false;
  errorAlert: string = null;

  // @ViewChild(ModalDirective, { static: false }) alertHost: ModalDirective;

  private sub: Subscription;

  constructor(
    private authService: AuthService // private cmpFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {}

  onLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    this.authService.login(email, password);
    this.authService.userData.subscribe(user => {
      if (user) {
        this.isLoading = false;
      } else {
        setTimeout(() => {
          this.errorAlert = "Invalid login credentials!";

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
