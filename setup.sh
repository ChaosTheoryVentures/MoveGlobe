#!/bin/bash
# VPS setup script - runs on the server
set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

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

# Check if .env exists, if not create from example
if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file...${NC}"
    cp .env.example .env
    
    # Prompt for required values
    echo -e "${GREEN}Please provide the following information:${NC}"
    read -p "Domain (e.g., workwithmove.com): " DOMAIN
    read -p "Email for SSL certificates: " EMAIL
    read -sp "Admin password: " ADMIN_PASSWORD
    echo
    
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
fi

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
echo -e "${GREEN}🌐 Your app is available at https://$(grep DOMAIN .env | cut -d= -f2)${NC}"
echo -e "${YELLOW}📊 View logs: docker compose -f docker-compose.simple.yml logs -f${NC}"