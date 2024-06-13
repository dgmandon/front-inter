import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtxItemComponent } from './ftx-item.component';

describe('FtxItemComponent', () => {
  let component: FtxItemComponent;
  let fixture: ComponentFixture<FtxItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FtxItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FtxItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
