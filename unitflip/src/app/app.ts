import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  inputValue = signal(0);

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.inputValue.set(isNaN(value) ? 0 : value);
  }
}
