import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FtxButtonComponent } from "src/app/ui/shared/components/ftx-button/ftx-button.component";
import { SharedModule } from "src/app/ui/shared/shared.module";

describe("FtxButtonComponent", () => {
  let component: FtxButtonComponent;
  let fixture: ComponentFixture<FtxButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FtxButtonComponent],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FtxButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit event on click", () => {
    let emittedValue: any;
    component.Click();
    component.eventClick.subscribe(() => {
      emittedValue = true;
    });
    component.Click();
    expect(emittedValue).toBeDefined();
  });
});
