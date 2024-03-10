<script>
	// @ts-nocheck
	import CalculatorSection from './ConverterSection.svelte';

	import { leftValue, rightValue, leftCurrency, rightCurrency } from '../store.js';
	export let data;
</script>

<div class="currency-converter">
	<span class="currency-converter__massage">Курс на {data.rates[0].exchangedate}</span>

	<div class="currency-converter__countin-block">
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
</div>

<style lang="scss">
	.currency-converter {
		display: flex;
		justify-content: space-evenly;
		font-family: "Roboto", sans-serif;

		margin: 50px;
		border: 1px black solid;
		border-radius: 10px;
		box-sizing: border-box;
		padding: 30px;

		&__countin-block {
			display: flex;
			justify-content: space-evenly;
			gap: 50px;
		}

		&__massage {
			font-family: inherit;
			font-size: 24px;
		}
	}
</style>
