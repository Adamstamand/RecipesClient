import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { AuthenticationResponse } from 'src/app/models/authenticationResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  logInForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private router: Router) { }

  submitLogIn() {
    this.accountService.postLogIn(this.logInForm.value).subscribe({
      next: (response: AuthenticationResponse) => {
        localStorage["token"] = response.token;
        localStorage["refreshToken"] = response.refreshToken;
        this.accountService.isLoggedIn = true;
        this.router.navigate(['/add-recipe']);
      },
      error: err => console.error(err)
    });
  }
}
