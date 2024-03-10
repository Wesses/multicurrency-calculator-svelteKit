<script>
	// @ts-nocheck
	import CalculatorSection from './CalculatorSection.svelte';

	import { leftValue, rightValue, leftCurrency, rightCurrency } from '../store.js';
	export let data;
</script>

<div class="calculator">
	<CalculatorSection
		ownValue={leftValue}
		ownCurrency={leftCurrency}
		modifiedValue={rightValue}
		modifiedCurrency={rightCurrency}
		rates={data.rates}
		rightSelect={false}
	/>
	<CalculatorSection
		ownValue={rightValue}
		ownCurrency={rightCurrency}
		modifiedValue={leftValue}
		modifiedCurrency={leftCurrency}
		rates={data.rates}
		rightSelect={true}
	/>
</div>

<style lang="scss">
	.calculator {
		display: flex;
		justify-content: space-evenly;

		margin: 50px;
		border: 1px black solid;
		box-sizing: border-box;
		padding: 30px;
	}
</style>
