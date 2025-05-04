import { Component, ContentChild, TemplateRef, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ITableCol } from '../../models/table-col.interface';
@Component({
  selector: 'app-table',
  imports: [TableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  tableColumns = input.required<ITableCol[]>()
  data = input.required<any[]>()
  @ContentChild('customHeader') headerTemplate!: TemplateRef<any>;
  @ContentChild('customBody') bodyTemplate!: TemplateRef<any>;
}
