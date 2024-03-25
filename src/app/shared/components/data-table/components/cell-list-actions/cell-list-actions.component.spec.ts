import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellListActionsComponent } from './cell-list-actions.component';

describe('CellListActionsComponent', () => {
  let component: CellListActionsComponent;
  let fixture: ComponentFixture<CellListActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CellListActionsComponent]
    });
    fixture = TestBed.createComponent(CellListActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
