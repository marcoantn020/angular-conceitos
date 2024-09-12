import {Component, OnInit} from '@angular/core';
import {MomentService} from "../../../services/moment/moment.service";
import {environment} from "../../../../environments/environment";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import {MomentsInterface} from "../../../MomentsInterface";
import {ResponseInterface} from "../../../ResponseInterface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  baseApiUrl: string = environment.baseApiUrl

  faSearch= faSearch
  searchTerm: string = ''
  allMoments: MomentsInterface[] = [];
  moments: MomentsInterface[] = [];

  constructor(private momentService: MomentService) {
  }

  ngOnInit(): void {
    this.momentService.getMoments()
      .subscribe((moments: ResponseInterface<MomentsInterface[]>) => {
        const data: MomentsInterface[] = moments.data

        data.map((item: MomentsInterface): void => {
          item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR')
        })

        this.allMoments = data
        this.moments = data
      })
  }

  search(event: Event): void {
    const target: HTMLInputElement = event.target as HTMLInputElement
    const value: string = target.value

    this.allMoments = this.moments
      .filter((moment: MomentsInterface) => moment.title.toLowerCase().includes(value))
  }
}
