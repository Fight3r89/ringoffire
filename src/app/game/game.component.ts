import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { DialogRulesComponent } from '../dialog-rules/dialog-rules.component';
import { RingOfFireService } from '../firebase-services/ring-of-fire.service';
import { ActivatedRoute } from '@angular/router';
import { DocumentReference } from '@angular/fire/firestore';

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
  firestore = this.ringService.firestore;
  loadedGame!: DocumentReference;
  gameId!: string

  constructor(public dialog: MatDialog, private ringService: RingOfFireService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.ringService.getSingleGameRef(params['id']);
      this.gameId = params['id'];
      
      setTimeout(() => {
        this.game = this.ringService.singleGame[0];
      },1000);       
    });    
  }

  newGame() {
    this.game = new Game();
    this.ringService.addGame(this.game);
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
        this.ringService.updateGame(this.gameId,this.game);
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name != '') this.game.players.push(name);
      this.ringService.updateGame(this.gameId,this.game);
    });
  }

}
