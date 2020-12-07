import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ModalDirective } from "angular-bootstrap-md";
import { Subscription } from "rxjs";
import { CategoryService } from "../categoryService.service";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
})
export class HomepageComponent implements OnInit, OnDestroy {
  @ViewChild("f", { static: false }) form;
  @ViewChild("basicModal") modal: ModalDirective;
  categories = [];
  catCount;
  apiSubscription: Subscription;
  addSubscription: Subscription = null;

  constructor(
    private catService: CategoryService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.apiSubscription.unsubscribe();
    if (this.addSubscription) {
      this.addSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.apiSubscription = this.catService.getCategories().subscribe((data) => {
      console.log(data);
      for (let item in data) {
        this.categories.push({ ...data[item] });
      }
    });
  }

  addCategory() {
    this.modal.hide();
    this.addSubscription = this.catService
      .addCategories({ name: this.form.value.catName })
      .subscribe((response) => {
        console.log(response);
      });
    this.form.reset();
  }

  onCategorySelect(index: number) {
    this.catService.selectedCategory = this.categories[index];
  }
}
