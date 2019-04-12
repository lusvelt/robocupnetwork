import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[selectOnFocus]'
})
export class SelectOnFocusDirective {
  @Input('selectOnFocus') newValue: any;

  constructor(private el: ElementRef) { }

  @HostListener('click') onClick() {
    if (this.newValue && (!this.el.nativeElement.value || this.el.nativeElement.value === '0')) this.el.nativeElement.value = this.newValue;
    this.el.nativeElement.select();
  }
}
