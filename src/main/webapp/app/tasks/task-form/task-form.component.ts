import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Task } from '../task';
import { TaskService } from '../task.service';
import { TaskStore } from '../task.store';

/**
 * A form to create tiny tasks.
 */
@Component({
  selector: 'tiny-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent {

  @Output() created: EventEmitter<Task> = new EventEmitter();

  taskForm: FormGroup = new FormGroup({
    name: new FormControl('')
  });

  constructor(@Inject('TaskService') private taskService: TaskService, private taskStore: TaskStore) {}

  onSubmit(): void {
    if (this.taskForm.value.name) {
      this.taskService.create(this.taskForm.value.name).subscribe(task => {
        this.taskStore.create(task)
        this.taskForm.reset();
      });
    }
  }
}
