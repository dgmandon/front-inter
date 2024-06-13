import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FtxDividerComponent } from "src/app/ui/shared/components/ftx-divider/ftx-divider.component";
import { SharedModule } from "src/app/ui/shared/shared.module";

describe("Pruebas unitarias para el componente 'FtxDividerComponent'", () => {
  let component: FtxDividerComponent;
  let fixture: ComponentFixture<FtxDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FtxDividerComponent],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FtxDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Debe crear el componente", () => {
    expect(component).toBeTruthy();
  });
});
