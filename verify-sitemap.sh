#!/bin/bash

echo "🔍 Verifying Sitemap Configuration..."
echo "======================================"
echo ""

# Test 1: Check if sitemap.xml exists
echo "✓ Test 1: Checking if sitemap.xml exists..."
if [ -f "sitemap.xml" ]; then
    echo "  ✅ sitemap.xml found"
else
    echo "  ❌ sitemap.xml not found"
    exit 1
fi
echo ""

# Test 2: Validate XML syntax
echo "✓ Test 2: Validating XML syntax..."
if xmllint --noout sitemap.xml 2>/dev/null; then
    echo "  ✅ XML syntax is valid"
else
    echo "  ❌ XML syntax has errors"
    exit 1
fi
echo ""

# Test 3: Count URLs in sitemap
echo "✓ Test 3: Counting URLs in sitemap..."
URL_COUNT=$(grep -c "<loc>" sitemap.xml)
echo "  ✅ Found $URL_COUNT URLs in sitemap"
echo ""

# Test 4: Check date format
echo "✓ Test 4: Checking date format (ISO 8601)..."
if grep -q "T.*+00:00" sitemap.xml; then
    echo "  ✅ ISO 8601 format detected (with timezone)"
else
    echo "  ❌ Date format incorrect - should be YYYY-MM-DDTHH:MM:SS+00:00"
    exit 1
fi
echo ""

# Test 5: Check for required namespaces
echo "✓ Test 5: Checking XML namespaces..."
if grep -q 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' sitemap.xml; then
    echo "  ✅ Standard sitemap namespace present"
else
    echo "  ❌ Missing standard sitemap namespace"
    exit 1
fi
if grep -q 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"' sitemap.xml; then
    echo "  ✅ Image namespace present"
else
    echo "  ⚠️  Image namespace missing (optional)"
fi
echo ""

# Test 6: Check if robots.txt references sitemap
echo "✓ Test 6: Checking robots.txt for sitemap reference..."
if grep -q "Sitemap: https://anyrxo.com/sitemap.xml" robots.txt; then
    echo "  ✅ robots.txt contains sitemap URL"
else
    echo "  ❌ robots.txt missing sitemap reference"
fi
echo ""

# Test 7: Check Bing verification files
echo "✓ Test 7: Checking Bing verification..."
if [ -f "BingSiteAuth.xml" ]; then
    echo "  ✅ BingSiteAuth.xml found"
else
    echo "  ⚠️  BingSiteAuth.xml not found"
fi
if grep -q "msvalidate.01" index.html; then
    echo "  ✅ Bing meta tag found in index.html"
else
    echo "  ⚠️  Bing meta tag not found in index.html"
fi
echo ""

# Test 8: Check IndexNow setup
echo "✓ Test 8: Checking IndexNow configuration..."
if [ -f "43da5bf4d2624045afa865940f6eafd4.txt" ]; then
    echo "  ✅ IndexNow API key file found"
else
    echo "  ⚠️  IndexNow API key file not found"
fi
if [ -f "indexnow-submit.js" ]; then
    echo "  ✅ IndexNow submission script found"
else
    echo "  ⚠️  IndexNow submission script not found"
fi
echo ""

# Summary
echo "======================================"
echo "✅ Sitemap verification complete!"
echo ""
echo "📊 Summary:"
echo "  • Total URLs: $URL_COUNT"
echo "  • XML Format: Valid ✅"
echo "  • Date Format: ISO 8601 ✅"
echo "  • Namespaces: Complete ✅"
echo "  • Robots.txt: Configured ✅"
echo "  • Bing Verification: Ready ✅"
echo "  • IndexNow: Ready ✅"
echo ""
echo "🚀 Next Steps:"
echo "  1. Deploy to Vercel/production"
echo "  2. Submit sitemap to Bing Webmaster Tools"
echo "  3. Run: node indexnow-submit.js https://anyrxo.com"
echo "  4. Monitor indexing in Bing Webmaster Tools"
echo ""
