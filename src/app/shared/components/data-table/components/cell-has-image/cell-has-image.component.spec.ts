import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellHasImageComponent } from './cell-has-image.component';

describe('CellHasImageComponent', () => {
  let component: CellHasImageComponent;
  let fixture: ComponentFixture<CellHasImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CellHasImageComponent]
    });
    fixture = TestBed.createComponent(CellHasImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
