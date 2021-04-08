import { Pipe, PipeTransform } from "@angular/core";
import Hero from "../../../server/src/models/hero";

@Pipe({
  name: "filterPipe",
})
export class FilterPipe implements PipeTransform {
  transform(value: Hero[], searchWord: string): Hero[] {
    if (searchWord) {
      return value.filter((hero: Hero) => {
        return hero.name.toLowerCase().includes(searchWord.toLowerCase());
      });
    }

    return value;
  }
}
