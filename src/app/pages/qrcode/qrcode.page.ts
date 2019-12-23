import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

// services
import { GetData } from "../../services/tools/misc.service";
import { ApiService } from "../../services/api/api.service";


@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {

  public codeScan: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private qrScanner: QRScanner,
    private getdata: GetData,
    private api: ApiService
  ) {

    // let value = navParams.get('item');

  }

  ngOnInit() {

    this.qrscanner();
    let myId = this.activatedRoute.snapshot.paramMap.get('id');

    console.log('Meu id recebido: ', myId);
  }


  qrscanner() {

    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          console.log('authorized');

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);

            let data = this.getdata.getParams(text);

            console.log('Get Data: ', data);

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            if (data.code) {

              this.api.getCode(data.code).then((res) => {
                console.log('dados do code escaneado: ',res);
              });

            }

            alert('O código não corresponde a nenhum canal Connect. \n\n Código do QR: '+ data);

          });
          // show camera preview
          window.document.querySelector('ion-app').classList.add('transparentBody');
          this.qrScanner.show();

          this.qrScanner.resumePreview();

          // show camera preview
          this.qrScanner.show()
            .then((data: QRScannerStatus) => {
              console.log(data.showing);
            }, err => {
              alert(err);

            });

          // wait for user to scan something, then the observable callback will be called

        } else if (status.denied) {
          alert('bloqueado');
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          alert('else');
        }
      })
      .catch((e: any) => {
        alert('Error is' + e);
      });

  }

}
