import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import Hero from "../../../../server/src/models/hero";
import { HeroService } from "../common/services/hero.service";

@Component({
  selector: "app-find",
  templateUrl: "./find.component.html",
  styleUrls: ["./find.component.scss"],
})
export class FindComponent implements OnInit {
  character: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const heroId = this.route.snapshot.paramMap.get("id");

    this.heroService.getHeroesById(heroId).subscribe((hero) => {
      this.character = hero;
    });
  }
}
