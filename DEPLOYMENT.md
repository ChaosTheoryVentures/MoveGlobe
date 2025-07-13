# MoveGlobe Deployment Guide

## Server Information
- **Server**: ubuntu-4gb-nbg1-5
- **IP**: 116.203.87.132
- **Type**: cx22 (2 vCPU, 4GB RAM)
- **Location**: Nuremberg, Germany

## Prerequisites
1. SSH access to the server (contact admin for access)
2. Domain name pointed to server IP (116.203.87.132)
3. Hetzner API token (already configured in Codespace secrets)

## Server Setup Instructions

### 1. Connect to Server
```bash
ssh root@116.203.87.132
```

### 2. Run Initial Setup Script
```bash
# Update system
apt-get update && apt-get upgrade -y

# Install required packages
apt-get install -y \
    curl \
    wget \
    git \
    ufw \
    fail2ban \
    nginx \
    certbot \
    python3-certbot-nginx \
    docker.io \
    docker-compose
```

### 3. Install Dokku
```bash
# Add Dokku repository
wget -qO- https://packagecloud.io/dokku/dokku/gpgkey | apt-key add -
echo "deb https://packagecloud.io/dokku/dokku/ubuntu/ focal main" > /etc/apt/sources.list.d/dokku.list
apt-get update

# Install Dokku
DOKKU_TAG=v0.34.8 apt-get install -y dokku

# Configure Dokku
dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
dokku plugin:install https://github.com/dokku/dokku-postgres.git
```

### 4. Configure Security

#### Firewall Rules
```bash
# Enable UFW firewall
ufw --force enable
ufw allow ssh
ufw allow http
ufw allow https
ufw allow 2222/tcp  # Dokku SSH
ufw status
```

#### Fail2ban Configuration
```bash
# Enable fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# Create custom jail for SSH
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

systemctl restart fail2ban
```

### 5. Create Dokku Application
```bash
# Create app
dokku apps:create moveglobe

# Set environment variables
dokku config:set moveglobe NODE_ENV=production
dokku config:set moveglobe PORT=5000

# Configure domains (replace with your actual domain)
dokku domains:add moveglobe moveglobe.yourdomain.com
dokku domains:add moveglobe www.moveglobe.yourdomain.com
```

### 6. Database Setup (if needed)
```bash
# Create PostgreSQL database
dokku postgres:create moveglobe-db
dokku postgres:link moveglobe-db moveglobe
```

### 7. SSL/TLS Configuration
```bash
# Set email for Let's Encrypt
dokku letsencrypt:set moveglobe email your-email@example.com

# Enable auto-renewal
dokku letsencrypt:enable moveglobe
dokku letsencrypt:cron-job --add
```

## Local Deployment Steps

### 1. Add Dokku Remote
```bash
# In your local MoveGlobe directory
git remote add dokku dokku@116.203.87.132:moveglobe
```

### 2. Configure SSH Key
```bash
# Copy your SSH public key to the server
cat ~/.ssh/id_rsa.pub | ssh root@116.203.87.132 "dokku ssh-keys:add admin"
```

### 3. Deploy Application
```bash
# Deploy to Dokku
git push dokku main

# Or if you're on a different branch
git push dokku yourbranch:main
```

## Post-Deployment

### Check Application Status
```bash
# On the server
dokku ps:report moveglobe
dokku logs moveglobe
```

### Scale Application (if needed)
```bash
dokku ps:scale moveglobe web=1
```

### Monitoring
```bash
# Check nginx logs
dokku nginx:access-logs moveglobe
dokku nginx:error-logs moveglobe

# Check app logs
dokku logs moveglobe -t
```

## Troubleshooting

### If deployment fails:
1. Check build logs: `dokku logs moveglobe`
2. Check app status: `dokku ps:report moveglobe`
3. Rebuild cache: `dokku repo:purge-cache moveglobe`

### If SSL fails:
1. Check DNS is properly configured
2. Ensure ports 80 and 443 are open
3. Run: `dokku letsencrypt:enable moveglobe`

### If app crashes:
1. Check environment variables: `dokku config moveglobe`
2. Check resource limits: `dokku resource:report moveglobe`
3. Review app logs: `dokku logs moveglobe -t`

## Security Best Practices
1. Regularly update system packages
2. Monitor fail2ban logs: `fail2ban-client status sshd`
3. Review nginx access logs for suspicious activity
4. Keep Dokku and plugins updated
5. Use strong SSH keys and disable password authentication
6. Implement rate limiting in nginx

## Backup Strategy
```bash
# Backup database (if using)
dokku postgres:export moveglobe-db > backup-$(date +%Y%m%d).sql

# Backup app config
dokku config moveglobe > config-backup.txt
```