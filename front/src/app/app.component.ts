import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UrlService } from './url.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>URL Shortener</h1>
      <div class="input-group">
        <input type="text" [(ngModel)]="longUrl" placeholder="Enter long URL here..." />
        <button (click)="shorten()">Shorten</button>
      </div>
      <div *ngIf="shortUrl" class="result">
        <p>Short URL: <a [href]="shortUrl" target="_blank">{{ shortUrl }}</a></p>
        <button (click)="copyToClipboard()">Copy</button>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 600px; margin: 50px auto; text-align: center; font-family: sans-serif; }
    .input-group { display: flex; gap: 10px; margin-bottom: 20px; }
    input { flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 4px; }
    button { padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
    button:hover { background: #0056b3; }
    .result { margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 4px; }
  `]
})
export class AppComponent {
  longUrl = '';
  shortUrl = '';

  constructor(private urlService: UrlService) {}

  shorten() {
    if (!this.longUrl) return;
    this.urlService.shortenUrl(this.longUrl).subscribe(res => {
      this.shortUrl = res.shortUrl;
    });
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.shortUrl);
    alert('Copied to clipboard!');
  }
}
