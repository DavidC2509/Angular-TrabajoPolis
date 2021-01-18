import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(private sUser: UserService,
              private route: ActivatedRoute,
              public router: Router) { }

  ngOnInit() {
  }
  login() {
    this.sUser.login(this.email, this.password).subscribe(resp => {
      console.log(resp);
      if (!resp.res) {
        alert(resp.message);
        return;
      }
      localStorage.setItem('usuario', JSON.stringify(resp.usuario));
      localStorage.setItem('access_token', 'Bearer ' + resp.access_token);
      // this.router.navigate(['index']);
      location.replace('/index');
    }, erro => {} );
  }

}
