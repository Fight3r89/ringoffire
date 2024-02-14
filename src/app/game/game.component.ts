import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { DialogRulesComponent } from '../dialog-rules/dialog-rules.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, DialogAddPlayerComponent, DialogRulesComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  game!: Game;
  currentCard: string = '';
  pickCardAnimation = false;

  constructor(public dialog: MatDialog) {
    this.newGame();
  }
  newGame() {
    this.game = new Game();
    console.log(this.game.stack);
  }
  takeCard() {
    if (!this.pickCardAnimation) {
      let card = this.game.stack.pop();
      if (card != undefined) {
        this.currentCard = card;
      }
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.game.playedCard.push(this.currentCard);
        this.pickCardAnimation = false;
        (this.game.currentPlayer < this.game.players.length - 1) ? this.game.currentPlayer++ : this.game.currentPlayer = 0;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name = '') this.game.players.push(name);
    });
  }
}
