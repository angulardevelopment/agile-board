import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  sideNavOpened = true;
  sideNavMode: 'side' | 'over' = 'side';
  toolBarHeight = 64;
  private readonly mediaWatcher: Subscription;
  // https://stackoverflow.com/questions/45350716/detecting-real-time-window-size-changes-in-angular-4
  // constructor(media: MediaObserver) {
    // this.mediaWatcher = media.media$.subscribe((change: MediaChange) => {
    //   if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
    //     if (this.sideNavOpened) {
    //       this.sideNavOpened = false;
    //     }
    //     this.sideNavMode = 'over';
    //   } else {
    //     this.sideNavOpened = true;
    //     this.sideNavMode = 'side';
    //   }
    //   if (change.mqAlias === 'xs') {
    //     this.toolBarHeight = 56;
    //   } else {
    //     this.toolBarHeight = 64;
    //   }
    // });
  // }
  ngOnInit() { }

  ngOnDestroy(): void {
    if(this.mediaWatcher)
    this.mediaWatcher.unsubscribe();
  }
}
