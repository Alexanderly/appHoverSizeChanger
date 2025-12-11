import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHoverSizeChanger]',
  standalone: true,
})
export class HoverSizeChangerDirective implements OnInit {
  //  размер шрифта max
  @Input() maxSize: string = '48px';

  // начинает расти
  @Output() grow = new EventEmitter<string>();

  // начинает уменьшаться
  @Output() reduce = new EventEmitter<string>();

  private initialSize!: string;
  private isGrowing = false;
  private isReducing = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    // исходный размер шрифта
    const style = window.getComputedStyle(this.el.nativeElement);
    this.initialSize = style.fontSize;

    // плавный переход
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      'font-size 0.3s ease'
    );
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.isGrowing) {
      this.isGrowing = true;
      this.isReducing = false;
      // как растет - текущий размер отдаём
      this.grow.emit(this.initialSize);
    }

    this.renderer.setStyle(this.el.nativeElement, 'font-size', this.maxSize);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (!this.isReducing) {
      this.isReducing = true;
      this.isGrowing = false;

      const currentSize = window.getComputedStyle(
        this.el.nativeElement
      ).fontSize;

      // как уменьшается отдаем текущий размер
      this.reduce.emit(currentSize);
    }

    this.renderer.setStyle(this.el.nativeElement, 'font-size', this.initialSize);
  }
}
