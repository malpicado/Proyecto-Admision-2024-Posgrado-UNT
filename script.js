// Obtener elementos del DOM
const hoursInput = document.getElementById("hours");
const prospectsInput = document.getElementById("prospects");
const clientsInput = document.getElementById("clients");
const resultsSection = document.getElementById("results-section");
const exchangeRateInput = document.getElementById("exchangeRate");
const googleAdsBudgetInput = document.getElementById("googleAdsBudget");
const metaAdsBudgetInput = document.getElementById("metaAdsBudget");

// Casillas de verificación para las herramientas
const metricoolCheckbox = document.getElementById("metricool");
const manychatCheckbox = document.getElementById("manychat");
const synthesiaCheckbox = document.getElementById("synthesia");
const brand24ProCheckbox = document.getElementById("brand24_pro");
const brand24TeamCheckbox = document.getElementById("brand24_team");
const activeCampaignProCheckbox = document.getElementById("activeCampaign_pro");
const activeCampaignPlusCheckbox = document.getElementById(
  "activeCampaign_plus"
);

// Escuchar cambios en los campos de entrada y casillas de verificación
hoursInput.addEventListener("input", calculateResults);
prospectsInput.addEventListener("input", calculateResults);
clientsInput.addEventListener("input", calculateResults);
metricoolCheckbox.addEventListener("change", calculateResults);
manychatCheckbox.addEventListener("change", calculateResults);
synthesiaCheckbox.addEventListener("change", calculateResults);
brand24ProCheckbox.addEventListener("change", calculateResults);
brand24TeamCheckbox.addEventListener("change", calculateResults);
activeCampaignProCheckbox.addEventListener("change", calculateResults);
activeCampaignPlusCheckbox.addEventListener("change", calculateResults);
exchangeRateInput.addEventListener("input", calculateResults);
googleAdsBudgetInput.addEventListener("input", calculateResults);
metaAdsBudgetInput.addEventListener("input", calculateResults);

function calculateResults() {
  const hours = parseInt(hoursInput.value) || 0;
  const prospects = parseInt(prospectsInput.value) || 0;
  const clients = parseInt(clientsInput.value) || 0;

  // Calcular honorarios
  const fees = hours * 100; // 100 soles por hora

  // Calcular costos de herramientas
  let toolCosts = 0;
  if (metricoolCheckbox.checked) {
    toolCosts += 45;
  }
  if (manychatCheckbox.checked) {
    toolCosts += prospects <= 2500 ? 25 : prospects <= 5000 ? 45 : 65;
  }
  if (synthesiaCheckbox.checked) {
    toolCosts += 90;
  }
  if (brand24ProCheckbox.checked) {
    toolCosts += 249;
  }
  if (brand24TeamCheckbox.checked) {
    toolCosts += 179;
  }
  if (activeCampaignProCheckbox.checked) {
    toolCosts += prospects <= 2500 ? 482 : prospects <= 5000 ? 557 : 719;
  }
  if (activeCampaignPlusCheckbox.checked) {
    toolCosts += prospects <= 2500 ? 171 : prospects <= 5000 ? 232 : 333;
  }

  // Calcular proyecciones
  const monthlyProspects = Math.ceil(prospects / 12);
  const monthlyClients = Math.ceil(clients / 12);

  // Calcular la distribución para cada proceso de admisión
  const prospectsPerAdmission = Math.ceil(prospects / 2);
  const clientsPerAdmission = Math.ceil(clients / 2);

  // Calcular el porcentaje de conversión efectiva esperada
  const conversionRate1 = (clientsPerAdmission / prospectsPerAdmission) * 100;
  const conversionRate2 = (clientsPerAdmission / prospectsPerAdmission) * 100;

  // Verificar si el porcentaje de conversión es igual o mayor al 80%
  const isValidConversionRate1 = conversionRate1 >= 80;
  const isValidConversionRate2 = conversionRate2 >= 80;

  // Calcular presupuesto anual
  const annualFees = fees * 12;
  const annualToolCosts = toolCosts * 12;

  // Obtener el tipo de cambio ingresado por el usuario
  const exchangeRate = parseFloat(exchangeRateInput.value) || 0;

  // Convertir el presupuesto anual de herramientas a soles peruanos
  const annualToolCostsInSoles = annualToolCosts * exchangeRate;

  // Obtener los nuevos valores de presupuesto para Ads
  const googleAdsBudget = parseFloat(googleAdsBudgetInput.value) || 0;
  const metaAdsBudget = parseFloat(metaAdsBudgetInput.value) || 0;

  // Calcular el presupuesto anual para Ads
  const annualGoogleAdsBudget = googleAdsBudget * 12;
  const annualMetaAdsBudget = metaAdsBudget * 12;

  // Calcular el presupuesto total anual aproximado en soles peruanos
  const annualTotalAprox =
    annualFees +
    annualToolCostsInSoles +
    annualGoogleAdsBudget +
    annualMetaAdsBudget;

  // Calcular indicadores
  const costPerLead = annualTotalAprox / prospects;
  const costAdquisitionClients = annualTotalAprox / clients;

  // Mostrar resultados en la sección de resultados
  resultsSection.innerHTML = `
<h3>Proyección de honorarios</h3>
<p>Honorarios Mensuales: ${fees} soles</p>
<p>Valor por hora del profesional: 100 soles</p>
<p>Presupuesto Anual de Honorarios proyectado: ${annualFees} soles</p>
<h3>Coste de herramientas</h3>
<p>Costo de Herramientas Mensuales: ${toolCosts} dólares</p>
<p>Presupuesto Anual de Herramientas proyectado: ${annualToolCosts} dólares</p>
<p>Presupuesto Anual de Herramientas proyectado en soles: ${annualToolCostsInSoles.toFixed(2)} Soles</p>
<h3>Inversión publicitaria anual</h3>
<p>Presupuesto Mensual Google Ads: ${googleAdsBudget} soles</p>
<p>Presupuesto Mensual Meta Ads: ${metaAdsBudget} soles</p>
<p>Presupuesto Anual Google Ads proyectado: ${annualGoogleAdsBudget} soles</p>
<p>Presupuesto Anual Meta Ads proyectado: ${annualMetaAdsBudget} soles</p>
<h3>Coste anual del proyecto</h3>
<p>Presupuesto Anual Aproximado proyectado en Soles: ${annualTotalAprox.toFixed(
    2
  )} Soles</p>
<h3>Resultados esperados</h3>
<p>Prospectos Mensuales esperados: ${monthlyProspects}</p>
<p>Clientes Mensuales esperados: ${monthlyClients}</p>
<h3>Distribución de Procesos de Admisión</h3>
<p>Proceso Admisión 1: ${prospectsPerAdmission} prospectos esperados, ${clientsPerAdmission} clientes esperados</p>
<p>Proceso Admisión 2: ${prospectsPerAdmission} prospectos esperados, ${clientsPerAdmission} clientes esperados</p>
<h3>Porcentaje de Conversión Efectiva Esperada</h3>
<p>Proceso Admisión 1: ${conversionRate1.toFixed(2)}% estimada${
    isValidConversionRate1
      ? "(Válido, Conversión esperada es 80% o más)"
      : "(No Válido, Conversión esperada es menor al 80%)"
  }</p>
<p>Proceso Admisión 2: ${conversionRate2.toFixed(2)}% ${
    isValidConversionRate2
      ? "(Válido, Conversión esperada es 80% o más)"
      : "(No Válido, Conversión esperada es menor al 80%)"
  }</p>
<h3>Indicadores objetivo</h3>
<p>Coste por Lead esperado: ${costPerLead.toFixed(2)} PEN máximos</p>
<p>Coste de Adquisición de Cliente esperado: ${costAdquisitionClients.toFixed(
    2
  )} PEN máximos</p>
`;
}
