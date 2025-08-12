import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { TuiTabs } from "@taiga-ui/kit";

@Component({
  standalone: true,
  selector: "app-navigation",
  imports: [TuiTabs],
  templateUrl: "./navigation.html",
  styleUrl: "./navigation.scss",
})
export class Navigation {
  protected activeItemIndex = 0;
  public constructor(private router: Router){}
  goToLink(link: string) {
     // Дополнительные действия, если нужно
     this.router.navigate([link]);
   }
}
