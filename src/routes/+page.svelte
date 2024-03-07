<script>
	import Input from './Input.svelte';
	export let data;

	let userValue = 0;
</script>

<h1>{data.hello}</h1>
<div class="calculator">
	<Input inputValue={userValue} />
	<Input inputValue={userValue} />
</div>

<style>
  .calculator {
    display: flex;
    justify-content: space-evenly;
  }
</style>
