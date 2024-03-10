<script>
	// @ts-nocheck

	export let ownValue;
	export let ownCurrency;
	export let modifiedValue;
	export let modifiedCurrency;
	export let rates;
	export let rightSelect;
	let autocompleteValue = '';
	let selectOptions = rates;

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

	const getValidString = (str) => str.toLowerCase().trim();

	const getFiltredRates = () => {
		if (!autocompleteValue) {
			return rates;
		}

		return rates.filter(({ txt, cc }) => {
			const validInput = getValidString(autocompleteValue);

			if (getValidString(txt).includes(validInput) || getValidString(cc).includes(validInput)) {
				return true;
			}
		});
	};
</script>

<section class="counting-block">
	<div class="counting-block__currency-value">
		<input
			type="number"
			class="counting-block__value-input"
			placeholder="Введіть суму"
			min="0"
			bind:value={$ownValue}
			on:keyup={calculateNewValueHandler}
			on:wheel={calculateNewValueHandler}
		/>
		<span class="counting-block__currency-name">{$ownCurrency}</span>
	</div>

	<div>
		<input
			type="text"
			class="counting-block__search-input"
			placeholder="Пошук по назві"
			bind:value={autocompleteValue}
			on:change={() => (selectOptions = getFiltredRates())}
		/>

		{#if !selectOptions.length}
			<span>Немає такої валюти</span>
		{:else}
			<select class="counting-block__select-list" on:change={selectCurrencyHandler}>
				{#each selectOptions as { txt, cc }}
					<option value={cc} selected={cc === $ownCurrency}>
						{txt}
					</option>
				{/each}
			</select>
		{/if}
	</div>
</section>

<style lang="scss">
	.counting-block {
		display: flex;
		flex-direction: column;
		gap: 10px;
		font-family: 'Roboto', sans-serif;
		width: 300px;

		&__currency-value {
			display: flex;
			align-items: center;
			gap: 5px;
		}

		&__value-input {
			padding: 10px;
			border: 1px solid #ccc;
			border-radius: 5px;
			font-size: 16px;
			transition: border-color 0.3s;
			font-family: inherit;
			flex-grow: 2;

			&:focus {
				outline: none;
				border-color: #007bff;
				box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
			}

			&__currency-name {
				font-family: inherit;
				font-size: 16px;
			}
		}

		&__search-input {
			margin-bottom: 10px;
			padding: 5px;
			border: 1px solid #ccc;
			border-radius: 4px;
			width: 100%;
			box-sizing: border-box;
			font-family: inherit;
			font-size: 16px;
		}

		&__select-list {
			width: 100%;
			padding: 5px;
			border: 1px solid #ccc;
			border-radius: 4px;
			box-sizing: border-box;
			background-color: #fff;
			font-size: 16px;
			font-family: inherit;
		}
	}
</style>
