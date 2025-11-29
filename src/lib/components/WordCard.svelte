<script lang="ts">
  import { gameState } from '$lib/stores/game.svelte';
</script>

<div class="word-card">
  <p class="word">{gameState.currentWord}</p>
</div>

<style>
  .word-card {
    background: white;
    border-radius: 16px;
    padding: 3rem 2rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    text-align: center;
    min-height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .word {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0;
    line-height: 1.2;
  }

  @media (max-width: 480px) {
    .word {
      font-size: 2rem;
    }
    
    .word-card {
      padding: 2rem 1.5rem;
    }
  }
</style>

