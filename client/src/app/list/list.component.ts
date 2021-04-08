import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Hero from "../../../../server/src/models/hero";
import { HeroService } from "../common/services/hero.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  constructor(private heroService: HeroService, private router: Router) {}

  heroes: Hero[];
  keyword: string;

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe(
      (heroes) => {
        this.heroes = heroes;
      },
      (err) => {
        this.router.navigateByUrl("/");
      }
    );
  }
}
