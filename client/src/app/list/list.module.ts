import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListComponent } from "./list.component";
import { RouterModule } from "@angular/router";
import { CardComponent } from "../card/card.component";
import { BrowserModule } from "@angular/platform-browser";

export const ROUTES = [{ path: "", component: ListComponent }];

@NgModule({
  declarations: [ListComponent, CardComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
})
export class ListModule {}
