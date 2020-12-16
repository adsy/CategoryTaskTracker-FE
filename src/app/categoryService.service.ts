import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Injectable()
export class CategoryService {
  categories = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getCategories() {
    return this.http.get("http://localhost:3000/api/categories");
  }

  getSingleCategory(id: any) {
    return this.http.get(`http://localhost:3000/api/categories/${id}`);
  }

  addCategories(category: { name: string }) {
    return this.http.post("http://localhost:3000/api/categories", category);
  }

  deleteCategory(id) {
    return this.http.delete(`http://localhost:3000/api/categories/${id}`);
  }
}
