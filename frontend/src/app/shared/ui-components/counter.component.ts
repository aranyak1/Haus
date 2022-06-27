import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <div class="flex ml-1">
      <button
        (click)="decrement()"
        [disabled]="decButtonDisabled"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-12v-2h12v2z"
          />
        </svg>
      </button>
      <p class="mx-1">{{ count }}</p>
      <button (click)="increment()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"
          />
        </svg>
      </button>
    </div>
  `,
  styles: [
    `
      svg {
        fill: #22c55e;
      }
      
      button {
        margin-top:-0.8rem;
        background-color:transparent;
      }
    `,
  ],
})
export class CounterComponent implements OnInit {
  count: number = 0;
  @Output() countChanged: EventEmitter<number> = new EventEmitter();
  decButtonDisabled: boolean = true;
  constructor() {}
  increment() {
    this.count++;
    if (this.count > 0) {
      this.decButtonDisabled = false;
    }
    this.countChanged.emit(this.count);
  }
  decrement() {
    if (this.count == 0) {
      this.decButtonDisabled = true;
      return;
    }
    this.count--;
    this.countChanged.emit(this.count);
  }

  ngOnInit(): void {}
}
