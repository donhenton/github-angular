import { Component, OnInit, Input, AfterViewInit, forwardRef, Output, EventEmitter, Renderer2, ElementRef } from '@angular/core';
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// https://blog.thoughtram.io/angular/2016/07/27/custom-form-controls-in-angular-2.html
// https://medium.com/@tarik.nzl/angular-2-custom-form-control-with-validation-json-input-2b4cf9bc2d73

@Component({
  selector: 'app-page-offset',
  templateUrl: './page-offset.component.html',
  styleUrls: ['./page-offset.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => PageOffsetComponent),

    }
  ]

})
export class PageOffsetComponent implements OnInit, ControlValueAccessor {

  @Input() public collectionItems: any[];
  @Input() public formControlName: any;
  @Input() public parentForm: FormGroup;
  @Input() public totalPages = 0;
  _value = 1;
  onChange: any = () => { };
  onTouched: any = () => { };


  constructor(private _renderer: Renderer2, private _elementRef: ElementRef) { }

  ngOnInit() {
  }

  public reset() {
    this.writeValue(1);
  }

 detectChange(ev) {
  // console.log(ev.target.value);
  this.value = ev.target.value;
 }

  get value() {
    return this._value;
  }
  set value(val) {
   // console.log(`setting ${this.value} to ${val}`);
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }
  writeValue(value: any) {
    // tells Angular how to write value from model into view
   // console.log(`writeValue ${value}`);
    if (value) {
      this.value = value;
    }
  }

  arrowAction(action, ev) {
    ev.preventDefault();
    // const newValue: any =  this.value ;
    const newValue = parseInt(this.value + '', 10);
    if (action === 'up') {
      this.value = (newValue + 1);
      if (this.value > this.totalPages) {
        this.value = this.totalPages;
      }
    } else {
      this.value = (newValue - 1);
      if (this.value < 1) {
        this.value = 1;
      }
    }
  }

  registerOnChange(fn: any) {
    // registers a handler function that is called when the view changes
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    // registers a handler to be called when the component receives a touch event, useful for knowing if the component has been focused
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
     this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
   }



}
