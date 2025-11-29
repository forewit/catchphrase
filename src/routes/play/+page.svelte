<script lang="ts">
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { gameState } from '$lib/stores/game.svelte';
  import Timer from '$lib/components/Timer.svelte';
  import WordCard from '$lib/components/WordCard.svelte';
  import { onMount } from 'svelte';

  // Audio context for buzzer sound
  let audioContext: AudioContext | null = null;

  onMount(() => {
    // Redirect to home if game not started
    if (gameState.phase === 'setup' && gameState.words.length === 0) {
      goto(`${base}/`);
    }
  });

  function playBuzzer() {
    if (!audioContext) {
      audioContext = new AudioContext();
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 200;
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }

  // Watch for buzzer phase
  $effect(() => {
    if (gameState.phase === 'buzzer') {
      playBuzzer();
    }
  });

  function handleGotIt() {
    gameState.gotIt();
  }

  function handleContinue() {
    gameState.continueGame();
  }

  function handlePlayAgain() {
    gameState.startGame();
  }

  function handleHome() {
    gameState.resetGame();
    goto(`${base}/`);
  }
</script>

<div class="container">
  <!-- Score Header -->
  <header class="score-header">
    <div class="team" class:active={gameState.currentTeam === 1}>
      <span class="team-label">Team 1</span>
      <span class="team-score">{gameState.team1Score}</span>
    </div>
    <div class="vs">vs</div>
    <div class="team" class:active={gameState.currentTeam === 2}>
      <span class="team-label">Team 2</span>
      <span class="team-score">{gameState.team2Score}</span>
    </div>
  </header>

  {#if gameState.phase === 'playing'}
    <!-- Playing State -->
    <main class="game-area">
      <Timer />
      
      <div class="current-team-indicator">
        Team {gameState.currentTeam}'s turn
      </div>

      <WordCard />

      <button class="got-it-btn" onclick={handleGotIt}>
        Got It!
      </button>
      
      <p class="hint">Tap when your team guesses correctly</p>
    </main>

  {:else if gameState.phase === 'buzzer'}
    <!-- Buzzer State -->
    <main class="buzzer-area">
      <div class="buzzer-message">
        <h2>Time's Up!</h2>
        <p class="scoring-team">Team {gameState.currentTeam === 1 ? 2 : 1} scores!</p>
      </div>

      <button class="continue-btn" onclick={handleContinue}>
        Continue
      </button>
    </main>

  {:else if gameState.phase === 'gameover'}
    <!-- Game Over State -->
    <main class="gameover-area">
      <div class="winner-message">
        <h2>Game Over!</h2>
        <p class="winner">Team {gameState.winner} Wins!</p>
        <p class="final-score">
          {gameState.team1Score} - {gameState.team2Score}
        </p>
      </div>

      <div class="gameover-buttons">
        <button class="play-again-btn" onclick={handlePlayAgain}>
          Play Again
        </button>
        <button class="home-btn" onclick={handleHome}>
          Home
        </button>
      </div>
    </main>
  {/if}
</div>

<style>
  .container {
    min-height: 100vh;
    padding: 1rem;
    max-width: 500px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }

  /* Score Header */
  .score-header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    padding: 1rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
    margin-bottom: 1.5rem;
  }

  .team {
    text-align: center;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .team.active {
    background: #eff6ff;
  }

  .team-label {
    display: block;
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 0.25rem;
  }

  .team.active .team-label {
    color: #3b82f6;
    font-weight: 500;
  }

  .team-score {
    font-size: 2rem;
    font-weight: 700;
    color: #1f2937;
  }

  .team.active .team-score {
    color: #3b82f6;
  }

  .vs {
    color: #9ca3af;
    font-weight: 500;
  }

  /* Game Area */
  .game-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .current-team-indicator {
    font-size: 1.1rem;
    color: #6b7280;
    font-weight: 500;
  }

  .got-it-btn {
    width: 100%;
    max-width: 300px;
    padding: 1.5rem;
    background: #10b981;
    color: white;
    border: none;
    border-radius: 16px;
    font-size: 1.5rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.15s ease;
    margin-top: 1rem;
  }

  .got-it-btn:hover {
    background: #059669;
  }

  .got-it-btn:active {
    background: #047857;
    transform: scale(0.98);
  }

  .hint {
    color: #9ca3af;
    font-size: 0.875rem;
    margin: 0;
  }

  /* Buzzer Area */
  .buzzer-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  .buzzer-message {
    text-align: center;
    background: #fef2f2;
    padding: 2rem 3rem;
    border-radius: 16px;
  }

  .buzzer-message h2 {
    font-size: 2rem;
    color: #dc2626;
    margin: 0 0 0.5rem;
  }

  .scoring-team {
    font-size: 1.25rem;
    color: #374151;
    margin: 0;
    font-weight: 500;
  }

  .continue-btn {
    padding: 1.25rem 3rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.25rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .continue-btn:hover {
    background: #2563eb;
  }

  /* Game Over Area */
  .gameover-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  .winner-message {
    text-align: center;
  }

  .winner-message h2 {
    font-size: 1.5rem;
    color: #6b7280;
    margin: 0 0 0.5rem;
    font-weight: 500;
  }

  .winner {
    font-size: 2.5rem;
    font-weight: 800;
    color: #3b82f6;
    margin: 0 0 0.5rem;
  }

  .final-score {
    font-size: 1.5rem;
    color: #374151;
    margin: 0;
  }

  .gameover-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    max-width: 250px;
  }

  .play-again-btn {
    padding: 1rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .play-again-btn:hover {
    background: #2563eb;
  }

  .home-btn {
    padding: 1rem;
    background: white;
    color: #374151;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .home-btn:hover {
    border-color: #d1d5db;
    background: #f9fafb;
  }
</style>

