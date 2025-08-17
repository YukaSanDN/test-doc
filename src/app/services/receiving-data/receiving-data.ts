import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Annotation, Page } from "../../models/page.model";

@Injectable({
  providedIn: "root",
})
export class ReceivingData {
  public constructor(private http: HttpClient) {}

  public getPage(): Observable<Page[]> {
    return this.http.get("http://localhost:3000/pages").pipe(
      map((pages: any) => {
        return pages.map((page: any) => {
          return {
            number: page.number,
            imageUrl: page.imageUrl,
            annotations: !page?.annotations
              ? []
              : page?.annotations?.map((annotation: any) => {
                  return {
                    index: annotation.index,
                    initialCoordinates: annotation.initialCoordinates,
                    comment: annotation.comment,
                    isFilled: annotation.isFilled,
                    commentColor: annotation.commentColor,
                    commentBackground: annotation.commentBackground,
                  } as Annotation;
                }),
          } as Page;
        });
      })
    );
  }

  public updatePage(pages: Page[]): void {
    const body = {
      pages: pages,
    };
    pages.forEach((page: Page) => {
      this.http
        .patch(`http://localhost:3000/pages/${page.number}`, page)
        .subscribe();
    });
  }
}
