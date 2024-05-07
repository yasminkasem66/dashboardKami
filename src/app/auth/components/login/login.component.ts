import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service.service';
import { ILogin } from '../../models/iuser';

@Component({
  selector: 'dash-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private route = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  loginForm!: FormGroup;

  constructor() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLoginFormSubmit(): void {
    if (this.loginForm.invalid) return;
    const formValue = this.loginForm.value;
    this.authService.login().subscribe({
      next: (users: ILogin[]) => {
        const exists = users.some((item) => item.email === formValue.email && item.password == formValue.password);
        if (!exists) return;
        localStorage.setItem('user', this.loginForm.value);
        this.getNameInitials(this.loginForm.value.email);
        this.route.navigate(['dashboard']);
      },
    });
  }

  getNameInitials(user: string) {
    const userName = user?.toUpperCase().trim();
    if (!userName) return 'EX';
    if (userName.indexOf('.') > 0 && userName.charAt(userName.indexOf('.') + 1)) {
      const userInitials = userName.charAt(0) + userName.split('.')[1].charAt(0);
      localStorage.setItem('userInitials', userInitials);
      return userInitials;
    }
    return userName.charAt(0);
  }

  isInputInvalid(formControlName: string): boolean {
    if (this.loginForm.get(formControlName)?.invalid && this.loginForm.get(formControlName)?.dirty) return true;
    return false;
  }
}
