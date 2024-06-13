import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtxAutocompleteComponent } from './ftx-autocomplete.component';

describe('FtxAutocompleteComponent', () => {
  let component: FtxAutocompleteComponent;
  let fixture: ComponentFixture<FtxAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FtxAutocompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FtxAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
