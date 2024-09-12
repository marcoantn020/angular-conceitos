import {Component, OnInit} from '@angular/core';
import {MomentsInterface} from "../../../MomentsInterface";
import {MomentService} from "../../../services/moment/moment.service";
import {MessagesService} from "../../../services/messages/messages.service";

import {Router} from "@angular/router";

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {
  btnText: string = 'Compartilhar!';

  constructor(
    private momentService: MomentService,
    private messageService: MessagesService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  async createHandle(moment: MomentsInterface) {
    const formData: FormData = new FormData()

    formData.append('title', moment.title)
    formData.append('description', moment.description)

    if (moment.image) {
      formData.append('image', moment.image)
    }

    // todo

    await this.momentService.createMoment(formData).subscribe()

    this.messageService.add('Momento adicionado com sucesso.')

    await this.router.navigate(["/"])
  }
}
