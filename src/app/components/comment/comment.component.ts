import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {DebunkerServise} from "../../shared/services/debunker.service";
import {UtilService} from "../../shared/services/util.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";

// Кастомная шаблон-компонента блока с комментариями
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy  {

  @Input()
  public commentList: any
  @Input()
  public factId: string;

  public commentStr: string;
  public commentField: FormControl;

  public aSub: Subscription;

  public subscriptionUser: Subscription;
  public userId: string;

  constructor(private debunkerServise: DebunkerServise,
              private utilService: UtilService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.commentField = new FormControl(null);
    this.subscriptionUser=this.debunkerServise.getUserById().subscribe(userId=>{
      this.userId=userId.id;
    })
  }

  onSubmit(event: Event) {
    //this.aSub =
    this.debunkerServise.createComment(this.factId, this.userId, this.commentField.value).subscribe(
      response => {
        this.debunkerServise.getCommentsByFactId(this.factId).subscribe(
          response => {
            this.commentList=response.comments_items;
          }
        )
      },
      error => this._snackBar.open('Комментарий не добавлен','Закрыть', {
        duration: this.utilService.CLOSE_TIME
      }),
    )
    this.commentField.reset();
  }

  //Отписываемся от подписок, чтобы не было утечек памяти
  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}
