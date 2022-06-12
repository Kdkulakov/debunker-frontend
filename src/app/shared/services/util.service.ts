import {Injectable} from '@angular/core';
import {User} from "../classes/User";
import {Subject} from "rxjs";

// Встпомогательный сервис
@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public CLOSE_TIME = 3000;

  public users: User[] = [{
    id: '1',
    username: 'Diana',
    password: 'qwe',
    email: 'qwe@mail.com',
  },
    {
      id: '456',
      username: 'Username',
      password: 'asd',
      email: 'asd@mail.com',
    }]

  public dataModal = new Subject();
  public formData = new Subject();

  private data: any;
  private mainTopic: any;
  private fact: any;

  constructor() {
  }

  setData(data: any) {
    this.data = data;
  }

  setFact(fact: any) {
    console.log(' Установка fact');
    console.log(this.fact);
    this.fact = fact;
  }

  getData() {
    let temp = this.data;
    this.clearData();
    return temp;
  }

  getFact() {
    let temp = this.fact;
    this.clearData();
    return temp;
  }

  setMainTopic(mainTopic: any) {
    this.mainTopic = mainTopic;
  }

  getMainTopic() {
    let temp = this.mainTopic;
    this.clearData();
    return temp;
  }

  clearMainTopic() {
    this.mainTopic = undefined;
  }

  clearData() {
    this.data = undefined;
  }

  clearFact() {
    this.fact = undefined;
  }

  // Методы для передачи данных из модалки решения в форму "решения"
  setModalDataFromForm(arr: Array<number | string>) {
    this.dataModal.next(arr);
  }

  setFormDataFromModal(arr: Array<string>) {
    this.formData.next(arr);
  }

  convertStatus(backState: any) {
    var strState = '';
    if (backState == '0') {
      strState = 'Новый';
    }
    if (backState == '1') {
      strState = 'На исследовании';
    }
    if (backState == '2') {
      strState = 'Подтвержден';
    }
    if (backState == '3') {
      strState = 'Fake';
    }
    return strState;
  }

  isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

}
