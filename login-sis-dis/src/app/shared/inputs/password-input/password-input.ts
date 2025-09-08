import { Component, input, OnInit, WritableSignal } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
  AbstractControl
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-password-input',
  templateUrl: './password-input.html',
  styleUrls: ['./password-input.scss'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
})
export class PasswordInput implements OnInit {

  password = input.required<WritableSignal<string>>();
  isValidationsOn = input<boolean>(true);
  passwordFormControl = new FormControl('');
  matcher = new MyErrorStateMatcher();

  private sub?: Subscription;

  ngOnInit(): void {
    this.setupValidators();

    this.passwordFormControl.setValue(this.password()());
    this.sub = this.passwordFormControl.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.password().set(value);
      }
    });
  }

  ngOnChanges(): void {
    this.setupValidators();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private setupValidators(): void {
    if (this.isValidationsOn()) {
      this.passwordFormControl.setValidators([
        Validators.required,
        Validators.minLength(8),
        this.passwordValidator,
      ]);
    } else {
      this.passwordFormControl.clearValidators();
    }
    this.passwordFormControl.updateValueAndValidity();
  }

  private passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (!hasNumber) {
      return { numberRequired: true };
    }
    if (!hasSpecialChar) {
      return { specialCharRequired: true };
    }
    return null;
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = !!form?.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
