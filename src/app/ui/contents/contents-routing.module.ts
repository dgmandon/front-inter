import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContentsComponent } from "./contents.component";
import { CONTENTS } from "../routes.constants";
import { PruebaComponent } from "../prueba/prueba.component";
const routes: Routes = [
  { path: CONTENTS.CONTENT, component: ContentsComponent },

  { path: CONTENTS.NEW_CONTENT, component: PruebaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
