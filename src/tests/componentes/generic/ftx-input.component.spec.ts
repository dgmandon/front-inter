import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SharedModule } from "src/app/ui/shared/shared.module";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FtxInputComponent } from "src/app/ui/shared/components/ftx-input/ftx-input.component";
import { MatError } from "@angular/material/form-field";
describe('TEST del componente "FtxInputComponent"', () => {
  let component: FtxInputComponent;
  let fixture: ComponentFixture<FtxInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FtxInputComponent, MatError],
      imports: [SharedModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FtxInputComponent);
    component = fixture.componentInstance;
    component.label = "Username";
    component.placeholder = "Ingresa tu username";
    component.formGroup = new FormGroup({
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
    component.controlName = "username";
    fixture.detectChanges();
  });

  it("Debe crear el componente ftx-input", () => {
    expect(component).toBeTruthy();
  });

  it('Debe tener un label con el texto "Username"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector(".labelInput")?.textContent).toContain(
      "Username"
    );
  });

  it('Debe tener un placeholder con el texto "Ingresa tu username"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector(".custom-input")?.getAttribute("placeholder")
    ).toBe("Ingresa tu username");
  });

  it("debería lanzar un error cuando el formGroup es null", () => {
    component.formGroup = null as any;

    expect(() => component.ngOnInit()).toThrowError(
      "The control of from be null"
    );
  });

  it("Debe mostrar un mensaje de error al no escribir el minimo de caracteres requeridos ", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const inputElement = compiled.querySelector(
      ".custom-input"
    ) as HTMLInputElement;

    inputElement.value = "12";
    inputElement.dispatchEvent(new Event("input"));

    component.control.markAsTouched();

    fixture.detectChanges();

    const errorElement = compiled.querySelector(
      ".invalid-feedback"
    ) as HTMLElement;

    expect(errorElement.textContent).toContain(
      "El campo username debe contener al menos 3 caracteres"
    );
  });
  it("Debe mostrar un mensaje de error al no escribir el minimo de caracteres requeridos ", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const inputElement = compiled.querySelector(
      ".custom-input"
    ) as HTMLInputElement;

    inputElement.value = "12";
    inputElement.dispatchEvent(new Event("input"));

    component.control.markAsTouched();

    fixture.detectChanges();

    const errorElement = compiled.querySelector(
      ".invalid-feedback"
    ) as HTMLElement;

    expect(errorElement.textContent).toContain(
      "El campo username debe contener al menos 3 caracteres"
    );
  });
  it("Debe actualizar los validadores y lanzar la validación al modificarse los validadores", () => {
    const compiled = fixture.nativeElement as HTMLElement;

    component.validators = [Validators.required, Validators.maxLength(5)];

    const changes = {
      validators: { currentValue: component.validators },
    } as any;

    component.ngOnChanges(changes);

    const inputElement = compiled.querySelector(
      ".custom-input"
    ) as HTMLInputElement;

    inputElement.value = "TestTestTest";
    inputElement.dispatchEvent(new Event("input"));

    component.control.markAsTouched();

    fixture.detectChanges();

    const errorElement = compiled.querySelector(
      ".invalid-feedback"
    ) as HTMLElement;

    expect(errorElement.textContent).toContain(
      "El campo username no puede tener más de 5 caracteres"
    );
  });
  it("debería lanzar un error cuando el formGroup es null en ngOnChanges", () => {
    const changes = {
      validators: { currentValue: component.validators },
    } as any;

    component.formGroup = null as any;

    expect(() => component.ngOnChanges(changes)).toThrowError(
      "The control of from be null"
    );
  });
});
