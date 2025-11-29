<script lang="ts">
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { categories, type CategoryId } from '$lib/data/words';
  import { gameState } from '$lib/stores/game.svelte';

  let selectedCategory = $state<CategoryId>('movies');

  function startGame() {
    gameState.setCategory(selectedCategory);
    gameState.startGame();
    goto(`${base}/play`);
  }
</script>

<div class="container">
  <header>
    <h1>Catch Phrase</h1>
    <p class="subtitle">The fast-paced word guessing game</p>
  </header>

  <main>
    <section class="category-section">
      <h2>Choose a Category</h2>
      <div class="category-grid">
        {#each Object.entries(categories) as [id, category]}
          <button
            class="category-btn"
            class:selected={selectedCategory === id}
            onclick={() => selectedCategory = id as CategoryId}
          >
            {category.name}
          </button>
        {/each}
      </div>
    </section>

    <section class="rules-section">
      <h2>How to Play</h2>
      <ol class="rules">
        <li>Split into two teams and sit in alternating order</li>
        <li>Give clues to help your team guess the word</li>
        <li>When they guess it, tap "Got It!" and pass the device</li>
        <li>Don't say the word, rhymes, or "starts with..."</li>
        <li>When the timer buzzes, the other team scores!</li>
        <li>First team to 7 points wins</li>
      </ol>
    </section>

    <button class="start-btn" onclick={startGame}>
      Start Game
    </button>
  </main>
</div>

<style>
  .container {
    min-height: 100vh;
    padding: 2rem 1rem;
    max-width: 500px;
    margin: 0 auto;
  }

  header {
    text-align: center;
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    color: #1f2937;
    margin: 0 0 0.5rem;
  }

  .subtitle {
    color: #6b7280;
    font-size: 1.1rem;
    margin: 0;
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
    margin: 0 0 1rem;
  }

  .category-section {
    margin-bottom: 2rem;
  }

  .category-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .category-btn {
    padding: 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    background: white;
    font-size: 1rem;
    font-weight: 500;
    color: #374151;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .category-btn:hover {
    border-color: #3b82f6;
    background: #eff6ff;
  }

  .category-btn.selected {
    border-color: #3b82f6;
    background: #3b82f6;
    color: white;
  }

  .rules-section {
    background: #f9fafb;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .rules {
    margin: 0;
    padding-left: 1.25rem;
    color: #4b5563;
    line-height: 1.8;
  }

  .rules li {
    margin-bottom: 0.25rem;
  }

  .start-btn {
    width: 100%;
    padding: 1.25rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.25rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .start-btn:hover {
    background: #2563eb;
  }

  .start-btn:active {
    background: #1d4ed8;
  }
</style>
