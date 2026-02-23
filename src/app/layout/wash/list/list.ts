import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Wash } from '../../../core/models/wash/wash';
import { WashService } from '../../../core/services/wash/wash.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.html',
  styleUrl: './list.scss',
  standalone: false,
})
export class List implements OnInit {
  washList: Wash[] = [];

  constructor(
    private srv: WashService,
    private cdr: ChangeDetectorRef,
  ) {
    srv.newWash.subscribe({
      next: (val) => {
        this.washList.push(val);
        this.cdr.detectChanges();
      },
    });
  }

  ngOnInit(): void {
    this.srv.getAll().subscribe({
      next: (val) => {
        this.washList = val;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  peek(laundry: Wash) {
    this.srv.details.next(laundry);
  }
}
