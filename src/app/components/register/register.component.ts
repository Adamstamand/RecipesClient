import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountService } from '../../services/account.service';
import { CompareValidation } from '../../validators/passwordValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
  }, {
    validators: [CompareValidation("password", "confirmPassword")]
  });

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private router: Router) { }

  submitRegister() {
    this.accountService.postRegister(this.registerForm.value).subscribe({
      next: (response: any) => {
        localStorage["token"] = response.token;
        localStorage["refreshToken"] = response.refreshToken;
        this.accountService.isLoggedIn = true;
        this.router.navigate(['/add-recipe']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
