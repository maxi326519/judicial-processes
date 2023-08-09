import { Request, Response } from "express";
import { onRequest } from "firebase-functions/v1/https";
import puppeteer from "puppeteer";

exports.webScrapingFunction = onRequest(async (req: Request, res: Response) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // URL to scrap
    const url = 'https://example.com';

    await page.goto(url);

    // Realiza las acciones necesarias de selección de checkbox, ingreso de datos y clic en el botón.
    await page.click('#checkboxId');
    await page.type('#inputId', 'Datos a ingresar');
    await page.click('#buttonId');

    // Espera un tiempo para que se carguen los resultados después de hacer clic en el botón.
    await page.waitForTimeout(2000);

    // Extrae los datos que necesitas del resultado de la página web.
    const data = await page.evaluate(() => {
      // Aquí puedes utilizar código JavaScript para extraer los datos del DOM de la página web.
      return {
        resultado1: page.$eval('#resultado1', el => el.textContent),
        resultado2: page.$eval('#resultado2', el => el.textContent),
        // ... más resultados si es necesario ...
      };
    });

    await browser.close();

    // Devuelve los datos obtenidos como respuesta de la función.
    res.json(data);
  } catch (error) {
    console.error('Error en el web scraping:', error);
    res.status(500).send('Error en el web scraping');
  }
});