import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Column } from '../../models/column';

@Component({
  selector: 'cell-has-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell-has-image.component.html',
  styleUrls: ['./cell-has-image.component.scss']
})
export class CellHasImageComponent {
  @Input({required:true}) row !: any;
  @Input({required:true}) field !: Column;
}
