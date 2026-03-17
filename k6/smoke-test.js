/**
 * SuitPay — Smoke Test de Performance (k6)
 *
 * Objetivo: Validar baseline de performance da API do sandbox.
 * Executa via imagem Docker grafana/k6 no pipeline de CI/CD.
 *
 * Parâmetros:
 *   - 1 VU (usuário virtual), duração de 30 segundos
 *   - Tolerância: p(95) < 2000ms e taxa de erros < 1%
 */
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// ============================================================
// MÉTRICAS CUSTOMIZADAS
// ============================================================
const errorRate = new Rate('errors');
const loginPageDuration = new Trend('login_page_duration', true);

// ============================================================
// CONFIGURAÇÃO DO TESTE
// ============================================================
export const options = {
  // Smoke test: carga mínima para validar que o sistema funciona
  vus: 1,
  duration: '30s',

  // Thresholds — se ultrapassar, o job falha no CI
  thresholds: {
    // 95% das requisições devem responder em menos de 2 segundos
    http_req_duration: ['p(95)<2000'],
    // Menos de 1% de erros
    errors: ['rate<0.01'],
    // Threshold customizado para a página de login
    login_page_duration: ['p(95)<2000'],
  },
};

// ============================================================
// SETUP — Executado uma vez antes dos VUs iniciarem
// ============================================================
export function setup() {
  const baseUrl = __ENV.K6_BASE_URL || 'https://web.sandbox.suitpay.app';
  console.log(`🎯 Base URL: ${baseUrl}`);
  return { baseUrl };
}

// ============================================================
// CENÁRIO PRINCIPAL
// ============================================================
export default function (data) {
  const baseUrl = data.baseUrl;

  // --- Iteração 1: Health check da página de login ---
  const loginResponse = http.get(`${baseUrl}/login`, {
    tags: { name: 'login_page' },
  });

  loginPageDuration.add(loginResponse.timings.duration);

  const loginOk = check(loginResponse, {
    'Login page — status 200': (r) => r.status === 200,
    'Login page — responde em < 2s': (r) => r.timings.duration < 2000,
  });

  errorRate.add(!loginOk);

  sleep(1); // Pausa de 1s entre iterações para simular usuário real
}

// ============================================================
// TEARDOWN — Resumo executado ao final do teste
// ============================================================
export function teardown(data) {
  console.log('✅ Smoke test finalizado. Verifique os thresholds acima.');
}
