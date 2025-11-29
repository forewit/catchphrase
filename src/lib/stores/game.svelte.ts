import { shuffleWords, type CategoryId } from '$lib/data/words';

export type GamePhase = 'setup' | 'playing' | 'buzzer' | 'gameover';

class GameState {
  // Game configuration
  category = $state<CategoryId>('movies');
  
  // Game phase
  phase = $state<GamePhase>('setup');
  
  // Team scores
  team1Score = $state(0);
  team2Score = $state(0);
  
  // Current team (1 or 2)
  currentTeam = $state<1 | 2>(1);
  
  // Words for current game
  words = $state<string[]>([]);
  wordIndex = $state(0);
  
  // Timer
  timeRemaining = $state(0);
  timerDuration = $state(0);
  private timerInterval: ReturnType<typeof setInterval> | null = null;
  
  // Winning score
  winningScore = 7;

  get currentWord(): string {
    return this.words[this.wordIndex] ?? '';
  }

  get winner(): 1 | 2 | null {
    if (this.team1Score >= this.winningScore) return 1;
    if (this.team2Score >= this.winningScore) return 2;
    return null;
  }

  setCategory(category: CategoryId) {
    this.category = category;
  }

  startGame() {
    this.team1Score = 0;
    this.team2Score = 0;
    this.currentTeam = 1;
    this.phase = 'setup';
    this.startRound();
  }

  startRound() {
    // Shuffle words for this round
    this.words = shuffleWords(this.category);
    this.wordIndex = 0;
    
    // Random timer between 30-60 seconds
    this.timerDuration = Math.floor(Math.random() * 31) + 30;
    this.timeRemaining = this.timerDuration;
    
    this.phase = 'playing';
    this.startTimer();
  }

  private startTimer() {
    this.stopTimer();
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        this.buzzer();
      }
    }, 1000);
  }

  private stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  // Called when player gets the word - pass to other team
  gotIt() {
    this.wordIndex++;
    if (this.wordIndex >= this.words.length) {
      // Reshuffle if we run out of words
      this.words = shuffleWords(this.category);
      this.wordIndex = 0;
    }
    // Switch teams
    this.currentTeam = this.currentTeam === 1 ? 2 : 1;
  }

  // Called when timer runs out
  private buzzer() {
    this.stopTimer();
    this.phase = 'buzzer';
    
    // Other team scores
    if (this.currentTeam === 1) {
      this.team2Score++;
    } else {
      this.team1Score++;
    }
    
    // Check for winner
    if (this.winner) {
      this.phase = 'gameover';
    }
  }

  continueGame() {
    if (this.winner) {
      this.phase = 'gameover';
    } else {
      // Switch to the team that scored (they start next round)
      this.currentTeam = this.currentTeam === 1 ? 2 : 1;
      this.startRound();
    }
  }

  resetGame() {
    this.stopTimer();
    this.phase = 'setup';
    this.team1Score = 0;
    this.team2Score = 0;
    this.currentTeam = 1;
    this.words = [];
    this.wordIndex = 0;
  }
}

export const gameState = new GameState();

