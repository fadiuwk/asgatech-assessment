import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { Column } from '../models/column';
import { Action } from '../models/action';

@Injectable({
  providedIn: 'root',
})
export class DataTableService {

  showStyleHighlight = false

  private pageChangedSubject$ = new Subject<any>();
  pageChangedSubject = signal<any>({});

  //table data
  // rows!: any[];
  rows = signal<any[]>([]);
  isLoading: boolean = true;
  // cols!: Column[];
  cols = signal<Column[]>([]);

  //table pagination
  hasPaginator: boolean = true;
  totalRecords!: number;
  page: number = 0;
  pagePerCount: number = 10;
  rowsPerPageOptions: number[] = [10, 20, 50];
  onPageChanged: any;

  //handle actions list
  hasListActions: boolean = false;
  actionsList: Action[] = [];

  constructor() {}

  // Method that performs some action and emits the returned value
  emitOnPageChange(event: any) {
    this.page = event.first;
    this.pagePerCount = event.rows;
    this.pageChangedSubject$.next(event);
    this.pageChangedSubject.set(event);
  }

  // Observable to subscribe to in the component
  getPageChanged() {
    return this.pageChangedSubject$.asObservable();
  }
}
