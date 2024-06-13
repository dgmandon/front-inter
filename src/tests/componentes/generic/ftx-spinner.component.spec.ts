import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FtxSpinnerComponent } from "src/app/ui/shared/components/ftx-spinner/ftx-spinner.component";
import { SharedModule } from "src/app/ui/shared/shared.module";

describe("FtxSpinnerComponent", () => {
  let component: FtxSpinnerComponent;
  let fixture: ComponentFixture<FtxSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FtxSpinnerComponent],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FtxSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
