#!/bin/bash
# Initialize SSL certificates with Let's Encrypt

set -e

if [ -z "$DOMAIN_NAME" ]; then
    echo "Error: DOMAIN_NAME environment variable is not set"
    exit 1
fi

if [ -z "$EMAIL" ]; then
    echo "Error: EMAIL environment variable is not set"
    exit 1
fi

echo "Initializing SSL certificates for $DOMAIN_NAME..."

# Create required directories
mkdir -p ./nginx/conf.d
mkdir -p ./certbot/conf
mkdir -p ./certbot/www

# Check if certificates already exist
if [ -d "./certbot/conf/live/$DOMAIN_NAME" ]; then
    echo "Certificates already exist for $DOMAIN_NAME"
    read -p "Do you want to renew them? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 0
    fi
fi

# Create a temporary nginx configuration for certbot
cat > ./nginx/nginx.temp.conf << EOF
events {
    worker_connections 1024;
}

http {
    server {
        listen 80;
        server_name $DOMAIN_NAME;
        
        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }
        
        location / {
            return 404;
        }
    }
}
EOF

# Start nginx with temporary configuration
echo "Starting temporary nginx for certificate generation..."
docker run -d --name temp-nginx \
    -p 80:80 \
    -v $(pwd)/nginx/nginx.temp.conf:/etc/nginx/nginx.conf:ro \
    -v $(pwd)/certbot/www:/var/www/certbot:ro \
    nginx:alpine

# Wait for nginx to start
sleep 5

# Request certificate
echo "Requesting certificate from Let's Encrypt..."
docker run --rm \
    -v $(pwd)/certbot/conf:/etc/letsencrypt \
    -v $(pwd)/certbot/www:/var/www/certbot \
    certbot/certbot:latest \
    certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    --force-renewal \
    -d $DOMAIN_NAME \
    -d www.$DOMAIN_NAME

# Stop temporary nginx
docker stop temp-nginx
docker rm temp-nginx

# Clean up temporary configuration
rm ./nginx/nginx.temp.conf

# Generate DH parameters
echo "Generating DH parameters..."
docker run --rm -v $(pwd)/nginx:/output alpine:latest sh -c "
    apk add --no-cache openssl
    openssl dhparam -out /output/dhparam.pem 2048
"

echo "SSL initialization complete!"
echo "You can now run: docker-compose -f docker-compose.prod.yml up -d"