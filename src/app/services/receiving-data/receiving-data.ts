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
            annotations: !page?.annotations ? [] : page?.annotations?.map((annotation: any) => {
              return {
                initialCoordinates: annotation.initialCoordinates,
                comment: annotation.comment,
                image: annotation.image,
              } as Annotation;
            }),
          } as Page;
        });
      })
    );
  }
}
