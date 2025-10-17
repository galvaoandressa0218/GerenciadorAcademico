import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-materias-cadastradas',
  templateUrl: './materias-cadastradas.component.html',
  styleUrls: ['./materias-cadastradas.component.css']
})
export class MateriasCadastradasComponent implements OnInit {

  materiasCadastradas = [
    // Aqui você vai preencher com os dados da API
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Chamada da API para preencher materiasCadastradas
  }

  navigateToMateria(id: number | string) {
    this.router.navigate(['/app/materia', id]); // rota para detalhes
  }

}
