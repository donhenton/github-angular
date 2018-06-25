import { Component, OnInit, Input  } from '@angular/core';
import { GithubResult, GithubPage } from '../../services/github.interfaces';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-github-item',
  templateUrl: './github-item.component.html',
  styleUrls: ['./github-item.component.scss']
})
export class GithubItemComponent implements OnInit {

  @Input() pageData: GithubPage;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  getDescriptionText(g: GithubResult) {

    let text: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(g.description);
    if (g.highlightText) {
        text = this.sanitizer.bypassSecurityTrustHtml(g.highlightText);
    }
    return text;

}


}
