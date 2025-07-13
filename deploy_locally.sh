#!/bin/bash
# Local deployment script to run from your machine with proper SSH access

echo "=== MoveGlobe Local Deployment Script ==="
echo "This script will deploy your app to the Hetzner server"
echo

# Check if we have the erik SSH key
if [ ! -f ~/.ssh/id_ed25519 ] && [ ! -f ~/.ssh/id_rsa ]; then
    echo "Error: No SSH key found. You need the 'erik' SSH key to access the server."
    echo "The server was created with the 'erik' SSH key (ID: 30089070)"
    exit 1
fi

# Server details
SERVER_IP="116.203.87.132"
APP_NAME="moveglobe"

# Test SSH connection
echo "Testing SSH connection..."
if ssh -o ConnectTimeout=5 root@$SERVER_IP "echo 'SSH connection successful'"; then
    echo "✓ SSH connection established"
else
    echo "✗ SSH connection failed. Make sure you have the correct SSH key."
    exit 1
fi

# Copy deployment script to server
echo "Copying deployment script to server..."
scp deploy_on_server.sh root@$SERVER_IP:/root/

# Execute deployment script on server
echo "Running deployment script on server..."
ssh root@$SERVER_IP "chmod +x /root/deploy_on_server.sh && /root/deploy_on_server.sh"

# Add SSH key to Dokku
echo "Adding SSH key to Dokku..."
cat ~/.ssh/id_*.pub | ssh root@$SERVER_IP "dokku ssh-keys:add admin"

# Add git remote
echo "Adding Dokku git remote..."
git remote remove dokku 2>/dev/null || true
git remote add dokku dokku@$SERVER_IP:$APP_NAME

echo ""
echo "=== Deployment Setup Complete ==="
echo ""
echo "To deploy your app, run:"
echo "  git push dokku main"
echo ""
echo "To set up a domain:"
echo "  ssh root@$SERVER_IP dokku domains:set $APP_NAME yourdomain.com"
echo ""
echo "To enable SSL:"
echo "  ssh root@$SERVER_IP dokku letsencrypt:set $APP_NAME email your@email.com"
echo "  ssh root@$SERVER_IP dokku letsencrypt:enable $APP_NAME"