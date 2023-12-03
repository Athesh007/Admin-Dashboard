import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { ApiService } from '../../service/api/api.service';
import { ThemeService } from '../../service/theme/theme.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  protected light = true;

  data: any = [];
  selectedData: any = [];

  clonedData: { [s: string]: any } = {};

  loading: boolean = true;
  editing: boolean = false;

  constructor(private api: ApiService, private themeService: ThemeService) {}

  theme() {
    this.themeService.switchTheme(this.light);
    console.log(this.light);
  }

  ngOnInit() {
    this.api.getdata().subscribe((res) => {
      this.loading = false;
      this.data = res;
    });
  }

  deleteSelectedata() {
    this.data = this.data.filter(
      (val: any) => !this.selectedData.includes(val)
    );
    this.selectedData = null;
  }

  onRowEditInit(data: any) {
    this.clonedData[data.id as string] = { ...data };
  }

  onRowEditSave(data: any) {
    delete this.clonedData[data.id as string];
  }

  onRowEditCancel(data: any, index: number) {
    this.data[index] = this.clonedData[data.id as string];
    delete this.clonedData[data.id as string];
  }

  onRowDelete(data: any) {
    const index = this.data.filter((item: { id: any }) => item.id === data.id);
    if (index !== -1) {
      this.data.splice(index, 1);
    }
  }
}
