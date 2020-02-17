import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { Error } from "./error.model";

@Injectable({ providedIn: "root" })
export class ErrorService {
  public errorOccurred: Subject<Error>;

  constructor() {
    this.errorOccurred = new BehaviorSubject<Error>(null);
  }

  handleError(error) {
    this.errorOccurred.next(error);
  }
}
