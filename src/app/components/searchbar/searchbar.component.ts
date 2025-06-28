import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchBarComponent {
  searchQuery: string = '';

  @Output() search = new EventEmitter<string>();
  @Output() submit = new EventEmitter<string>()

  onSearch(): void {
    const query = this.searchQuery.trim().toUpperCase();
    
    this.search.emit(query);
  }

  onSubmit(): void {
    const query = this.searchQuery.trim().toUpperCase();
    
    this.submit.emit(query);
  }
}

