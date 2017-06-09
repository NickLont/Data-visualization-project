import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
      <div id="wrapper">
          <navbar></navbar>
          <router-outlet></router-outlet>
          <!--<footerComp></footerComp>-->
      </div>
`
})

export class AppComponent  {  }
