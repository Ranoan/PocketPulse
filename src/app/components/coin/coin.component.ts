import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css']
})
export class CoinComponent {
  dragging = false;
  offsetX = 0;
  offsetY = 0;
  originalLeft = 0;
  originalTop = 0;
  coin: HTMLElement | null = null;
  shadow: HTMLElement | null = null;
  snapBox: HTMLElement | null = null;

  ngOnInit() {
    this.coin = document.querySelector('.coin') as HTMLElement;
    this.shadow = document.querySelector('.coin-shadow') as HTMLElement;
    this.snapBox = document.querySelector('.snap-box') as HTMLElement;

    if (this.coin) {
      const rect = this.coin.getBoundingClientRect();
      this.originalLeft = rect.left;
      this.originalTop = rect.top;
    }
  }

  onMouseDown(event: MouseEvent) {
    this.dragging = true;

    if (this.coin) {
      const rect = this.coin.getBoundingClientRect();
      this.offsetX = event.clientX - rect.left;
      this.offsetY = event.clientY - rect.top;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.dragging && this.coin) {
      const container = this.coin.parentElement as HTMLElement;
      const containerRect = container.getBoundingClientRect();
      const coinRect = this.coin.getBoundingClientRect();

      let newLeft = event.clientX - this.offsetX;
      let newTop = event.clientY - this.offsetY;

      // Boundary checks
      if (newLeft < 0) {
        newLeft = 0;
      } else if (newLeft + coinRect.width > containerRect.width) {
        newLeft = containerRect.width - coinRect.width;
      }

      if (newTop < 0) {
        newTop = 0;
      } else if (newTop + coinRect.height > containerRect.height) {
        newTop = containerRect.height - coinRect.height;
      }

      this.coin.style.left = `${newLeft}px`;
      this.coin.style.top = `${newTop}px`;

      // Define the boundary of the invisible box (adjust these values as needed)
      const boxLeft = this.originalLeft - 50;
      const boxRight = this.originalLeft + 50;
      const boxTop = this.originalTop - 50;
      const boxBottom = this.originalTop + 50;

      // Check if the coin is within the invisible box boundary
      if (
        newLeft >= boxLeft &&
        newLeft <= boxRight &&
        newTop >= boxTop &&
        newTop <= boxBottom
      ) {
        // Make the snap box visible
        if (this.snapBox) {
          this.snapBox.style.opacity = '1';
        }
      } else {
        // Hide the snap box when the coin is outside the boundary
        if (this.snapBox) {
          this.snapBox.style.opacity = '0';
        }
      }

      // Optionally, hide the shadow when the coin is being dragged
      if (this.shadow) {
        this.shadow.style.opacity = '0';
      }
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp() {
    if (this.dragging && this.coin) {
      const coinRect = this.coin.getBoundingClientRect();

      // Define the boundary of the invisible box (adjust these values as needed)
      const boxLeft = this.originalLeft - 50;
      const boxRight = this.originalLeft + 50;
      const boxTop = this.originalTop - 50;
      const boxBottom = this.originalTop + 50;

      // Check if the coin is within the invisible box boundary
      if (
        coinRect.left >= boxLeft &&
        coinRect.left <= boxRight &&
        coinRect.top >= boxTop &&
        coinRect.top <= boxBottom
      ) {
        // Snap the coin back to its original position
        this.coin.style.left = `${this.originalLeft}px`;
        this.coin.style.top = `${this.originalTop}px`;

        // Make the shadow visible again
        if (this.shadow) {
          this.shadow.style.opacity = '1';
        }

        // Hide the snap box after snapping
        if (this.snapBox) {
          this.snapBox.style.opacity = '0';
        }
      }
    }
    this.dragging = false;
  }
}
