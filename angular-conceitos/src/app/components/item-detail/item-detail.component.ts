import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ListService} from "../../services/list.service";
import {AnimalInterface} from "../list-render/AnimalInterface";

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  animal?: AnimalInterface
  constructor(
    private listService: ListService,
    private route: ActivatedRoute
  ) {
    this.getAnimal()
  }

  ngOnInit(): void {
  }

  getAnimal() {
    const id: number = Number(this.route.snapshot.paramMap.get("id"))
    this.listService.getItem(id).subscribe((a: AnimalInterface) => (this.animal = a))
  }

}
