import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
// export class AuthComponent implements OnInit, OnDestroy {
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  // @ViewChild(PlaceholderDirective, { static: false })
  // alertHost: PlaceholderDirective;
  // private closeSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router // private componentFactoryResolver: ComponentFactoryResolver
  ) {}
  ngOnInit() {}
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }

    authObservable.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;

        // this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );
    form.reset();
  }

  onHandleError() {
    this.error = null;
  }
  // create a component programmatically
  // private showErrorAlert(message: string) {
  //   // const alertComponent = new AlertComponent;
  //   const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
  //     AlertComponent
  //   );
  //   const hostViewContainerRef = this.alertHost.viewContainerRef;
  //   hostViewContainerRef.clear();

  //   const componentRef = hostViewContainerRef.createComponent(
  //     alertComponentFactory
  //   );

  //   componentRef.instance.message = message;
  //   this.closeSubscription = componentRef.instance.close.subscribe(() => {
  //     this.closeSubscription.unsubscribe();
  //     hostViewContainerRef.clear();
  //   });
  // }
  // ngOnDestroy() {
  //   if (this.closeSubscription) {
  //     this.closeSubscription.unsubscribe();
  //   }
  // }
}
