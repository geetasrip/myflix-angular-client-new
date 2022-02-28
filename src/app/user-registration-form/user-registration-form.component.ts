import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { UserRegistrationService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * get input data of user and stores in userCredentials
   */
  @Input() userCredentials = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: ''
  };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  /**
   * call API endpoint to register a new user
   * @function userRegistration
   * @param userCredentials {object}
   * @return new users data in json format
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userCredentials).subscribe(
      response => {
        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!
        console.log(response);
        this.snackBar.open('user registered successfully', 'OK', {
          duration: 2000
        });
      },
      response => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000
        });
      }
    );
  }
}
