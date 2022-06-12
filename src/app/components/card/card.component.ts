import {Component, Input, OnInit } from '@angular/core';
import {UtilService} from "../../shared/services/util.service";

// Кастомная шаблон-компонента блоков ( Картачка новости и карточка ресурсы)
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  item: any;
  @Input()
  isCursored: any;

  @Input()
  item_card_title: boolean;
  @Input()
  item_card_content: boolean;
  @Input()
  item_card_info: boolean;
  @Input()
  item_card_date: boolean;
  @Input()
  item_card_state: boolean;

  localeDate:string

  constructor(public utilService: UtilService) {
    this.isCursored = false;
    this.item_card_title =false;
    this.item_card_content =false;
    this.item_card_info =false;
    this.item_card_date =false;
    this.item_card_state =false;
  }

  ngOnInit(): void {
    this.localeDate=new Date(this.item.created).toLocaleDateString()
  }

}
