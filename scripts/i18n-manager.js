#!/usr/bin/env node
/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const LOCALES_DIR = 'locales';
const SUPPORTED_LOCALES = ['en', 'cs', 'ua'];

/**
 * Get all translation keys from a JSON file recursively
 */
function getTranslationKeys(obj, prefix = '') {
  const keys = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys.push(...getTranslationKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }

  return keys;
}

/**
 * Read translation file
 */
function readTranslationFile(locale) {
  const filePath = path.join(LOCALES_DIR, locale, 'common.json');
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return {};
  }
}

/**
 * Find missing translations by comparing with English
 */
function findMissingTranslations() {
  console.log('\n🔍 Checking for missing translations...\n');

  const englishTranslations = readTranslationFile('en');
  const englishKeys = getTranslationKeys(englishTranslations);

  for (const locale of SUPPORTED_LOCALES) {
    if (locale === 'en') continue;

    const localeTranslations = readTranslationFile(locale);
    const localeKeys = getTranslationKeys(localeTranslations);

    const missingKeys = englishKeys.filter((key) => !localeKeys.includes(key));

    if (missingKeys.length > 0) {
      console.log(`❌ Missing translations in ${locale.toUpperCase()}:`);
      missingKeys.forEach((key) => console.log(`   - ${key}`));
      console.log('');
    } else {
      console.log(`✅ All translations present in ${locale.toUpperCase()}`);
    }
  }
}

/**
 * Find unused translations (safe mode - read only)
 */
function findUnusedTranslations() {
  console.log('\n🔍 Scanning for unused translations (safe mode)...\n');
  console.log('⚠️  This is a safe scan that will not modify your files.\n');

  try {
    // Create a temporary config for safe scanning
    const baseConfig = {
      input: [
        'app/**/*.{js,jsx,ts,tsx}',
        'components/**/*.{js,jsx,ts,tsx}',
        'lib/**/*.{js,jsx,ts,tsx}',
        '!**/node_modules/**',
        '!**/.next/**',
        '!**/dist/**',
        '!**/build/**',
      ],
      output: './',
      options: {
        debug: false,
        removeUnusedKeys: false,
        sort: true,
        func: {
          list: ['t', 'i18next.t', 'i18n.t'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        trans: {
          component: 'Trans',
          i18nKey: 'i18nKey',
          defaultsKey: 'defaults',
          fallbackKey: function (ns, value) {
            return value;
          },
        },
        lngs: ['en', 'cs', 'ua'],
        ns: ['common'],
        defaultLng: 'en',
        defaultNs: 'common',
        defaultValue: '',
        resource: {
          loadPath: 'locales/{{lng}}/{{ns}}.json',
          savePath: 'locales/{{lng}}/{{ns}}.json',
          jsonIndent: 2,
          lineEnding: '\n',
        },
        nsSeparator: false,
        keySeparator: '.',
        interpolation: {
          prefix: '{{',
          suffix: '}}',
        },
      },
    };

    // Write temporary config
    const tempConfigPath = 'i18next-scanner-temp.config.cjs';
    fs.writeFileSync(
      tempConfigPath,
      `module.exports = ${JSON.stringify(baseConfig, null, 2)};`,
    );

    // Run scanner with temporary config
    execSync(`i18next-scanner --config ${tempConfigPath}`, { stdio: 'pipe' });

    // Clean up
    fs.unlinkSync(tempConfigPath);

    console.log('\n✅ Translation scan completed in safe mode.');
    console.log('💡 To remove unused translations, run: pnpm i18n:clean');
  } catch (error) {
    console.error('❌ Error running translation scan:', error.message);
  }
}

/**
 * Clean unused translations (with confirmation)
 */
function cleanUnusedTranslations() {
  console.log('\n🧹 Cleaning unused translations...\n');
  console.log('⚠️  This will modify your translation files!');
  console.log('📁 Make sure you have a backup of your locales folder.\n');

  try {
    // Create a temporary config for cleaning
    const baseConfig = {
      input: [
        'app/**/*.{js,jsx,ts,tsx}',
        'components/**/*.{js,jsx,ts,tsx}',
        'lib/**/*.{js,jsx,ts,tsx}',
        '!**/node_modules/**',
        '!**/.next/**',
        '!**/dist/**',
        '!**/build/**',
      ],
      output: './',
      options: {
        debug: true,
        removeUnusedKeys: true,
        sort: true,
        func: {
          list: ['t', 'i18next.t', 'i18n.t'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        trans: {
          component: 'Trans',
          i18nKey: 'i18nKey',
          defaultsKey: 'defaults',
          fallbackKey: function (ns, value) {
            return value;
          },
        },
        lngs: ['en', 'cs', 'ua'],
        ns: ['common'],
        defaultLng: 'en',
        defaultNs: 'common',
        defaultValue: '',
        resource: {
          loadPath: 'locales/{{lng}}/{{ns}}.json',
          savePath: 'locales/{{lng}}/{{ns}}.json',
          jsonIndent: 2,
          lineEnding: '\n',
        },
        nsSeparator: false,
        keySeparator: '.',
        interpolation: {
          prefix: '{{',
          suffix: '}}',
        },
      },
    };

    // Write temporary config
    const tempConfigPath = 'i18next-scanner-clean.config.cjs';
    fs.writeFileSync(
      tempConfigPath,
      `module.exports = ${JSON.stringify(baseConfig, null, 2)};`,
    );

    // Run scanner with temporary config
    execSync(`i18next-scanner --config ${tempConfigPath}`, {
      stdio: 'inherit',
    });

    // Clean up
    fs.unlinkSync(tempConfigPath);

    console.log('\n✅ Unused translations cleaned successfully!');
    console.log('📊 Run "pnpm i18n:stats" to see the updated statistics.');
  } catch (error) {
    console.error('❌ Error cleaning translations:', error.message);
  }
}

/**
 * Show translation statistics
 */
function showStatistics() {
  console.log('\n📊 Translation Statistics:\n');

  for (const locale of SUPPORTED_LOCALES) {
    const translations = readTranslationFile(locale);
    const keys = getTranslationKeys(translations);

    console.log(`${locale.toUpperCase()}: ${keys.length} translation keys`);
  }
}

/**
 * Show detailed analysis without modifying files
 */
function showDetailedAnalysis() {
  console.log('\n🔍 Detailed Translation Analysis:\n');

  try {
    // Show statistics first
    showStatistics();

    // Check for missing translations
    findMissingTranslations();

    console.log('\n💡 To scan for unused translations, run: pnpm i18n:unused');
    console.log('💡 To remove unused translations, run: pnpm i18n:clean');
  } catch (error) {
    console.error('❌ Error during analysis:', error.message);
  }
}

/**
 * Main function
 */
function main() {
  const command = process.argv[2];

  console.log('🌐 i18n Translation Manager\n');

  switch (command) {
    case 'missing':
      findMissingTranslations();
      break;
    case 'unused':
      findUnusedTranslations();
      break;
    case 'clean':
      cleanUnusedTranslations();
      break;
    case 'stats':
      showStatistics();
      break;
    case 'scan':
      showDetailedAnalysis();
      break;
    case 'safe-scan':
      findUnusedTranslations();
      findMissingTranslations();
      showStatistics();
      break;
    default:
      console.log('Usage: node scripts/i18n-manager.js <command>');
      console.log('');
      console.log('Commands:');
      console.log('  missing    - Find missing translations');
      console.log('  unused     - Find unused translations (safe mode)');
      console.log(
        '  clean      - Remove unused translations (⚠️ modifies files)',
      );
      console.log('  stats      - Show translation statistics');
      console.log('  scan       - Run detailed analysis (safe mode)');
      console.log('  safe-scan  - Run full scan without modifying files');
      console.log('');
      console.log('Examples:');
      console.log('  node scripts/i18n-manager.js scan');
      console.log('  node scripts/i18n-manager.js clean');
      console.log('');
      console.log('💡 Safe commands (no file modifications):');
      console.log('  pnpm i18n:stats        - Show statistics');
      console.log('  pnpm i18n:missing      - Find missing translations');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
