import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { ApiService } from "./services/api/api.service";
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/inicio',
      icon: 'home'
    },
    {
      title: 'Modelo',
      url: '/modelo',
      icon: 'list'
    },
    {
      title: 'Pesquisa',
      url: '/pesquisa',
      icon: 'search'
    },
    {
      title: 'Último Acesso',
      url: '/detalhe-code',
      icon: 'search'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private deeplinks: Deeplinks,
    private api: ApiService
  ) {
    platform.ready().then(() => {
      this.statusBar.styleDefault();
      setTimeout(()=>{
        this.splashScreen.hide();  
      },1000);
      this.initializeApp();
    });

  }

  initializeApp() {

      // deeplink function
      this.deeplinks.route({
        '/card': { 'card': 'DetalheCodePage', },
        '/sobre/:postId': 'SobrePage',
        '/user/:userId': 'UserDetailsPage',
        '/code/:code_id': 'ProductPage',
        '/:code_id': 'DetalheCodePage'
      }).subscribe(match => {
        // match.$route - the route we matched, which is the matched entry from the arguments to route()
        // match.$args - the args passed in the link
        // match.$link - the full link data
        // console.log('Successfully routed', match.$link.queryString.substring(4, 50));
        // console.log('Successfully routed', match.$link.queryString);
        console.log('Successfully matched route', match);
        if (match.$args.code_id) {
          let code = match.$args.code_id;
          this.api.getCode(code).then((res) => {

            console.log('Dados do code from deeplink (AppComponent): ', res);

          });

        }

      }, nomatch => {
        // nomatch.$link - the full link data
        console.error('Got a deeplink that didn\'t match', nomatch);
      });

  }
}
