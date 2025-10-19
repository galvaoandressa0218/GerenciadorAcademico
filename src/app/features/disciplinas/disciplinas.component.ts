import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotaoAdicionarComponent } from '../../shared/botao-adicionar/botao-adicionar.component';
import { PopUpAdicionarMateriaComponent } from '../../shared/pop-up-adicionar-materia/pop-up-adicionar-materia.component';
import { Disciplina } from '.././core/model/disciplina.model';
import { DisciplinaService } from './../core/services/disciplina.service';

@Component({
  selector: 'app-disciplinas',
  standalone: true,
  imports: [
    CommonModule,
    BotaoAdicionarComponent,
    PopUpAdicionarMateriaComponent // Importar o novo modal
  ],
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.css']
})
export class DisciplinasComponent implements OnInit {
  private disciplinaService = inject(DisciplinaService);

  public disciplines = signal<Disciplina[]>([]);
  public isLoading = signal(true);
  public isModalVisible = signal(false);

  ngOnInit(): void {
    // Carrega a lista inicial de disciplinas
    this.disciplinaService.getDisciplinas().subscribe({
      next: (data: Disciplina[]) => this.disciplines.set(data.map(d => ({ ...d, expanded: false }))),
      error: (err: any) => console.error('Erro ao carregar disciplinas:', err),
      complete: () => this.isLoading.set(false)
    });
  }

  openModalToAdd(): void {
    this.isModalVisible.set(true);
  }

  handleCloseModal(): void {
    this.isModalVisible.set(false);
  }

  // Este método é chamado quando o modal emite o evento (save)
  handleSaveNewDiscipline(disciplinaData: Partial<Disciplina>): void {
    this.disciplinaService.criarDisciplina(disciplinaData).subscribe({
      next: (disciplinaCriada) => {
        this.disciplines.update(current => [...current, { ...disciplinaCriada, expanded: false }]);
        this.handleCloseModal();
      },
      error: (err) => console.error('Erro ao salvar disciplina:', err)
    });
  }

  toggleExpand(discipline: Disciplina): void {
    discipline.expanded = !discipline.expanded;
  }
}