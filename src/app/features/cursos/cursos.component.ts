import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Curso } from '../core/model/curso.model';
import { CursoService } from '../core/services/curso.service';
import { BotaoAdicionarComponent } from '../../shared/botao-adicionar/botao-adicionar.component';
import { PopUpAdicionarCursoComponent } from '../../shared/pop-up-adicionar-cursos/pop-up-adicionar-cursos.component';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, BotaoAdicionarComponent, PopUpAdicionarCursoComponent],
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  private cursoService = inject(CursoService);
  private router = inject(Router);

  public cursos = signal<Curso[]>([]);
  public isModalVisible = signal(false);

  ngOnInit(): void {
    this.cursoService.getCursos().subscribe(data => {
      this.cursos.set(data);
    });
  }

  openAddModal(): void {
    this.isModalVisible.set(true);
  }

  closeAddModal(): void {
    this.isModalVisible.set(false);
  }

  handleSaveCurso(cursoData: Omit<Curso, 'id'>): void {
    this.cursoService.addCurso(cursoData).subscribe(novoCurso => {
      this.cursos.update(cursosAtuais => [...cursosAtuais, novoCurso]);
      this.closeAddModal();
    });
  }

  navigateTo(curso: Curso): void {
    // Exemplo: Navega para a matriz curricular daquele curso
    console.log('Navegando para o curso:', curso.nome);
    this.router.navigate(['/app/matriz-curricular', curso.id]);
  }
}