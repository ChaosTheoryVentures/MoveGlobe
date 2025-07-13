#!/bin/bash
set -e

echo "=== MoveGlobe Server Deployment Script ==="
echo "This script will install Dokku and configure the server"
echo

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   print_error "This script must be run as root"
   exit 1
fi

# Update system
print_status "Updating system packages..."
apt-get update -qq
apt-get upgrade -y -qq

# Install basic dependencies
print_status "Installing basic dependencies..."
apt-get install -y -qq \
    curl \
    wget \
    git \
    ufw \
    fail2ban \
    nginx \
    certbot \
    python3-certbot-nginx \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release

# Configure firewall
print_status "Configuring UFW firewall..."
ufw --force enable
ufw allow ssh
ufw allow http
ufw allow https
ufw allow 2222/tcp  # Dokku SSH
ufw allow 5000/tcp  # Node.js app
ufw status

# Configure fail2ban
print_status "Configuring fail2ban..."
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 1h
findtime = 10m
maxretry = 5

[sshd]
enabled = true
port = ssh
logpath = %(sshd_log)s
backend = %(sshd_backend)s
EOF

systemctl enable fail2ban
systemctl restart fail2ban

# Install Docker
print_status "Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    apt-get update -qq
    apt-get install -y -qq docker-ce docker-ce-cli containerd.io
fi

# Install Dokku
print_status "Installing Dokku..."
if ! command -v dokku &> /dev/null; then
    wget -qO- https://packagecloud.io/dokku/dokku/gpgkey | apt-key add -
    echo "deb https://packagecloud.io/dokku/dokku/ubuntu/ $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/dokku.list
    apt-get update -qq
    DOKKU_TAG=v0.34.8 apt-get install -y -qq dokku
    dokku plugin:install-dependencies --core
fi

# Install Dokku plugins
print_status "Installing Dokku plugins..."
# Let's Encrypt plugin
if ! dokku plugin:list | grep -q letsencrypt; then
    dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
fi

# Postgres plugin (optional)
if ! dokku plugin:list | grep -q postgres; then
    dokku plugin:install https://github.com/dokku/dokku-postgres.git postgres
fi

# Create the app if it doesn't exist
print_status "Creating Dokku app 'moveglobe'..."
if ! dokku apps:exists moveglobe; then
    dokku apps:create moveglobe
    print_status "App 'moveglobe' created"
else
    print_warning "App 'moveglobe' already exists"
fi

# Set app configuration
print_status "Configuring app environment..."
dokku config:set --no-restart moveglobe NODE_ENV=production
dokku config:set --no-restart moveglobe PORT=5000

# Configure buildpacks
print_status "Setting buildpacks..."
dokku buildpacks:set moveglobe heroku/nodejs

# Set up domains (placeholder - needs to be updated with actual domain)
print_status "Setting up domains..."
# Remove default domain
dokku domains:clear-global

# Add placeholder domain (update with actual domain)
dokku domains:set moveglobe moveglobe.$(hostname -I | awk '{print $1}').nip.io

# Create swap file if not exists (helpful for small servers)
if [ ! -f /swapfile ]; then
    print_status "Creating 2GB swap file..."
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' | tee -a /etc/fstab
fi

# SSH key setup reminder
print_warning "Don't forget to add your SSH key to Dokku:"
print_warning "cat ~/.ssh/authorized_keys | dokku ssh-keys:add admin"

# Create deployment info file
cat > /root/moveglobe-deploy-info.txt << EOF
MoveGlobe Deployment Information
================================

Server IP: $(hostname -I | awk '{print $1}')
Dokku App: moveglobe
Domain: moveglobe.$(hostname -I | awk '{print $1}').nip.io

Next Steps:
1. Add your SSH key to Dokku:
   cat ~/.ssh/authorized_keys | dokku ssh-keys:add admin

2. On your local machine, add the git remote:
   git remote add dokku dokku@$(hostname -I | awk '{print $1}'):moveglobe

3. Deploy your app:
   git push dokku main

4. Set up a real domain:
   dokku domains:set moveglobe yourdomain.com
   dokku letsencrypt:set moveglobe email your-email@example.com
   dokku letsencrypt:enable moveglobe

5. Enable auto-renewal for SSL:
   dokku letsencrypt:cron-job --add

Useful Commands:
- Check app status: dokku ps:report moveglobe
- View logs: dokku logs moveglobe -t
- List config: dokku config moveglobe
- Restart app: dokku ps:restart moveglobe
EOF

print_status "Deployment script completed!"
print_status "Server information saved to: /root/moveglobe-deploy-info.txt"
cat /root/moveglobe-deploy-info.txt