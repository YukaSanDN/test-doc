import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { Annotation } from "../../../models/page.model";
import { AsyncPipe } from "@angular/common";
import { TuiDropdown } from "@taiga-ui/core";
import { TuiPaletteModule } from "@taiga-ui/legacy";
import { BehaviorSubject } from "rxjs";
import {
  LucideAngularModule,
  Save,
  Palette,
  LetterText,
  SquareX,
  PencilLine,
  Eye,
} from "lucide-angular";
import { FormsModule } from "@angular/forms";
import { ElementMovement } from "../../../directives/element-movement";
import { PictureAnalysisValue } from "../../../models/analysis-picture.model";

const colorsText = new Map([
  ["grey", "var(--tui-text-primary)"],
  ["blue", "var(--tui-status-info)"],
  ["green", "var(--tui-status-positive)"],
  ["red", "var(--tui-status-negative)"],
]);

const colorsPalette = new Map([
  ["grey", "var(--tui-text-tertiary)"],
  ["blue", "var(--tui-text-action-hover)"],
  ["green", "var(--tui-text-positive-hover)"],
  ["red", "var(--tui-text-negative-hover)"],
]);

@Component({
  standalone: true,
  selector: "app-annotation",
  imports: [
    AsyncPipe,
    LucideAngularModule,
    TuiDropdown,
    TuiPaletteModule,
    FormsModule,
    ElementMovement,
  ],
  templateUrl: "./annotation.html",
  styleUrl: "./annotation.scss",
})
export class AnnotationData {
  @Input()
  public set anotationData(value: Annotation) {
  
    this._anotationData = value;
    const color = !value.commentColor
      ? colorsText.get("grey")
      : value.commentColor;
    this.updateColorLetterText(color as string);
    const colorPalette = !value.commentBackground
      ? colorsPalette.get("red")
      : value.commentBackground;
    this.updateColorPalette(colorPalette as string);
    this.annotationText = value.comment;
  }

  @Output()
  public remove: EventEmitter<number>;

  @Output()
  public moving: EventEmitter<{coordinate: {x:number, y:number}, annotation: Annotation}>;

  public get anotationData(): Annotation | null {
    return this._anotationData;
  }
  public annotationText: string | null = "";

  public colorsText = colorsText;
  public colorsPalette = colorsPalette;
  public isShowText: boolean;
  readonly save = Save;
  readonly paletteIcon = Palette;
  readonly letterText = LetterText;
  readonly removeIcon = SquareX;
  readonly pencilLine = PencilLine;
  readonly eye = Eye;

  protected colorLetterText$ = new BehaviorSubject(colorsText.get("grey"));
  protected colorPalette$ = new BehaviorSubject(colorsPalette.get("red"));

  private _anotationData: Annotation | null = null;

  public constructor() {
    this.remove = new EventEmitter<number>();
    this.moving = new EventEmitter<{coordinate: {x:number, y:number}, annotation: Annotation}>();
    this.isShowText = false;
  }

  protected updateColorLetterText(color: string): void {
    (this.anotationData as Annotation).commentColor = color as string;
    this.colorLetterText$.next(color);
  }
  protected updateColorPalette(color: string): void {
    (this.anotationData as Annotation).commentBackground = color as string;
    this.colorPalette$.next(color);
  }

  protected saveValue(): void {
    if (
      typeof this.annotationText === "string" &&
      (this.annotationText as string)?.length > 0
    ) {
      (this.anotationData as Annotation).comment = this
        .annotationText as string;
      (this.anotationData as Annotation).isFilled = true;
    }
  }

  protected removeAnnotation(): void {
    if (!this.anotationData) {
      return;
    }

    this.remove.next(this.anotationData?.index as number);
  }

  protected updateAnnotation(): void {
    if (!this.anotationData) {
      return;
    }

    this.anotationData.isFilled = false;
  }

  protected showAnnotation(): void {
    this.isShowText = !this.isShowText;
  }

  protected elementPosition(position: {x:number, y:number}): void {

      this.moving.next({coordinate: position, annotation: this.anotationData as Annotation});
  }
}
