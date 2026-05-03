// D:/My Projects/MyLab/UI/my-lab/src/app/core/services/common/loader.service.ts

import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private activeRequests = signal(0);
  isLoading = signal(false);

  show() {
    this.activeRequests.update(count => count + 1);
    this.isLoading.set(true);
  }

  hide() {
    this.activeRequests.update(count => Math.max(0, count - 1));
    if (this.activeRequests() === 0) {
      this.isLoading.set(false);
    }
  }
}
