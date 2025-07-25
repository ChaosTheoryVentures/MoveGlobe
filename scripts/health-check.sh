#!/bin/bash
# Health check script for monitoring

DOMAIN=${1:-localhost}
PROTOCOL=${2:-https}

echo "Checking health of $PROTOCOL://$DOMAIN"
echo "======================================"

# Check main site
echo -n "Main site: "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" $PROTOCOL://$DOMAIN)
if [ $STATUS -eq 200 ]; then
    echo "✅ OK ($STATUS)"
else
    echo "❌ FAIL ($STATUS)"
fi

# Check API health
echo -n "API health: "
HEALTH=$(curl -s $PROTOCOL://$DOMAIN/api/health)
if [[ $HEALTH == *"ok"* ]]; then
    echo "✅ OK"
else
    echo "❌ FAIL"
fi

# Check SSL certificate
echo -n "SSL certificate: "
if [ "$PROTOCOL" == "https" ]; then
    CERT_DAYS=$(echo | openssl s_client -servername $DOMAIN -connect $DOMAIN:443 2>/dev/null | openssl x509 -noout -dates 2>/dev/null | grep notAfter | cut -d= -f2 | xargs -I {} date -d {} +%s)
    CURRENT=$(date +%s)
    if [ ! -z "$CERT_DAYS" ]; then
        DAYS_LEFT=$(( ($CERT_DAYS - $CURRENT) / 86400 ))
        if [ $DAYS_LEFT -gt 7 ]; then
            echo "✅ OK ($DAYS_LEFT days remaining)"
        else
            echo "⚠️  WARNING ($DAYS_LEFT days remaining)"
        fi
    else
        echo "❌ FAIL (Could not check)"
    fi
else
    echo "⏭️  SKIPPED (HTTP only)"
fi

# Check response time
echo -n "Response time: "
TIME=$(curl -s -o /dev/null -w "%{time_total}" $PROTOCOL://$DOMAIN)
if (( $(echo "$TIME < 2" | bc -l) )); then
    echo "✅ OK (${TIME}s)"
else
    echo "⚠️  SLOW (${TIME}s)"
fi

echo "======================================"