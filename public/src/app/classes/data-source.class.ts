import { LocalDataSource } from 'ng2-smart-table';

export class DataSource extends LocalDataSource {
  search(element): any {
    return this.data.find(el => el.id === element.id);
  }

  delete(element): any {
    this.data = this.data.filter(el => el.id !== element.id);
    this.refresh();
  }

  insert(element): any {
    this.data.push(element);
    this.refresh();
  }

  edit(element): any {
    this.data.splice(this.data.indexOf(this.data.find(el => el.id === element.id)), 1, element);
    this.refresh();
  }
}
