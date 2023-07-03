# sveltix

Better way to manage your complex stores in Svelte.

## Why?

Even though Svelte has a great store system. However, it is very hard to work with complex data. Sveltix solves this issue by providing a flexible API like Pinia which is integrated with Svelte stores, automaticly giving you the flexibility out of the box.

## Usage

**Basic usage**

```html
<script>
  import { sveltix } from "sveltix";

  const newStore = sveltix({
    state: () => ({
     value: 1
    })
  });

  const useStore = newStore.useStore();
</script>

<button
  on:click={() => newStore.value++}>count is {$useStore.value}
</button>
```

**Custom functions**

```html
<script>
  import { sveltix } from "sveltix";

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

<button on:click={() => newStore.increment()}>count is {$useStore.value}</button>
```

## Note

I'm currently working on implementing getters and better type declarations. Pull requests are also open 😅
