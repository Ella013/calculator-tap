# Font Awesome Removal Guide

## Summary
- **Total unique icons used**: ~15-20
- **Solution chosen**: Option A (Inline SVG)
- **Reason**: Immediate performance improvement, no external dependencies

## Icons Used
1. fa-home
2. fa-bars (hamburger menu)
3. fa-times (close/X)
4. fa-globe
5. fa-chevron-down
6. fa-money-bill
7. fa-wallet
8. fa-money-bill-wave
9. fa-chart-line
10. fa-chart-bar
11. fa-chart-pie
12. fa-coins
13. fa-search
14. fa-calculator
15. fa-hand-holding-usd
16. fa-check-circle (about.html)
17. fa-user-friends (about.html)
18. fa-shield-alt (about.html)
19. fa-sync (about.html)
20. fa-arrow-right (about.html)

## Implementation Status
⚠️ **Note**: This is a large refactoring task affecting 10+ HTML files.

Due to the scope, a helper script has been created (`replace-fontawesome.js`) to automate the replacements.

## Manual Implementation Pattern

### Before:
```html
<i class="fas fa-home"></i>
```

### After:
```html
<svg width="16" height="16" viewBox="0 0 576 512" fill="currentColor" aria-hidden="true">
  <path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"/>
</svg>
```

## CSS Updates Needed

Add to `styles.css`:
```css
/* SVG icon sizing - replace Font Awesome classes */
svg[aria-hidden="true"] {
  display: inline-block;
  vertical-align: middle;
  width: 1em;
  height: 1em;
}

.nav-link svg,
.mobile-nav-link svg {
  margin-right: 0.5rem;
}

.language-icon svg {
  margin-right: 0.5rem;
}
```

## Files to Update
1. index.html
2. about.html
3. terms.html
4. loan-calculator/loan-calculator.html
5. payoff-calculator/payoff-calculator.html
6. Mortgage-Qualification-Calculator/mortgage-qualification.html
7. paycheck-calculator/paycheck-calculator.html
8. compound-interest-calculator/compound-interest.html
9. dividend-calculator/dividend-calculator.html
10. investment-return-calculator/investment-return.html
11. stock-return-calculator/stock-return.html

## Font Awesome CSS Links to Remove

Remove these from all HTML files:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
```

Or if using async loading:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"></noscript>
```

## Next Steps

Given the large scope, consider:
1. Using the automated replacement script
2. Or implementing incrementally (start with index.html, then calculator pages)
3. Testing after each file to ensure icons display correctly

## Performance Benefits
- Removes ~75KB external CSS file
- Eliminates render-blocking resource
- Reduces HTTP requests
- Faster initial page load
- No external dependency
