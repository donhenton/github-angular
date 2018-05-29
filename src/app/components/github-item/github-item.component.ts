import { Component, OnInit, Input } from '@angular/core';
import { GithubResult, GithubPage } from '../../services/github.interfaces';

@Component({
  selector: 'app-github-item',
  templateUrl: './github-item.component.html',
  styleUrls: ['./github-item.component.scss']
})
export class GithubItemComponent implements OnInit {

  @Input() pageData: GithubPage;
  constructor() { }

  ngOnInit() {
  }

}
