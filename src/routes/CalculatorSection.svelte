<script>
	export let ownValue;
	export let ownCurrency;
	export let modifiedValue;
	export let modifiedCurrency;
	export let rates;

	import { onDestroy } from 'svelte';

  const getExchangeRate = (currency, exchangeRates) => {
		return exchangeRates.find((exchangeRate) => currency === exchangeRate.cc).rate;
	};

  const ownValueUnsubscribe = ownValue.subscribe((value) => {
    const ownRate = getExchangeRate($ownCurrency, rates);
		const modifiedRate = getExchangeRate($modifiedCurrency, rates);
    const newValue = (value * ownRate) / modifiedRate;

    if (newValue === $modifiedValue) {
      return;
    }

		modifiedValue.set(newValue);
	});

  const ownCurrencyUnsubscribe = ownCurrency.subscribe((currency) => {
		const ownRate = getExchangeRate(currency, rates);
		const modifiedRate = getExchangeRate($modifiedCurrency, rates);
    const newValue = ($ownValue * ownRate) / modifiedRate;

    if (newValue === $modifiedValue) {
      return;
    }

		modifiedValue.set(newValue);
	});

	onDestroy(ownCurrencyUnsubscribe);
	onDestroy(ownValueUnsubscribe);
</script>

<section class="calculator__section">
	<input type="number" class="currency-input" placeholder="Введіть суму" bind:value={$ownValue} />

	<div>
		<input type="text" class="searchInput" placeholder="Search..." />

		<select class="selectList" on:change={(e) => ownCurrency.set(e.target.value)}>
			{#each rates as { txt, cc }}
				<option value={cc} selected={cc === $ownCurrency}>
					{txt}
				</option>
			{/each}
		</select>
	</div>
</section>

<style lang="scss">
	.calculator__section {
		display: flex;
		flex-direction: column;
		gap: 10px;
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
