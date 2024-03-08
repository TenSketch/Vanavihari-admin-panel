import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
// import { ZohoAuthServiceService } from '../../zoho-auth-service.service';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Regex } from 'src/app/utility/regex';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  showTermsModal: boolean = false;
  code: any;
  password: any;
  repeat_password: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    // private myService: ZohoAuthServiceService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
  ) {}
  // {
  //   this.form = this.formBuilder.group(
  //     {
  //       full_name: ['', Validators.compose([Validators.required, Validators.pattern(Regex.lettersAndSpaces)])],
  //       mobile_number: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
  //       email_id: ['', Validators.compose([Validators.required, Validators.email])],
  //       password: ['',Validators.compose([
  //         Validators.required,
  //         Validators.minLength(8),
  //         Validators.maxLength(16),
  //         Validators.pattern(
  //           /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
  //         ),
  //       ])],
  //       repeat_password: ['', Validators.compose([Validators.required])],
  //     },
  //     {
  //       validators: this.passwordMatchValidator,
  //     }
  //   );
  // }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      full_name: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
      mobile_number: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      email_id: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ])],
      repeat_password: ['', Validators.compose([Validators.required])]
    }, {
      validators: this.passwordMatchValidator
    });
  }
  onSubmit(): void {
    this.password = this.form.value.password;
    this.repeat_password = this.form.value.repeat_password;
    if (this.form.valid) {
      const params = new HttpParams()
        .set('fullname', this.form.value.full_name)
        .set('email', this.form.value.email_id)
        .set('mobile', this.form.value.mobile_number)
        .set('password', this.form.value.password);

      this.http
        .get<any>(
          'https://vanavihari-ng.netlify.app/zoho-connect?api_type=register',
          { params }
        )
        .subscribe({
          next: (response) => {
            if (response.code == 3000 && response.result.status == 'success')
              this.showSuccessAlert();
            else if (response.code == 3000)
              this.showErrorAlert(response.result.msg);
            else this.showErrorAlert('Please Check Input Fields!');
          },
          error: (err) => {
            console.error('Error:', err);
          },
        });
    } else {
      this.showErrorAlert('Please Fill Form!');
    }
  }
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const repeatPassword = form.get('repeat_password')?.value;
    return password === repeatPassword ? null : { passwordsNotMatch: true };
  }
  showSuccessAlert() {
    this.snackBar
      .open('Form submitted successfully!', 'Close', {
        duration: 3000,
      })
      .afterDismissed()
      .subscribe(() => {
        this.router.navigate(['/sign-in']);
      });
  }
  showErrorAlert(msg = '') {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
    });
  }
  goToSignin() {
    this.router.navigate(['/sign-in']);
  }
}
