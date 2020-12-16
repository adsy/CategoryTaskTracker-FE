import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { ModalDirective } from "angular-bootstrap-md";
import { Subscription } from "rxjs";
import { take } from "rxjs/operators";
import { CategoryService } from "../categoryService.service";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"],
})
export class HomepageComponent implements OnInit, OnDestroy {
  @ViewChild("f", { static: false }) form;
  @ViewChild("basicModal") modal: ModalDirective;
  categories = [];
  catCount;
  apiSubscription: Subscription;
  addSubscription: Subscription = null;

  constructor(private catService: CategoryService, private router: Router) {}

  ngOnDestroy(): void {
    this.apiSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.apiSubscription = this.catService.getCategories().subscribe((data) => {
      for (let item in data) {
        this.categories.push({ ...data[item] });
      }
    });
  }

  addCategory() {
    this.modal.hide();
    this.catService
      .addCategories({ name: this.form.value.catName })
      .pipe(take(1))
      .subscribe((response) => {
        this.form.reset();
        window.location.reload();
      });
  }

  unsubscribe() {
    this.addSubscription.unsubscribe();
  }
}
