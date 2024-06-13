import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtxInputPasswordComponent } from './ftx-input-password.component';

describe('FtxInputPasswordComponent', () => {
  let component: FtxInputPasswordComponent;
  let fixture: ComponentFixture<FtxInputPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FtxInputPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FtxInputPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
