import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { RingOfFireService } from '../firebase-services/ring-of-fire.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  game!: Game;

  constructor(private ringService: RingOfFireService, private router: Router) {
    //this.newGame();
  }

  newGame() {
    this.game = new Game();
    this.ringService.addGame(this.game).then((game) => {
      this.router.navigateByUrl('/game/' + game.id);
    })
  }

}
