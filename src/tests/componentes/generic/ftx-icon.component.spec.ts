import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FtxIconComponent } from "src/app/ui/shared/components/ftx-icon/ftx-icon.component";
import { SharedModule } from "src/app/ui/shared/shared.module";

describe("Pruebas unitarias para el componente 'FtxIconComponent'", () => {
  let component: FtxIconComponent;
  let fixture: ComponentFixture<FtxIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FtxIconComponent],
      imports: [SharedModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FtxIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Debe crear el componente", () => {
    expect(component).toBeTruthy();
  });

  it('Debe tener una propiedad llamada "icon"', () => {
    expect(component.icon).toBeUndefined();
    component.icon = "some-icon";
    expect(component.icon).toBe("some-icon");
  });

  it("Debe renderizar un icono", () => {
    component.icon = "test-icon";
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("mat-icon").textContent).toContain(
      "test-icon"
    );
  });
});
