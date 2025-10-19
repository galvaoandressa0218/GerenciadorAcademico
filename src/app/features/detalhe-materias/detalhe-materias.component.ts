import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DisciplinaService } from '.././core/services/disciplina.service';
import { Disciplina } from '.././core/model/disciplina.model'; 
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-detalhe-materias',
  templateUrl: './detalhe-materias.component.html',
  styleUrls: ['./detalhe-materias.component.scss']
})
export class DetalheMateriasComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private disciplinaService = inject(DisciplinaService);

  public disciplina: Disciplina | null = null;
  public isLoading = signal(true);
  public error = signal<string | null>(null);

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        if (isNaN(id)) {
          this.error.set('ID da matéria é inválido.');
          this.isLoading.set(false);
          return [];
        }
        return this.disciplinaService.getDisciplinaById(id);
      })
    ).subscribe({
      next: (data) => {
        this.disciplina = data;
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Não foi possível carregar os detalhes da disciplina.');
        this.isLoading.set(false);
        console.error(err);
      }
    });
  }

  abrirModal(secao: string): void {
    console.log(`Abrir pop-up para editar a seção: ${secao}`);
  }

  adicionarPrograma(): void {
    console.log('Botão "Adicionar programa" clicado!');
  }
}