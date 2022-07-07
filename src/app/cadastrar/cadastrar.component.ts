import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: Usuario = new Usuario();
  confirmeSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0,0)
  }

  confirmarSenha(event: any) {
    this.confirmeSenha = event.target.value;
  }

  tipoDeUsuario(event: any) {
    this.tipoUsuario = event.target.value;
  }

  cadastrar(){
    this.usuario.tipo = this.tipoUsuario;

    if(this.usuario.senha != this.confirmeSenha){
      alert('As senha estão diferentes!')
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;
        this.router.navigate(['/entrar'])
        alert('Usuario cadastrado com sucesso!')
      })
      }
    }
  }
