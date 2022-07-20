import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertaComponent } from '../alerta/alerta.component';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
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
    private router: Router,
    private alertas: AlertasService
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
      this.alertas.showAlertDanger('As senha estão diferentes!')
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;
        this.router.navigate(['/entrar'])
        this.alertas.showAlertSuccess('Usuario cadastrado com sucesso!')
      })
      }
    }
  }
