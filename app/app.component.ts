import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
      <div id="wrapper">
          <navbar></navbar>
          <router-outlet></router-outlet>
      </div>
`
})

export class AppComponent  {  }
