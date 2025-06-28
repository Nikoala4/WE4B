import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Activity } from '../../../nooble/api-objs/Activity';

@Component({
  selector: 'app-thread-list',
  imports: [
    CommonModule
  ],
  templateUrl: './thread-list.component.html',
  styleUrl: './thread-list.component.css'
})
export class ThreadListComponent implements OnInit {

  data: Activity[] = []

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.reload();
  }  

  reload()
  {
    this.apiService.thread.get(true, 10, 0).subscribe({
      next: (response) => {
        this.data = response
      }
    })
  }

  markAsRead(activityId: string)
  {
    console.log(activityId);
    this.apiService.thread.markAsRead([activityId]).subscribe({
      next: () => {
        this.reload();
      }
    });
  }

}
