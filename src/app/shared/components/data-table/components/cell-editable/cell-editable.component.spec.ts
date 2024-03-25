import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellEditableComponent } from './cell-editable.component';

describe('CellEditableComponent', () => {
  let component: CellEditableComponent;
  let fixture: ComponentFixture<CellEditableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CellEditableComponent]
    });
    fixture = TestBed.createComponent(CellEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
