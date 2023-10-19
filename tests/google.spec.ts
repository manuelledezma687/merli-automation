import { test, expect } from '@playwright/test';


test.describe('Test Suite Google', () => {

  test('Busqueda de keyword Automatizacion', async ({ page }) => {
    await test.step('Dado que el Usuario entra a la página de Google', async () => {
      await page.goto('https://www.google.com/');
    });

    await test.step('Cuando el Usuario ingresa la palabra "automatización"', async () => {
      const searchBar = await page.getByLabel('Buscar', { exact: true });
      await searchBar.fill('automatización');
      await searchBar.click();
      await page.getByLabel('automatización', { exact: true }).getByText('automatización').click();
    });

    await test.step('Y el Usuario encuentra en enlace de Wikipedia correspondiente', async () => {
      await page.getByRole('link', { name: 'Automatización - Wikipedia, la enciclopedia libre Wikipedia https://es.wikipedia.org › wiki › Automatización' }).click();
      await expect(page.getByRole('link', { name: 'Wikipedia La enciclopedia libre' })).toBeVisible();
    });

    await test.step('Y el Usuario ingresa a la sección Historial', async () => {
      await page.getByRole('link', { name: 'Ver historial' }).click();
    });

    await test.step('Entonces el Usuario podrá ver el historial de la primera edición del Artículo', async () => {
      const firstEdition = await page.getByRole('link', { name: '01:57 22 jul 2006' });
      firstEdition.focus();
      await expect(firstEdition).toBeVisible();
      await page.screenshot({ path: "./captures/" + Date.now() + "screenshot.jpeg" });
    });
  });
});