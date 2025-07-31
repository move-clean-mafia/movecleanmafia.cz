# i18n Translation Management

This project includes comprehensive tools for managing internationalization (i18n) translations, including scanning for unused translations and maintaining translation consistency across locales.

## Tools Overview

### 1. i18next-scanner

A powerful tool that scans your codebase for translation usage and automatically removes unused translation keys.

### 2. Custom i18n Manager Script

A custom Node.js script that provides additional functionality for translation management.

## Available Commands

### Basic Scanning Commands

```bash
# Scan for unused translations (read-only)
pnpm i18n:scan

# Remove unused translations from all locale files
pnpm i18n:clean

# Show translation statistics
pnpm i18n:stats

# Find missing translations
pnpm i18n:missing

# Run comprehensive scan (unused + missing + stats)
pnpm i18n:check
```

### Advanced Usage

```bash
# Use the custom manager script directly
node scripts/i18n-manager.js <command>

# Available commands:
node scripts/i18n-manager.js missing    # Find missing translations
node scripts/i18n-manager.js unused     # Find unused translations
node scripts/i18n-manager.js clean      # Remove unused translations
node scripts/i18n-manager.js stats      # Show translation statistics
node scripts/i18n-manager.js scan       # Run full scan
```

## Configuration

### i18next-scanner Configuration

The scanner is configured in `i18next-scanner.config.cjs`:

- **Input**: Scans `app/`, `components/`, and `lib/` directories
- **Output**: Updates translation files in `locales/`
- **Supported Languages**: English (en), Czech (cs), Ukrainian (ua)
- **Namespace**: `common`
- **Functions**: Detects `t()`, `i18next.t()`, and `i18n.t()` calls

### Supported Translation Patterns

The scanner detects these patterns in your code:

```typescript
// Basic translation
t('navigation.home');

// Nested translation
t('services.movingFeatures.0');

// Dynamic translation
t(`navigation.${item.key}`);

// With interpolation
t('welcome.message', { name: 'John' });
```

## Workflow

### 1. Development Workflow

1. **Add new translations**: Add keys to `locales/en/common.json` first
2. **Translate**: Add corresponding translations to `locales/cs/common.json` and `locales/ua/common.json`
3. **Scan regularly**: Run `pnpm i18n:scan` to check for unused translations
4. **Clean up**: Run `pnpm i18n:clean` to remove unused translations

### 2. Maintenance Workflow

1. **Weekly check**: Run `pnpm i18n:check` for comprehensive analysis
2. **Before releases**: Run `pnpm i18n:clean` to remove unused translations
3. **Monitor statistics**: Use `pnpm i18n:stats` to track translation count

## Best Practices

### 1. Translation Key Naming

```typescript
// ✅ Good - descriptive and hierarchical
t('services.moving.title');
t('contact.form.email.placeholder');

// ❌ Avoid - too generic
t('title');
t('text');
```

### 2. Translation Organization

```json
{
  "navigation": {
    "home": "Home",
    "services": "Services"
  },
  "services": {
    "moving": {
      "title": "Moving Services",
      "description": "Professional moving services"
    }
  }
}
```

### 3. Handling Missing Translations

The scanner will:

- Keep existing translations
- Remove unused translations
- Report missing translations (when comparing with English)

### 4. Dynamic Translations

For dynamic content, use interpolation:

```typescript
// ✅ Good
t('welcome.message', { name: userName });

// ❌ Avoid - dynamic keys are harder to track
t(`user.${userId}.name`);
```

## Troubleshooting

### Common Issues

1. **Scanner not detecting translations**
   - Check that you're using `t()` function from `react-i18next`
   - Ensure translation keys are strings, not variables

2. **False positives (removing used translations)**
   - Check for dynamic key generation
   - Verify translation keys are exact matches

3. **Configuration errors**
   - Ensure `i18next-scanner.config.cjs` exists
   - Check file paths in configuration

### Debug Mode

Enable debug mode in the scanner configuration:

```javascript
options: {
  debug: true,
  // ... other options
}
```

## Integration with CI/CD

Add these commands to your CI/CD pipeline:

```yaml
# Example GitHub Actions workflow
- name: Check translations
  run: |
    pnpm i18n:check
    pnpm i18n:missing

- name: Clean unused translations
  run: pnpm i18n:clean
```

## File Structure

```
locales/
├── en/
│   └── common.json    # English translations (source)
├── cs/
│   └── common.json    # Czech translations
└── ua/
    └── common.json    # Ukrainian translations

scripts/
└── i18n-manager.js   # Custom management script

i18next-scanner.config.cjs  # Scanner configuration
```

## Statistics

After running the scanner, you can see:

- Total translation keys per locale
- Missing translations per locale
- Unused translations that were removed

Example output:

```
📊 Translation Statistics:

EN: 242 translation keys
CS: 242 translation keys
UA: 242 translation keys
```

## Contributing

When adding new features:

1. Add English translations first
2. Translate to all supported languages
3. Run `pnpm i18n:scan` to verify
4. Update this documentation if needed

## Support

For issues with:

- **i18next-scanner**: Check the [official documentation](https://github.com/i18next/i18next-scanner)
- **Custom script**: Check the script comments and this documentation
- **Configuration**: Verify paths and settings in `i18next-scanner.config.cjs`
