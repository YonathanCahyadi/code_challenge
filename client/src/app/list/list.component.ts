import { Component, OnInit } from "@angular/core";
import Hero from "../../../../server/src/models/hero";
import { HeroService } from "../common/services/hero.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  constructor(private heroService: HeroService) {}

  heroes: Hero[];
  keyword: string;

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
    });
  }
}
