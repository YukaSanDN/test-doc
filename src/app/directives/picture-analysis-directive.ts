import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from "@angular/core";
import { PictureAnalysisValue } from "../models/analysis-picture.model";

@Directive({
  selector: "[pictureAnalysisDirective]",
  standalone: true,
})
export class PictureAnalysisDirective {
  @Output()
  public pictureAnalysisValue: EventEmitter<PictureAnalysisValue> = new EventEmitter<PictureAnalysisValue>();
  private clickCount = 0;
  private timer: any;

  public constructor(private el: ElementRef) {}

  @HostListener("click", ["$event"])
  clickByElement(value: MouseEvent): void {
    this.clickCount++;
    if (this.clickCount === 1) {
      this.timer = setTimeout(() => {
        if (this.clickCount !== 0) {
          this.pictureAnalysisValue.next({
            clickX: value.offsetX,
            clickY: value.offsetY,
            currentWidth: this.el.nativeElement.width,
            currentHeight: this.el.nativeElement.height,
            naturalWidth: this.el.nativeElement.naturalWidth,
            naturalHeight: this.el.nativeElement.naturalHeight,
            percentCurrentFromNaturalWidth:
              (this.el.nativeElement.width /
                this.el.nativeElement.naturalWidth) *
              100,
            percentCurrentFromNaturalHeight:
              (this.el.nativeElement.height /
                this.el.nativeElement.naturalHeight) *
              100,
          } as PictureAnalysisValue);
        }
        this.clickCount = 0;
      }, 300);
    }
  }
}
