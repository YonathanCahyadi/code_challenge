import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListComponent } from "./list.component";
import { RouterModule } from "@angular/router";
import { CardComponent } from "../card/card.component";
import { BrowserModule } from "@angular/platform-browser";
import { FilterPipe } from "../filter.pipe";
import { FormsModule } from "@angular/forms";

export const ROUTES = [{ path: "", component: ListComponent }];

@NgModule({
  declarations: [ListComponent, CardComponent, FilterPipe],
  imports: [CommonModule, RouterModule.forChild(ROUTES), FormsModule],
})
export class ListModule {}
