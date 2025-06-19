import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class SignupComponent {
  signupData = {
    email: '',
    password: '',
    nickname: '',
  };

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (
      !this.signupData.email ||
      !this.signupData.password ||
      !this.signupData.nickname
    ) {
      this.errorMessage = '모든 필드를 입력해주세요.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.signup(this.signupData).subscribe({
      next: () => {
        console.log('회원가입 성공');
        this.successMessage =
          '회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        console.error('회원가입 실패:', error);
        this.errorMessage = '회원가입에 실패했습니다. 다시 시도해주세요.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
