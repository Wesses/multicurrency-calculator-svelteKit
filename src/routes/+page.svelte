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
	/>
	<CalculatorSection
		ownValue={rightValue}
		ownCurrency={rightCurrency}
		modifiedValue={leftValue}
		modifiedCurrency={leftCurrency}
		rates={data.rates}
	/>
</div>

<style lang="scss">
	.calculator {
		display: flex;
		justify-content: space-evenly;
	}
</style>
