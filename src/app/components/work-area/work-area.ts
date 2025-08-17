import { Component, OnInit } from "@angular/core";
import { ReceivingData } from "../../services/receiving-data/receiving-data";
import { Annotation, Page } from "../../models/page.model";
import { tap } from "rxjs";
import { PictureAnalysisDirective } from "../../directives/picture-analysis-directive";
import {
  PictureAnalysisValue,
  PicturesResizeValue,
} from "../../models/analysis-picture.model";
import { AnnotationData } from "./annotation/annotation";
import { TuiButton } from "@taiga-ui/core";
import { ZoomElement } from "../../directives/zoom-element";

@Component({
  standalone: true,
  selector: "app-work-area",
  templateUrl: "./work-area.html",
  styleUrl: "./work-area.scss",
  imports: [PictureAnalysisDirective, ZoomElement, AnnotationData, TuiButton],
  providers: [ReceivingData],
})
export class WorkArea implements OnInit {
  public set pages(pages: Page[]) {
    this._pages = pages;
  }

  public get pages(): Page[] {
    return this._pages;
  }

  public zoomValue: number = 0;
  private _pages: Page[];

  public constructor(private receivingData: ReceivingData) {
    this._pages = new Array<Page>();
  }

  public ngOnInit(): void {
    this.receivingData
      .getPage()
      .pipe(
        tap((pages: Page[]) => {
          this.pages = JSON.parse(JSON.stringify(pages));
        })
      )
      .subscribe();
  }

  public zoom(up: boolean): void {
    if (up && this.zoomValue < 10) {
      this.zoomValue = this.zoomValue + 1;
      return;
    }

    if (!up && this.zoomValue > 0) {
      this.zoomValue = this.zoomValue - 1;
      return;
    }
  }

  public pictureAnalysisValue(
    eventValue: PictureAnalysisValue,
    page: Page
  ): void {
    page.annotations?.push({
      index:
        page.annotations.length === 0
          ? 1
          : page.annotations[page.annotations.length - 1].index + 1,
      initialCoordinates: eventValue,
      comment: null,
      isFilled: false,
    } as Annotation);
  }

  public pictureResizeValue(eventValue: PicturesResizeValue, page: Page): void {
    if (!page.annotations) {
      return;
    }

    (page.annotations as Annotation[]).forEach((annotation: Annotation) => {
      const widthRatio =
        ((eventValue.currentWidth /
          annotation.initialCoordinates.creationSize.currentWidth) *
          100) /
        100;


      annotation.initialCoordinates.currentPositionX =
        annotation.initialCoordinates.creationClickX * widthRatio;

      annotation.initialCoordinates.resizeCurrentPositionX =
        eventValue.resizeElement.currentWidth;


      const heightRatio =
        ((eventValue.currentHeight /
          annotation.initialCoordinates.creationSize.currentHeight) *
          100) /
        100;
      annotation.initialCoordinates.currentPositionY =
        annotation.initialCoordinates.creationClickY * heightRatio;
      annotation.initialCoordinates.resizeCurrentPositionY =
        eventValue.resizeElement.currentHeight;
    });
  }

  public removeAnnotations(index: number, page: Page): void {
    const searhcIndex = page.annotations?.findIndex(
      (item) => item.index === index
    );
    if (searhcIndex === undefined) {
      return;
    }

    page.annotations?.splice(searhcIndex, 1);
  }

  public movingAnnotations(
    value: { coordinate: { x: number; y: number }; annotation: Annotation },
    page: Page
  ): void {
    const pageAnnotations = page.annotations?.find(
      (item) => item === value.annotation
    );
    if (!pageAnnotations) {
      return;
    }

    (
      pageAnnotations.initialCoordinates as PictureAnalysisValue
    ).currentPositionX = value.coordinate.x as number;
    (
      pageAnnotations.initialCoordinates as PictureAnalysisValue
    ).currentPositionY = value.coordinate.y as number;

    (
      pageAnnotations.initialCoordinates as PictureAnalysisValue
    ).creationClickX = value.coordinate.x as number;

    (
      pageAnnotations.initialCoordinates as PictureAnalysisValue
    ).creationClickY = value.coordinate.y as number;

    pageAnnotations.initialCoordinates.creationSize.currentWidth =
      pageAnnotations.initialCoordinates.resizeCurrentPositionX;
    pageAnnotations.initialCoordinates.creationSize.currentHeight =
      pageAnnotations.initialCoordinates.resizeCurrentPositionY;
  }

  public save(): void {
    this.receivingData.updatePage(this.pages);
  }
}
