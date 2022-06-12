import {Component, OnInit} from '@angular/core';
import {MainTopic} from "../shared/classes/MainTopic";
import {Observable} from "rxjs";
import {DebunkerServise} from "../shared/services/debunker.service";
import {Router} from "@angular/router";
import {UtilService} from "../shared/services/util.service";

@Component({
  selector: 'app-analysis-page',
  templateUrl: './analysis-page.component.html',
  styleUrls: ['./analysis-page.component.css']
})
export class AnalysisPageComponent implements OnInit {

  //Подписка на получение всех Новостей из БД
  public mainTopic$: Observable<MainTopic[]>

  constructor(private router: Router,
              public utilService:UtilService,
              private debunkerServise: DebunkerServise) {

  }

  ngOnInit(): void {
    this.mainTopic$ = this.debunkerServise.getAllNews();
  }

  //Открытие новости по клику
  openNews(mainTopic: MainTopic) {
    console.log(' Выбранный mainTopic из списка новостей:');
    console.log(mainTopic);
    this.utilService.setData(mainTopic);
    this.router.navigate(['/newsanalysis',mainTopic.id]);
  }

}
