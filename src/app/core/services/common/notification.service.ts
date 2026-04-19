import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private toastr = inject(ToastrService);

  showSuccess(message: string, title: string = 'Success') {
    this.toastr.success(message);
  }

  showError(message: string, title: string = 'Error') {
    this.toastr.error(message);
  }
  showInfo(message: string, title: string = 'Info') {
    this.toastr.info(message);
  }
  showWarning(message: string, title: string = 'Warning') {
    this.toastr.warning(message);
  }
  // Common method to handle your 400 Bad Request object specifically
  handleApiError(err: any) {
    if (err.status === 400 && err.error?.errors) {
      const validationErrors = err.error.errors;
      Object.keys(validationErrors).forEach(key => {
        // This handles the "$.price" style keys from your log
        this.showError(`${validationErrors[key]}`, `Invalid: ${key.replace('$.', '')}`);
      });
    } else {
      const msg = err.error?.message || err.message || 'Something went wrong';
      this.showError(msg, 'Server Error');
    }
  }
}