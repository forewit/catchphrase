<script lang="ts">
  let { children } = $props();
</script>

<svelte:head>
  <title>Catch Phrase</title>
  <meta name="description" content="A fun pass-and-play word guessing game" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

{@render children()}

<style>
  :global(*) {
    box-sizing: border-box;
  }

  :global(html, body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    background: #f3f4f6;
    color: #1f2937;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :global(button) {
    font-family: inherit;
  }
</style>
