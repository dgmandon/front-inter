import { Component, OnInit } from "@angular/core";
import { User } from "../../../core/models/user/user.model";
import { UserService } from "@core/services/user-service.interface";
import { MatDialog } from "@angular/material/dialog";
import { FtxDialogComponent } from "../../shared/components/ftx-dialog/ftx-dialog.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrl: "./user-list.component.css",
})
export class UserListComponent implements OnInit {
  filter: string = "";
  dataSearch: string = "";
  totalItems = 50;
  itemsPerPage = 5;
  currentPage = 0;
  pageSizeOptions = [5, 10, 15];
  users: User[] = [];

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private router: ActivatedRoute
  ) {;
  }
  ngOnInit(): void {
    this.router.params.subscribe(params => {
      let identification: string = params['identification'];
      let subjectId: string = params['subjectId'];
      this.fetchUsers(identification, subjectId);
    });
  }
  public fetchUsers(
    identification: string,
    subjectId: string
  ): void {
    this.userService
      .getAll(identification, subjectId)
      .subscribe((result) => {
        this.users = result;
        this.totalItems = result.length;
      });
  }

  onPageChange(event: any) {
  }

}
