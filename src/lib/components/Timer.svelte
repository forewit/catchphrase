<script lang="ts">
  import { gameState } from '$lib/stores/game.svelte';

  const urgencyThreshold = 10;
  
  let isUrgent = $derived(gameState.timeRemaining <= urgencyThreshold);
  let progress = $derived(gameState.timeRemaining / gameState.timerDuration);
</script>

<div class="timer" class:urgent={isUrgent}>
  <div class="timer-circle">
    <svg viewBox="0 0 100 100">
      <circle
        class="timer-bg"
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke-width="8"
      />
      <circle
        class="timer-progress"
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke-width="8"
        stroke-dasharray={2 * Math.PI * 45}
        stroke-dashoffset={2 * Math.PI * 45 * (1 - progress)}
        transform="rotate(-90 50 50)"
      />
    </svg>
    <span class="timer-text">{gameState.timeRemaining}</span>
  </div>
</div>

<style>
  .timer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .timer-circle {
    position: relative;
    width: 80px;
    height: 80px;
  }

  .timer-circle svg {
    width: 100%;
    height: 100%;
  }

  .timer-bg {
    stroke: #e5e5e5;
  }

  .timer-progress {
    stroke: #3b82f6;
    transition: stroke-dashoffset 0.3s ease, stroke 0.3s ease;
  }

  .urgent .timer-progress {
    stroke: #ef4444;
  }

  .timer-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
  }

  .urgent .timer-text {
    color: #ef4444;
    animation: pulse 0.5s ease-in-out infinite alternate;
  }

  @keyframes pulse {
    from { transform: translate(-50%, -50%) scale(1); }
    to { transform: translate(-50%, -50%) scale(1.1); }
  }
</style>

