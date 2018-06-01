import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NvD3Component } from 'ng2-nvd3';
declare let d3: any;


@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.scss',
    './../../../../node_modules/nvd3/build/nv.d3.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraphPageComponent implements OnInit {
  options;
  allGraphData;
  currentGraphData;
  @ViewChild('graph') graph: NvD3Component;
  // currentGraph = 'forks'; // forks or stars
  storedGraph = 'forks';
  graphForm: FormGroup;
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
    const me = this;

    this.createForm();
    this.graphForm.valueChanges.subscribe(this.formChange.bind(this));

    this.route.data
      .subscribe((data) => {

        this.options = this.setOptions(data);
        this.allGraphData = data;
        this.setData();


      });

  }

  formChange(data) {

    this.setData();
  }

  createForm() {

    this.graphForm = this.formBuilder.group({
      graphType: [this.storedGraph]
    });
  }

  setData() {

    const modData = this.allGraphData['itemData'][this.currentGraph];

    this.currentGraphData = [modData];


  }

  get currentGraph() {
    return this.graphForm.get('graphType').value;
  }

  getXAxisLabel() {

    return ' Bucket Range (x 1000)';
  }
  setOptions(data) {

    return {
      chart: {
        type: 'discreteBarChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 50,
          left: 55
        },
        x: function (d) { return d.label; },
        y: function (d) { return d.value; },
        showValues: true,
        valueFormat: function (d) {
          return d3.format(',')(d);
        },
        duration: 500,
        xAxis: {
          axisLabel: this.getXAxisLabel()
        },
        yAxis: {
          axisLabel: 'Count (x 1000)',
          axisLabelDistance: -10
        }
      }
    };
  }

}
