<script>
	// @ts-nocheck
	import { onDestroy } from 'svelte';

	const getExchangeRate = (currency, exchangeRates) => {
		return exchangeRates.find((exchangeRate) => currency === exchangeRate.cc).rate;
	};

	import { leftValue, rightValue, leftCurrency, rightCurrency } from '../store.js';
	export let data;

	const leftUnsubscribe = leftValue.subscribe((value) => {
		const leftRate = getExchangeRate($leftCurrency, data.rates);
		const rightRate = getExchangeRate($rightCurrency, data.rates);

		rightValue.set(Math.round(((value * leftRate) / rightRate) * 100) / 100);
	});

	onDestroy(leftUnsubscribe);
</script>

<div class="calculator">
	<section class="calculator__section">
		<input
			type="number"
			class="currency-input"
			placeholder="Введіть суму"
			bind:value={$leftValue}
		/>

		<div>
			<input type="text" class="searchInput" placeholder="Search..." />

			<select class="selectList" on:change={(e) => leftCurrency.set(e.target.value)}>
				{#each data.rates as { txt, cc }}
					<option value={cc} selected={cc === $leftCurrency}>
						{txt}
					</option>
				{/each}
			</select>
		</div>
	</section>

	<section class="calculator__section">
		<input
			type="number"
			class="currency-input"
			placeholder="Введіть суму"
			bind:value={$rightValue}
		/>

		<div>
			<input type="text" class="searchInput" placeholder="Search..." />
			<select class="selectList" on:change={(e) => rightCurrency.set(e.target.value)}>
				{#each data.rates as { txt, cc }}
					<option value={cc} selected={cc === $rightCurrency}>
						{txt}
					</option>
				{/each}
			</select>
		</div>
	</section>
</div>

<style lang="scss">
	.calculator {
		display: flex;
		justify-content: space-evenly;

		&__section {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
	}

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

	.searchInput {
		margin-bottom: 10px;
		padding: 5px;
		border: 1px solid #ccc;
		border-radius: 4px;
		width: 100%;
		box-sizing: border-box;
	}

	.selectList {
		width: 100%;
		padding: 5px;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;
		background-color: #fff;
		font-size: 16px;
	}
</style>
