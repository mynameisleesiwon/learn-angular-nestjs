import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="features-container">
      <h1>주요 기능</h1>
      <p>우리의 주요 기능을 소개합니다.</p>
    </div>
  `,
  styles: [
    `
      .features-container {
        padding: 2rem;
        max-width: 800px;
        margin: 0 auto;
      }
    `,
  ],
})
export class Features {}
