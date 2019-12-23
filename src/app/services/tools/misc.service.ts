import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  constructor(
    public loadingController: LoadingController
  ) { }

  testeLegal(){

  }
  async presentLoading(param = null) {
    if(!param){
      param = 'Aguarde';
    };
    const loading = await this.loadingController.create({
      message: param,
      duration: 30000
    });
    await loading.present();
  }

    /**
   * Dismiss all the pending loaders, if any
   */
  async dismissAll() {
    while (await this.loadingController.getTop() !== undefined) {
      await this.loadingController.dismiss();
    }
  }

}

@Injectable({
  providedIn: 'root'
})
export class GetData {

  constructor() { }
  // funcoes a partir daqui
  getParams(url = null) {
    if (!url) {
      url = "?id=07&name=Alan"
    };
    if (!url.includes('?')) {
      return url;
    }
    let parametrosDaUrl = url.split("?")[1]; // id=10&name=gustavo
    let listaDeParametros = parametrosDaUrl.split("&") // ["id=10","name=gustavo"];

    let hash: any = {}

    for (let i = 0; i < listaDeParametros.length; i++) {
      let parametro = listaDeParametros[i].split("=");
      let chave = parametro[0];
      let valor = parametro[1];
      hash[chave] = valor;
    }
    return hash;
  }

}

