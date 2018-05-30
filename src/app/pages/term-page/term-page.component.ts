import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-term-page',
  templateUrl: './term-page.component.html',
  styleUrls: ['./term-page.component.scss']
})
export class TermPageComponent implements OnInit {

  languages = null;
  topics = null;

  constructor(private route: ActivatedRoute, ) { }

  ngOnInit() {
    const me = this;
    this.route.data
      .subscribe((data) => {
        me.languages = data['itemData']['unique_lang'];
        me.topics = data['itemData']['unique_topics'];

      });

  }

}
