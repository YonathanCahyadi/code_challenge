import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import Hero from "../../../../server/src/models/hero";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;
  @Input() pictureUrl: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  redirect(id: string) {
    this.router.navigateByUrl(`/heroes/${id}`);
  }
}
