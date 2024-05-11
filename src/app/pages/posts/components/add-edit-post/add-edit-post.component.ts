import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionType } from '../../enums/action-type';
import { IPost } from '../../models/ipost';

@Component({
  selector: 'dash-add-edit-post',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './add-edit-post.component.html',
  styleUrl: './add-edit-post.component.scss',
})
export class AddEditPostComponent implements OnInit {
  private fb = inject(FormBuilder);
  @Input({ required: true }) openModal: boolean = false;
  @Input() post?: IPost;
  @Input() actionTypeValue: ActionType = ActionType.add;
  @Output() actionClicked: EventEmitter<IPost> = new EventEmitter<IPost>();
  actionType: typeof ActionType = ActionType;
  protected readonly Math = Math;
  postForm!: FormGroup;
  actionName!: string;

  ngOnInit(): void {
    this.createForm();
    this.actionName = this.actionTypeValue == ActionType.add ? 'Save' : 'Update';
    this.actionTypeValue == ActionType.add ? null : this.dispatchValue();
  }

  createForm() {
    this.postForm = this.fb.group({
      id: [Math.random()],
      body: ['', [Validators.required]],
      title: ['', [Validators.required]],
    });
  }

  dispatchValue() {
    this.postForm.patchValue({ ...this.post });
  }

  modalSubmitted() {
    this.actionClicked.emit(this.postForm.value);
  }
}
