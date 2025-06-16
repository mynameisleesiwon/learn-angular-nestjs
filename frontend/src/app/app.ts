import { Component } from '@angular/core';
// 라우팅을 위한 RouterOutlet import
import { RouterOutlet } from '@angular/router';
import { Home } from './components/home/home';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {
  protected title = 'frontend';
}
