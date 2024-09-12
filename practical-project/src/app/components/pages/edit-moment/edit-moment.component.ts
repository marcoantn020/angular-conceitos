import { Component, OnInit } from '@angular/core';
import {MomentService} from "../../../services/moment/moment.service";
import {Router, ActivatedRoute} from "@angular/router";
import {MomentsInterface} from "../../../MomentsInterface";
import {ResponseInterface} from "../../../ResponseInterface";
import {MessagesService} from "../../../services/messages/messages.service";

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit {
  moment!: MomentsInterface;
  btnText: string = 'Editar';

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router) {
  }

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get("id"))
    this.momentService.getMomentById(id)
      .subscribe((moment: ResponseInterface<MomentsInterface>) => this.moment = moment.data)
  }

  async editHandler(momentData: MomentsInterface) {
    const id: number = this.moment.id!;
    const formData = new FormData();
    formData.append("title", momentData.title);
    formData.append("description", momentData.description);

    if (momentData.image) {
      formData.append("image", momentData.image);
    }

    await this.momentService.updateMoment(id, formData).subscribe()

    this.messagesService.add('Momento atualizado com sucesso!')

    await this.router.navigate(["/"])

  }
}
