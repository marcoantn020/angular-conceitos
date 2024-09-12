import { Component, OnInit } from '@angular/core';
import {AnimalInterface} from "./AnimalInterface";
import { ListService } from "../../services/list.service";

@Component({
  selector: 'app-list-render',
  templateUrl: './list-render.component.html',
  styleUrls: ['./list-render.component.css']
})
export class ListRenderComponent implements OnInit {

  animals: AnimalInterface[] = []

  constructor(private listService: ListService) {
    this.getAnimals()
  }

  ngOnInit(): void {
  }

  removeAnimal(animal: AnimalInterface) {
    this.animals = this.animals.filter(a => animal.name !== a.name)
    this.listService.remove(animal.id).subscribe()
  }

  getAnimals(): void {
    this.listService.getAll()
      .subscribe((animals: AnimalInterface[]) => (this.animals = animals))
  }

}
