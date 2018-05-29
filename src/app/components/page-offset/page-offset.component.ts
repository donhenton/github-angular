import { Component, OnInit, Input, AfterViewInit, forwardRef, Output, EventEmitter, Renderer2, ElementRef } from '@angular/core';
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


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
  @Input() _value = 1;
  onChange: any = () => { };
  onTouched: any = () => { };


  constructor(private _renderer: Renderer2, private _elementRef: ElementRef) { }

  ngOnInit() {
  }

  get value() {
    return this._value;
  }
  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }
  writeValue(value: any) {
    // tells Angular how to write value from model into view
    if (value) {
      this.value = value;
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
