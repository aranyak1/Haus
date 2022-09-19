import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { environment } from 'src/environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  id: any = '';
  getUserByIdSubscription: any;
  user = {
    firstName: '',
    lastName: '',
    photo: '',
    description: '',
    email: '',
    phoneNo: '',
  };
  password = {
    currentPassword: '',
    newPassword: '',
  };
  img_prefix = environment.Imagekitio.urlEndpoint + '/users';
  constructor(
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.id = this.userService.userId;
    console.log(this.id)
    if (this.id) {
      // this.router.navigate([`/users/${this.id}/profile`]);
      this.getUserByIdSubscription = this.userService
        .getUserById(this.id)
        .subscribe((res: any) => {
          this.user = res.data.data;
        });
    } else {
      // this.message.create('error', 'please login to view this page');
      //       this.router.navigate([`/login`]);
    }
  }

  onSubmit(formData: any) {
    console.log(formData.value);
    this.userService
      .updateUserById(this.id, formData.value)
      .subscribe((res: any) => {
        this.user = res.data.data;
        console.log('data updated successfully', res);
        this.message.create('success', `Data updated succesfully!!`);
      });
  }
}
