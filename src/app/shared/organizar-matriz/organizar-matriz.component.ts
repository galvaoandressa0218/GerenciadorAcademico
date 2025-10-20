import { Component, EventEmitter, Output, inject, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DisciplinaService } from '../../features/core/services/disciplina.service';
import { Disciplina } from '../../features/core/model/disciplina.model';
import { signal } from '@angular/core';

@Component({
  selector: 'app-organizar-matriz',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './organizar-matriz.component.html',
  styleUrls: ['./organizar-matriz.component.css']
})
export class OrganizarMatrizComponent implements OnInit {
  @Input() idMatriz!: number;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  private fb = inject(FormBuilder);
  private disciplinaService = inject(DisciplinaService);

  public form: FormGroup;
  public disciplinas = signal<Disciplina[]>([]);

  constructor() {
    this.form = this.fb.group({
      idMatriz: [null, Validators.required],
      idDisciplina: [null, Validators.required],
      semestre: [null, [Validators.required, Validators.min(1)]],
      idPreRequisito: [null],
    });
  }

  ngOnInit(): void {
    if (this.idMatriz) {
      this.form.patchValue({ idMatriz: this.idMatriz });
    }
    this.disciplinaService.getDisciplinas().subscribe(data => this.disciplinas.set(data));
  }

  onSave(): void {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }

  onClose(): void {
    this.close.emit();
  }
}