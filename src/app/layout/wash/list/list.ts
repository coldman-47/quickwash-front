import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Wash } from '../../../core/models/wash/wash';
import { WashService } from '../../../core/services/wash/wash.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.html',
  styleUrl: './list.scss',
  standalone: false,
})
export class List implements OnInit {
  washList: Wash[] = [];
  user: any;

  constructor(
    private srv: WashService,
    private cdr: ChangeDetectorRef,
    private authSrv: AuthService,
  ) {
    authSrv.user.subscribe({
      next: (val) => {
        this.user = val;
        if (val)
          this.srv.getAll().subscribe({
            next: (val) => {
              this.washList = val;
              this.cdr.detectChanges();
            },
            error: (err) => {
              console.error(err);
            },
          });
        this.cdr.detectChanges();
      },
    });
    srv.newWash.subscribe({
      next: (val) => {
        this.washList.push(val);
        this.cdr.detectChanges();
      },
    });
  }

  ngOnInit(): void {}

  peek(laundry: Wash) {
    this.srv.details.next(laundry);
  }
}
