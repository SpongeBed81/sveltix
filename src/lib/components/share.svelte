<script>
  export let newStore;

  const store = newStore.useStore();
</script>

<h1>{$store.value}</h1>
