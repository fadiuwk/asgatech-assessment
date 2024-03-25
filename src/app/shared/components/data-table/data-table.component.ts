import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { DataTableService } from './services/data-table.service';
import { CellListActionsComponent } from './components/cell-list-actions/cell-list-actions.component';
import { CellHasImageComponent } from './components/cell-has-image/cell-has-image.component';
import { CellEditableComponent } from './components/cell-editable/cell-editable.component';

@Component({
  selector: 'data-table',
  standalone: true,
  imports: [
    TableModule,
    SkeletonModule,
    CommonModule,
    PaginatorModule,
    CellListActionsComponent,
    CellHasImageComponent,
    CellEditableComponent
  ],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
  constructor(public dataTableService: DataTableService) {}
}
