<script>
	// @ts-nocheck

	export let ownValue;
	export let ownCurrency;
	export let modifiedValue;
	export let modifiedCurrency;
	export let rates;
	export let rightSelect;

	const getExchangeRate = (currency, exchangeRates) => {
		return exchangeRates.find((exchangeRate) => currency === exchangeRate.cc).rate;
	};

	const getNewValue = (rightSelect = false) => {
		const ownRate = getExchangeRate($ownCurrency, rates);
		const modifiedRate = getExchangeRate($modifiedCurrency, rates);

		if (rightSelect) {
			return ($ownValue * modifiedRate) / ownRate;
		}

		return ($ownValue * ownRate) / modifiedRate;
	};

	const calculateNewValueHandler = () => {
		const newValue = getNewValue();

		modifiedValue.set(newValue);
	};

	const selectCurrencyHandler = (event) => {
		ownCurrency.set(event.target.value);

		if (rightSelect) {
			const newValue = getNewValue(rightSelect);

			ownValue.set(newValue);

			return;
		}

		calculateNewValueHandler();
	};
</script>

<section class="calculator__section">
	<input
		type="number"
		class="currency-input"
		placeholder="Введіть суму"
		min="0"
		bind:value={$ownValue}
		on:keyup={calculateNewValueHandler}
		on:wheel={calculateNewValueHandler}
	/>

	<div>
		<input type="text" class="searchInput" placeholder="Search..." />

		<select class="selectList" on:change={selectCurrencyHandler}>
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
