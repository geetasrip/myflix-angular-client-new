import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  /**
   * get input info and store it in userCredentials
   */
  @Input() userCredentials = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Login user via input field by using API endpoint
   * And store the users data in localstorage
   * @function userLogin
   * @param loginData {object}
   * @return users data in json format
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe(
      response => {
        console.log(response);
        localStorage.setItem('user', response.user.Username);
        localStorage.setItem('token', response.token);
        this.dialogRef.close();
        this.snackBar.open('You are logged in', 'OK', {
          duration: 2000
        });
        this.router.navigate(['movies']);
      },
      response => {
        this.snackBar.open(response, 'OK', {
          duration: 2000
        });
      }
    );
  }
}
