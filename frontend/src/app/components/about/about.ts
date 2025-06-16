import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-container">
      <h1>소개</h1>
      <p>이 프로젝트는 Angular와 NestJS를 학습하기 위한 프로젝트입니다.</p>
    </div>
  `,
  styles: [
    `
      .about-container {
        padding: 2rem;
        max-width: 800px;
        margin: 0 auto;
      }
    `,
  ],
})
export class About {}
