import { TestBed } from "@angular/core/testing";
import Swal, { SweetAlertOptions } from "sweetalert2";
import { NotificationService } from "src/app/ui/shared/services/notification.service";

describe("Pruebas unitarias para el servicio 'NotificationService'", () => {
  let service: NotificationService;
  let swalFireSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService],
    });
    service = TestBed.inject(NotificationService);
    swalFireSpy = spyOn(Swal, "fire");
  });

  it("Debe crear el componente", () => {
    expect(service).toBeTruthy();
  });

  it("debería llamar a Swal.fire con opciones de success cuando se llama a showSuccess", () => {
    const message = "Test success message";
    service.showSuccess(message);

    expect(swalFireSpy).toHaveBeenCalledWith({
      icon: "success",
      title: "Success!",
      text: message,
    } as SweetAlertOptions);
  });

  it("debería llamar a Swal.fire con opciones de info cuando se llama a showInfo", () => {
    const message = "Test info message";
    service.showInfo(message);

    expect(swalFireSpy).toHaveBeenCalledWith({
      icon: "info",
      title: "Information",
      text: message,
    } as SweetAlertOptions);
  });

  it("debería llamar a Swal.fire con opciones de error cuando se llama a showError", () => {
    const message = "Test error message";
    service.showError(message);

    expect(swalFireSpy).toHaveBeenCalledWith({
      icon: "error",
      title: "Error",
      text: message,
    } as SweetAlertOptions);
  });
});
