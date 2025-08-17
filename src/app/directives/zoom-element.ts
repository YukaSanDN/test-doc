import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[zoomElement]",
})
export class ZoomElement {
  @Input()
  public set zoomValue(zoom: number) {
    this._zoomValue = zoom;
    if (this.isStart) {
      this.isStart = false;
      return;
    }

    this.changeZoom();
  }
  @Input()
  public set identifier(value: string) {
    this._identifier = value;
  }

  private _identifier: string | null = null;
  private _zoomValue: number = 0;
  private _oldZoom: number = 0;
  private _widthConst: number = 0;
  private _img: HTMLImageElement | undefined = undefined;
  private isStart: boolean = true;
  constructor(private el: ElementRef) {}


  @HostListener("mousedown", ["$event"])
  mousedown(value: MouseEvent): void {}

  @HostListener("mouseup", ["$event"])
  mouseup(value: MouseEvent): void {}

  @HostListener("mousemove", ["$event"])
  mousemovePositionElement(value: MouseEvent): void {}

  private changeZoom(): void {
    if(!this._img){
      this.getImsge();
    }
    if (this._zoomValue > this._oldZoom) {
      (this._img as HTMLImageElement).width =
        this._widthConst + this._widthConst * (0.1 * this._zoomValue);
    }
    if (this._zoomValue < this._oldZoom) {
      (this._img as HTMLImageElement).width =
        this._widthConst + this._widthConst * (0.1 * this._zoomValue); - this._widthConst * (0.1 * this._zoomValue);
    }

    this._oldZoom = this._zoomValue;
  }


  private getImsge(): void{
    if ("DIV" !== this.el.nativeElement.nodeName) {
      return;
    }

    const img = Array.from(
      this.el.nativeElement.childNodes as HTMLElement[]
    ).find((e: HTMLElement) =>
      e.nodeName === "IMG" &&
      e.attributes.getNamedItem(this._identifier as string)
        ? e
        : null
    );

    if (!img) {
      return;
    }

    this._img = img as HTMLImageElement;
    this._widthConst = this._img.width;
  }
}
