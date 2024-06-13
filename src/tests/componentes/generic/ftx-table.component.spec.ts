import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FtxTableComponent } from "src/app/ui/shared/components/ftx-table/ftx-table.component";
import { TableColumn } from "src/app/ui/shared/components/ftx-table/models/table-column.model";
import { SharedModule } from "src/app/ui/shared/shared.module";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Sort } from "@angular/material/sort";

describe("Pruebas unitarias para el componente 'FtxTableComponent'", () => {
  let component: FtxTableComponent;
  let fixture: ComponentFixture<FtxTableComponent>;

  const tableColumnsMock: TableColumn[] = [
    { name: "Columna1", dataKey: "columna1" },
    { name: "Columna2", dataKey: "columna2" },
    // ... otras columnas según tu estructura TableColumn
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FtxTableComponent],
      imports: [SharedModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FtxTableComponent);
    component = fixture.componentInstance;
    component.tableColumns = tableColumnsMock;

    fixture.detectChanges();
  });

  it("Debe crear el componente", () => {
    expect(component).toBeTruthy();
  });

  it("Debe emitir un evento de ordenamiento con los parámetros adecuados", () => {
    const sortParameters: Sort = { active: "columna1", direction: "asc" };
    spyOn(component.sort, "emit");

    component.sortTable(sortParameters);

    expect(component.sort.emit).toHaveBeenCalledWith(sortParameters);
  });
});
