import { Component } from '@angular/core';

import { routerTransition } from '../router.animations';

@Component({
  selector: 'appc-signalr',
  animations: [routerTransition],
  templateUrl: './signalr.component.html',
  styleUrls: ['./signalr.component.scss']
})
export class SignalrComponent {
  public isSubCollapsed:boolean =true;

  public subCollapse() {
      this.isSubCollapsed = !this.isSubCollapsed
  }
  menus = [
    { route: 'chat', text: 'Chat' },
    { route: 'moveshape', text: 'Move shape' }
  ];

  public getState(outlet: any) {
    return outlet.activatedRouteData.state;
  }

}
