import { TuiRoot } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from "./components/navigation/navigation";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, Navigation],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'test-doc';
}
