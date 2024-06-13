import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FtxDialogComponent } from "src/app/ui/shared/components/ftx-dialog/ftx-dialog.component";
import { SharedModule } from "src/app/ui/shared/shared.module";

describe("Pruebas unitarias para el componente 'FtxDialogComponent'", () => {
  let component: FtxDialogComponent;
  let fixture: ComponentFixture<FtxDialogComponent>;

  const dialogRefMock = {
    close: jasmine.createSpy("close"), // Crear un spy para el método close
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FtxDialogComponent],
      imports: [SharedModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FtxDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Debe crear el componente", () => {
    expect(component).toBeTruthy();
  });

  it("Debe llamar al MatDialogRef.close() cuando el método Confirm es llamado ", () => {
    const testValue = true;
    component.Confirm(testValue);
    expect(dialogRefMock.close).toHaveBeenCalledWith(testValue);
  });
});
