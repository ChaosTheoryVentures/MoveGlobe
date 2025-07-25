#!/bin/bash
# Simple deployment script for MoveGlobe
# Usage: ./deploy.sh YOUR_VPS_IP

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if VPS IP is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Please provide your VPS IP address${NC}"
    echo "Usage: ./deploy.sh YOUR_VPS_IP"
    exit 1
fi

VPS_IP=$1
VPS_USER=${2:-root}
APP_DIR="/opt/moveglobe"

echo -e "${GREEN}🚀 Starting MoveGlobe deployment to $VPS_IP${NC}"

# Create a temporary directory for deployment files
echo -e "${YELLOW}📦 Preparing deployment package...${NC}"
TEMP_DIR=$(mktemp -d)
DEPLOY_ARCHIVE="moveglobe-deploy.tar.gz"

# Copy necessary files
cp -r client server shared public migrations scripts $TEMP_DIR/ 2>/dev/null || true
cp package*.json tsconfig*.json vite.config.ts drizzle.config.ts Dockerfile Procfile $TEMP_DIR/
cp .env.example docker-compose.simple.yml setup.sh setup-quick.sh $TEMP_DIR/ 2>/dev/null || true

# Create archive
cd $TEMP_DIR
tar -czf ../$DEPLOY_ARCHIVE .
cd ..

echo -e "${GREEN}✓ Deployment package created${NC}"

# Upload to VPS
echo -e "${YELLOW}📤 Uploading to VPS...${NC}"
scp $DEPLOY_ARCHIVE ${VPS_USER}@${VPS_IP}:/tmp/

# Upload and run setup script
echo -e "${YELLOW}🔧 Setting up on VPS...${NC}"
ssh ${VPS_USER}@${VPS_IP} << 'ENDSSH'
set -e

# Extract files
mkdir -p /opt/moveglobe
cd /opt/moveglobe
tar -xzf /tmp/moveglobe-deploy.tar.gz
rm /tmp/moveglobe-deploy.tar.gz

# Make setup script executable
chmod +x setup.sh
ENDSSH

echo -e "${GREEN}✓ Files uploaded successfully${NC}"
echo ""
echo -e "${YELLOW}Now SSH into your server to complete setup:${NC}"
echo -e "${GREEN}ssh ${VPS_USER}@${VPS_IP}${NC}"
echo -e "${GREEN}cd /opt/moveglobe${NC}"
echo -e "${GREEN}./setup.sh${NC}"
echo ""
echo -e "${YELLOW}The setup will ask for:${NC}"
echo "1. Domain (e.g., workwithmove.com)"
echo "2. Email (for SSL certificates)"
echo "3. Admin password"

# Cleanup
rm -rf $TEMP_DIR
rm $DEPLOY_ARCHIVE