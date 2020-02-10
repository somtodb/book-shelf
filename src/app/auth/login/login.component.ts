import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { AuthService } from "../auth.service";
// import { ModalDirective } from "src/app/shared/modal/modal.directive";
// import { AlertComponent } from "../../shared/alert/alert.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  isLoading = false;
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
          this.isLoading = false;
        }, 500);
      }
    });
    form.reset();
  }

  // private showErrorAlert(message: string) {
  //   const alertCmpFactory = this.cmpFactoryResolver.resolveComponentFactory(
  //     AlertComponent
  //   );
  //   const hostViewContainerRef = this.alertHost.viewContainerRef;
  //   hostViewContainerRef.clear();

  //   const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

  //   componentRef.instance.message = message;
  //   this.sub = componentRef.instance.close.subscribe(() => {
  //     this.sub.unsubscribe();
  //     hostViewContainerRef.clear();
  //   });
  // }
}
