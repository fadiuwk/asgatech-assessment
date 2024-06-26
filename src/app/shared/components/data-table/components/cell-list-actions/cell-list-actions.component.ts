import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableService } from '../../services/data-table.service';

@Component({
  selector: 'cell-list-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell-list-actions.component.html',
  styleUrls: ['./cell-list-actions.component.scss']
})
export class CellListActionsComponent {
  @Input({required:true}) row !: any;

  constructor(public dataTableService:DataTableService){}
}
