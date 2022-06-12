import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {DebunkerServise} from "../shared/services/debunker.service";
import {Source} from "../shared/classes/Source";

@Component({
  selector: 'app-source-page',
  templateUrl: './source-page.component.html',
  styleUrls: ['./source-page.component.css']
})
export class SourcePageComponent implements OnInit {

  source$: Observable<Source[]>

  constructor(private debunkerServise: DebunkerServise) {
  }

  ngOnInit(): void {
    this.source$ = this.debunkerServise.getAllSources();
  }

}
