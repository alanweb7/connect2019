import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { TranslateConfigService } from '../../lang/translate-config.service';

import { Platform } from '@ionic/angular';

import { TranslateService } from '@ngx-translate/core';

import { ApiService } from 'src/app/services/api/api.service';
import { CacheService } from 'src/app/services/storage/cache.service';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { GetData, MiscService } from "../../services/tools/misc.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private host = 'https://kscode.com.br/ksc_2020';
  private apiUrl: string;
  private url: string;
  public responseApi:any = {};
  public messageStyle;

  selectedLanguage: string;

  // @ViewChild('input', { static: false }) myInput: Input;
  public message: string;
  public modalIsOpen: boolean;
  public signupform: FormGroup;
  public loginForm: FormGroup;

  public keyBoardisOpen: Boolean = false;

  codeNumber: any;

  public language: string = "pt";
  public langTrans;

  constructor(
    private router: Router,
    private cache: CacheService,
    private api: ApiService,
    private tools: MiscService,
    public platform: Platform,
    public _translate: TranslateService,
    private translateConfigService: TranslateConfigService,
    private formBuilder: FormBuilder,
    private qrScanner: QRScanner,
    private keyboard: Keyboard,
    private getdata: GetData

  ) {



    this.platform.ready().then((res) => {


      this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
      this._translate.setDefaultLang(this.selectedLanguage);

    });

    this.signupform = this.formBuilder.group({

      codeNumber: new FormControl('', [])

    });

  }

  ionViewDidEnter() {
    // this.selectedLanguage = 'pt';

    this.getParams('?card=vitoria&codeID=812');

  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit function enter');

    this.platform.ready().then(() => {

      this.keyboard.onKeyboardShow().subscribe(() => {
        this.altenateLogo();
        let tabs = document.querySelectorAll('.show-tabbar');
        if (tabs !== null) {
          Object.keys(tabs).map((key) => {
            tabs[key].style.display = 'none';
          });
        }
      });

      let teclado = this.keyboard.onKeyboardHide().subscribe(() => {
        this.altenateLogo();
        let tabs = document.querySelectorAll('.show-tabbar');
        if (tabs !== null) {
          Object.keys(tabs).map((key) => {
            tabs[key].style.display = 'flex';
          });
        }
      });
    });


  }
  ngOnInit() {
    console.log('ngOnInit function enter');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad function enter');
  }


  getCode() {
    this.tools.presentLoading();
    let code = this.signupform.value.codeNumber;
    this.api.getCode(code).then((res) =>{
      console.log('Dados do code pesquisado na home: ', res);
      if( res.status !== 200 ){

        this.tools.dismissAll();
        this.messageStyle = {
          'color': 'red'
        };
        this.responseApi = res;
      }
    });
  }

  getParams(url = null) {

   let data = this.getdata.getParams('https://www.kscode.com.br?card=vitoria&code_id=812');
   console.log('Get Data: ',data);

  }

  altenateLogo() {
    this.keyBoardisOpen = this.keyBoardisOpen ? false : true;
  }


}
