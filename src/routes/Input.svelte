<script>
  import { afterUpdate } from 'svelte';

  export let inputValue;

  afterUpdate(() => {
    console.log(inputValue);
  })
</script>


<input type="text" class="currency-input" placeholder="Введите сумму" bind:value={inputValue}>


<style lang="scss">
  .currency-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    width: 200px;
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    }
  }

</style>