import { Injectable } from "@angular/core";
import Swal, { SweetAlertOptions } from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private defaultOptions = {
    success: {
      icon: "success",
      title: "Success!",
    },
    info: {
      icon: "info",
      title: "Information",
    },
    error: {
      icon: "error",
      title: "Error",
    },
  };

  showSuccess(message: string) {
    this.showAlert("success", message);
  }

  showInfo(message: string) {
    this.showAlert("info", message);
  }

  showError(message: string) {
    this.showAlert("error", message);
  }

  private showAlert(
    notificationType: "success" | "info" | "error",
    message: string
  ) {
    const { icon, title } = this.defaultOptions[notificationType];
    Swal.fire({
      icon,
      title,
      text: message,
    } as SweetAlertOptions);
  }
}
