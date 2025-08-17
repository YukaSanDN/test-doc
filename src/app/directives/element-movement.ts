import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from "@angular/core";
import { PictureSizeValue } from "../models/analysis-picture.model";

@Directive({
  selector: "[elementMovement]",
})
export class ElementMovement {
  @Output()
  public elementPosition: EventEmitter<any> = new EventEmitter<any>();

  private startX: number = 0;
  private startY: number = 0;

  private isStartMoving: boolean = false;
  constructor(private el: ElementRef) {}

  @HostListener("mousedown", ["$event"])
  mousedown(value: MouseEvent): void {
    this.startX = value.clientX - this.el.nativeElement.offsetLeft;
    this.startY = value.clientY - this.el.nativeElement.offsetTop;

    this.isStartMoving = true;
  }

  @HostListener("mouseup", ["$event"])
  mouseup(value: MouseEvent): void {
    this.isStartMoving = false;
  }

  @HostListener("mousemove", ["$event"])
  mousemovePositionValue(value: MouseEvent): void {
    if (!this.isStartMoving) {
      return;
    }

    let x = value.clientX - this.startX;
    let y = value.clientY - this.startY;

    this.elementPosition.next({
      x: x,
      y: y,
    });
  }
}
