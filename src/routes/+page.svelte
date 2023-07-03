<script>
  import { sveltix } from "../lib/index.js";
  import Share from "$lib/components/share.svelte";

  const newStore = sveltix({
    state: () => ({
      value: 1,
    }),
    actions: {
      increment() {
        this.value++;
      },
    },
  });

  const useStore = newStore.useStore();
</script>

<button
  on:click={() => {
    newStore.value++;
    newStore.increment();
    console.log(newStore.value);
  }}>count is {$useStore.value}</button
>
<Share {newStore} />
