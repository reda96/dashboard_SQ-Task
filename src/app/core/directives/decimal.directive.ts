
   import { Directive, HostListener, ElementRef, Input } from '@angular/core';
   import { NgControl } from '@angular/forms';

   @Directive({
     selector: '[decimalInput]'
   })
   export class DecimalInputDirective {

     @Input() decimalPlaces: number = 2;

     constructor(private el: ElementRef, private control: NgControl) {}

     @HostListener('input', ['$event']) onInputChange(event: any) {
       const initialValue = this.el.nativeElement.value;
       let newValue = initialValue.replace(/[^0-9.]/g, '');
       const parts = newValue.split('.');
       if (parts.length > 1) {
         parts[1] = parts[1].slice(0, this.decimalPlaces);
         newValue = parts.join('.');
       }
       this.el.nativeElement.value = newValue;
       this.control.control?.setValue(Number(newValue));
     }
   }