#!/bin/bash
# Quick setup with command line arguments
# Usage: ./setup-quick.sh DOMAIN EMAIL ADMIN_PASSWORD

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check arguments
if [ $# -ne 3 ]; then
    echo -e "${RED}Error: Please provide all required arguments${NC}"
    echo "Usage: ./setup-quick.sh DOMAIN EMAIL ADMIN_PASSWORD"
    echo "Example: ./setup-quick.sh workwithmove.com admin@example.com mypassword"
    exit 1
fi

DOMAIN=$1
EMAIL=$2
ADMIN_PASSWORD=$3

echo -e "${GREEN}🚀 Setting up MoveGlobe...${NC}"

# Install Docker if not present
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}Installing Docker...${NC}"
    curl -fsSL https://get.docker.com | sh
fi

# Install Docker Compose plugin
if ! docker compose version &> /dev/null; then
    echo -e "${YELLOW}Installing Docker Compose...${NC}"
    apt-get update
    apt-get install -y docker-compose-plugin
fi

# Create .env file
echo -e "${YELLOW}Creating configuration...${NC}"
cp .env.example .env

# Generate secure random values
SESSION_SECRET=$(openssl rand -base64 32)
POSTGRES_PASSWORD=$(openssl rand -base64 24 | tr -d "=+/" | cut -c1-16)

# Update .env file
sed -i "s|DOMAIN=.*|DOMAIN=$DOMAIN|" .env
sed -i "s|EMAIL=.*|EMAIL=$EMAIL|" .env
sed -i "s|ADMIN_PASSWORD=.*|ADMIN_PASSWORD=$ADMIN_PASSWORD|" .env
sed -i "s|SESSION_SECRET=.*|SESSION_SECRET=$SESSION_SECRET|" .env
sed -i "s|POSTGRES_PASSWORD=.*|POSTGRES_PASSWORD=$POSTGRES_PASSWORD|" .env

echo -e "${GREEN}✓ Configuration saved${NC}"

# Build and start services
echo -e "${YELLOW}Starting services...${NC}"
docker compose -f docker-compose.simple.yml down 2>/dev/null || true
docker compose -f docker-compose.simple.yml up --build -d

# Wait for services to be ready
echo -e "${YELLOW}Waiting for services to start...${NC}"
sleep 10

# Run database migrations
echo -e "${YELLOW}Running database migrations...${NC}"
docker compose -f docker-compose.simple.yml exec -T backend npm run db:push || {
    echo -e "${YELLOW}Retrying migrations in 10 seconds...${NC}"
    sleep 10
    docker compose -f docker-compose.simple.yml exec -T backend npm run db:push
}

echo -e "${GREEN}✅ Setup complete!${NC}"
echo -e "${GREEN}🌐 Your app is available at https://$DOMAIN${NC}"
echo -e "${YELLOW}📊 View logs: docker compose -f docker-compose.simple.yml logs -f${NC}"