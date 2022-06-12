import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Fact} from "../../shared/classes/Fact";
import {UtilService} from "../../shared/services/util.service";
import {Comment} from "../../shared/interfaces";
import {DebunkerServise} from "../../shared/services/debunker.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-fact-page',
  templateUrl: './fact-page.component.html',
  styleUrls: ['./fact-page.component.css']
})
export class FactPageComponent implements OnInit,OnDestroy {

  public fact: Fact;
  public factId: number;
  public commentsList: Comment[] = [];
  public imagesArr: string[] = [];
  private aSub: Subscription;
  constructor(public utilService: UtilService,
              private debunkerServise: DebunkerServise) {
    this.commentsList = [];
    this.imagesArr = [];
  }

  ngOnInit(): void {
    this.fact = this.utilService.getFact();
    this.factId=Number(this.fact.id);
    console.log(' fact на анализ странице:');
    console.log(this.fact);
    this.aSub=this.debunkerServise.getCommentsByFactId(this.fact.id).subscribe(
      commentsList => {
        this.commentsList = commentsList.comments_items;
      });
    const cloneFact = Object.assign({}, this.fact.images_items);
    let dataSrc = [];
    Object.values(cloneFact).forEach(
      value => {
        dataSrc.push(value.value);
      });
    this.imagesArr = dataSrc;
  }

  //Отписываемся от подписок, чтобы не было утечек памяти
  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}
