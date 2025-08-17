import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from "@angular/core";
import {
  PictureAnalysisValue,
  PictureSizeValue,
  PicturesResizeValue,
} from "../models/analysis-picture.model";

@Directive({
  selector: "[pictureAnalysisDirective]",
  standalone: true,
})
export class PictureAnalysisDirective {
  @Output()
  public pictureAnalysisValue: EventEmitter<PictureAnalysisValue> = new EventEmitter<PictureAnalysisValue>();

  @Output()
  public picturereSizeValue: EventEmitter<PicturesResizeValue> = new EventEmitter<PicturesResizeValue>();

  private clickCount = 0;
  private timer: any;
  private isLoad: boolean = false;

  public constructor(private el: ElementRef) {
    if ("IMG" !== el.nativeElement.nodeName) {
      return;
    }
  }

  @HostListener("load")
  load(): void {
    this.isLoad = true;
  }

  @HostListener("resize", ["$event"])
  resizeElement(value: Event): void {
    if (!this.isLoad) {
      return;
    }

    this.picturereSizeValue.next({
      currentWidth: this.el.nativeElement.width,
      currentHeight: this.el.nativeElement.height,
      resizeElement: {
        currentWidth: this.el.nativeElement.width,
        currentHeight: this.el.nativeElement.height,
      },
    } as PicturesResizeValue);
  }

  @HostListener("click", ["$event"])
  clickByElement(value: MouseEvent): void {
    this.clickCount++;
    if (this.clickCount === 1) {
      this.timer = setTimeout(() => {
        if (this.clickCount === 2) {
          this.pictureAnalysisValue.next({
            creationClickX: value.offsetX,
            creationClickY: value.offsetY,
            currentPositionX: value.offsetX,
            currentPositionY: value.offsetY,
            creationSize: {
              currentWidth: this.el.nativeElement.width,
              currentHeight: this.el.nativeElement.height,
            },
            naturalWidth: this.el.nativeElement.naturalWidth,
            naturalHeight: this.el.nativeElement.naturalHeight,
            resizeCurrentPositionX: 0,
            resizeCurrentPositionY: 0,
          } as PictureAnalysisValue);
        }
        this.clickCount = 0;
      }, 300);
    }
  }
}
