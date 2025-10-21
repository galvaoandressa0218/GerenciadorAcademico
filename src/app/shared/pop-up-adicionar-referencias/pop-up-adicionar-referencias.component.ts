import { Component, EventEmitter, Output, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Referencia } from '../../features/core/model/referencias.model';

@Component({
  selector: 'app-pop-up-adicionar-referencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pop-up-adicionar-referencias.component.html',
  styleUrls: ['./pop-up-adicionar-referencias.component.css']
})
export class PopUpAdicionarReferenciaComponent implements OnInit {
  @Input() referenciaToEdit?: Referencia | null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Partial<Referencia>>();

  private fb = inject(FormBuilder);
  public form: FormGroup;

  public programasDisponiveis = [
    { id: 1, nome: 'Programa Exemplo 1' },
    { id: 2, nome: 'Programa Exemplo 2' }
  ];

  constructor() {
    this.form = this.fb.group({
      id: [null],
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      edicao: [''],
      editora: [''],
      ano: [null],
      isbn: [''],
      tipo: ['FISICO', Validators.required],
      categoria: ['BASICA', Validators.required],
      local: [''],
      url: [''],
      programa_id: [null, Validators.required] 
    });
  }

  ngOnInit(): void {
    if (this.referenciaToEdit) {
      this.form.patchValue(this.referenciaToEdit);
    }
    if (!this.referenciaToEdit) {
        this.form.get('programa_id')?.setValidators(Validators.required);
        this.form.get('programa_id')?.updateValueAndValidity();
    }
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