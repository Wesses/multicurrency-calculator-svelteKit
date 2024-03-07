import { error } from '@sveltejs/kit';

export async function load() {
  try {
    const response  = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
    const rates = await response.json();

    return {
      rates,
    }
  } catch {
    throw error(500, 'Server error');
  }
}