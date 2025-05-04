import { Component, OnInit, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, TableModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  mobile = input<boolean>(false);
  select = output<void>();


  ngOnInit(): void {
  }
}
