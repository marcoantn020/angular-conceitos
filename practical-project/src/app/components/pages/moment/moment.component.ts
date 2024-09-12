import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormGroupDirective} from "@angular/forms";
import {MomentService} from "../../../services/moment/moment.service";
import {MomentsInterface} from "../../../MomentsInterface";

import {Router, ActivatedRoute} from "@angular/router";
import {ResponseInterface} from "../../../ResponseInterface";
import {environment} from "../../../../environments/environment";

import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {MessagesService} from "../../../services/messages/messages.service";
import {CommentService} from "../../../services/comment/comment.service";
import {CommentsInterface} from "../../../CommentsInterface";

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {

  moment?: MomentsInterface;
  baseApi: string = environment.baseApiUrl
  faTimes = faTimes
  faEdit = faEdit

  commentForm!: FormGroup;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private router: Router,
    private commentService: CommentService) {
  }

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get("id"));
    this.momentService
      .getMomentById(id)
      .subscribe((moment: ResponseInterface<MomentsInterface>) => (this.moment = moment.data))

    this.commentForm = new FormGroup({
      text: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
    })
  }

  get text() {
    return this.commentForm.get("text")!;
  }

  get username() {
    return this.commentForm.get("username")!;
  }

  async removeHandler(id: number): Promise<void> {
    await this.momentService
      .removeMoment(id)
      .subscribe()

    this.messageService.add('Momento exluido com sucesso.')
    await this.router.navigate(["/"])
  }

  async onSubmit(formDir: FormGroupDirective) {
    if (this.commentForm.invalid) return

    const data: CommentsInterface = this.commentForm.value
    data.momentId = Number(this.moment!.id)

    await this.commentService.createComment(data)
      .subscribe((comment: ResponseInterface<CommentsInterface>) => (this.moment!.comments!.push(comment.data)))

    this.messageService.add('Comentario adicionado')

    this.commentForm.reset()

    formDir.resetForm()
  }
}
