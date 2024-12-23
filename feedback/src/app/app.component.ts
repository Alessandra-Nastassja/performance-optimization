import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'mfe-2';

  texto = '';

  ngOnInit() {
    window.addEventListener('elapsedUpdate', (event: any) => {
      const elapsed = event.detail;
      
      this.mudaConteudo(elapsed);
      console.log(`${elapsed}ms --> ${this.texto}`);
    });
  }

  private mudaConteudo(elapsed: any){
    switch (true) {
      case elapsed <= 3000:
        this.texto = 'aguarde um momento';
        break;

      case elapsed <= 4000 && elapsed <= 6000:
        this.texto = 'falta pouco'
        break;
    
      default:
        this.texto = 'deu ruim';
        break;
    }
  }
}
