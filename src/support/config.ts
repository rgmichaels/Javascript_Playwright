import dotenv from 'dotenv';

dotenv.config();

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === '') {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value.trim();
}

function booleanEnv(name: string, defaultValue: boolean): boolean {
  const value = process.env[name];
  if (value === undefined || value === '') {
    return defaultValue;
  }
  return ['1', 'true', 'yes', 'y'].includes(value.toLowerCase());
}

function numberEnv(name: string, defaultValue: number): number {
  const value = process.env[name];
  if (value === undefined || value === '') {
    return defaultValue;
  }
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new Error(`Environment variable ${name} must be a number. Received: ${value}`);
  }
  return parsed;
}

function normalizeBaseUrl(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

export const config = {
  baseUrl: normalizeBaseUrl(requiredEnv('BASE_URL')),
  headless: booleanEnv('HEADLESS', process.env.CI === 'true' ? true : true),
  retries: numberEnv('RETRIES', process.env.CI === 'true' ? 1 : 0),
  parallel: numberEnv('PARALLEL', process.env.CI === 'true' ? 2 : 1),
  traceOnRetry: booleanEnv('TRACE_ON_RETRY', true),
  captureHtmlOnFailure: booleanEnv('CAPTURE_HTML_ON_FAILURE', true),
  networkLogging: booleanEnv('NETWORK_LOGGING', false),
  timeouts: {
    action: numberEnv('ACTION_TIMEOUT_MS', 10000),
    navigation: numberEnv('NAVIGATION_TIMEOUT_MS', 30000),
    scenario: numberEnv('SCENARIO_TIMEOUT_MS', 60000)
  }
};
