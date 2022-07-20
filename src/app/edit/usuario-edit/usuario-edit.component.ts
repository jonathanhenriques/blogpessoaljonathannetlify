import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idUsuario: number;
  confirmeSenha: string;
  tipoUsuario: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    if(environment.token == '')
      this.router.navigate(['/entrar'])

      this.idUsuario = this.route.snapshot.params['id']
      this.findByIdUsuario(this.idUsuario);
  }

  confirmarSenha(event: any) {
    this.confirmeSenha = event.target.value;
  }

  tipoDeUsuario(event: any) {
    this.tipoUsuario = event.target.value;
  }

  atualizar(){
    this.usuario.tipo = this.tipoUsuario

    if(this.usuario.senha != this.confirmeSenha){
      this.alertas.showAlertDanger('As senhas estão incorretas.')
    } else {
      this.authService.atualizar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(["/inicio"])
        this.alertas.showAlertSuccess('Usuário atualizado com sucesso, faça login novamente!')
        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0
        this.router.navigate(['/entrar'])
      })
    }
  }
  findByIdUsuario(id: number){
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp;
    })
  }

}
