import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { Column } from '../../models/column';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'cell-editable',
  standalone: true,
  imports: [CommonModule , EditorModule , FormsModule , TableModule , InputTextModule],
  templateUrl: './cell-editable.component.html',
  styleUrls: ['./cell-editable.component.scss']
})
export class CellEditableComponent {
  @Input({required:true}) row !: any;
  @Input({required:true}) field !: Column;
}
