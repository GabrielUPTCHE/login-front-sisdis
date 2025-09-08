import { Component, input, OnInit, WritableSignal } from '@angular/core';
import { FormControl, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-email-input',
  templateUrl: './email-input.html',
  styleUrls: ['./email-input.scss'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
})
export class EmailInput implements OnInit {
  email = input.required<WritableSignal<string>>();

  emailFormControl = new FormControl('');
  matcher = new MyErrorStateMatcher();
  isValidationsOn = input<boolean>(true);

  private sub?: Subscription;

  ngOnInit(): void {
    this.emailFormControl.setValue(this.email()());
    this.sub = this.emailFormControl.valueChanges.subscribe(value => {
      if (value !== null) {
        this.email().set(value);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnChanges(): void {
    this.setupValidators();
  }

  private setupValidators(): void {
    if (this.isValidationsOn()) {
      this.emailFormControl.setValidators(
        [Validators.required, Validators.email]
      );
    } else {
      this.emailFormControl.clearValidators();
    }
    this.emailFormControl.updateValueAndValidity();
  }

}



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = !!form?.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
