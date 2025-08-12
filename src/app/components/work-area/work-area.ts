import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ReceivingData } from "../../services/receiving-data/receiving-data";
import { Annotation, Page } from "../../models/page.model";
import { tap } from "rxjs";
import { PictureAnalysisDirective } from "../../directives/picture-analysis-directive";
import { PictureAnalysisValue } from "../../models/analysis-picture.model";

@Component({
  standalone: true,
  selector: "app-work-area",
  templateUrl: "./work-area.html",
  styleUrl: "./work-area.scss",
  imports: [PictureAnalysisDirective],
  providers: [ReceivingData],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkArea implements OnInit {
  public set pages(pages: Page[]) {
    this._pages = pages;
  }

  public get pages(): Page[] {
    return this._pages;
  }

  private _pages: Page[];
  public constructor(private receivingData: ReceivingData) {
    this._pages = new Array<Page>();
  }

  public ngOnInit(): void {
    this.receivingData
      .getPage()
      .pipe(
        tap((pages: Page[]) => {
          this.pages = pages;
        })
      )
      .subscribe();
  }

  public pictureAnalysisValue(
    eventValue: PictureAnalysisValue,
    page: Page
  ): void {
    console.log(eventValue);
    console.log(page);
    page.annotations?.push({
      index: page.annotations.length+1,
      initialCoordinates: eventValue,
      comment: null,
      image: null,
      isFilled: false,
    } as Annotation);
  }
}
