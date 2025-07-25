# MoveGlobe Production Deployment Guide

This guide provides step-by-step instructions for deploying MoveGlobe to a production VPS with full HTTPS support, security hardening, and automated SSL certificate renewal.

## Prerequisites

- A VPS with Ubuntu 22.04 LTS (minimum 2GB RAM, 2 CPU cores)
- A domain name pointing to your VPS IP address
- SSH access to your VPS
- Basic knowledge of Linux command line

## Security Features Implemented

- ✅ HTTPS with Let's Encrypt SSL certificates (auto-renewal)
- ✅ NGINX reverse proxy with security headers
- ✅ Rate limiting for API and authentication endpoints
- ✅ DDoS protection
- ✅ HSTS (HTTP Strict Transport Security)
- ✅ CSP (Content Security Policy)
- ✅ Secure session management with Redis
- ✅ Bcrypt password hashing
- ✅ CORS protection
- ✅ Helmet.js security headers
- ✅ SQL injection protection (via ORM)
- ✅ XSS protection
- ✅ Non-root Docker containers
- ✅ Automated database backups
- ✅ Health checks and auto-restart

## Step-by-Step Deployment

### 1. Rent a VPS

Recommended providers:
- DigitalOcean
- Linode
- Vultr
- Hetzner Cloud

Create an Ubuntu 22.04 LTS instance with at least:
- 2GB RAM
- 2 CPU cores
- 50GB SSD storage

### 2. Initial Server Setup

```bash
# Connect to your VPS
ssh root@your-server-ip

# Update system packages
apt update && apt upgrade -y

# Install required packages
apt install -y curl git vim ufw fail2ban

# Create a non-root user
adduser moveglobe
usermod -aG sudo moveglobe

# Set up SSH key authentication (from your local machine)
ssh-copy-id moveglobe@your-server-ip

# Disable root login and password authentication
vim /etc/ssh/sshd_config
# Set: PermitRootLogin no
# Set: PasswordAuthentication no
systemctl restart sshd
```

### 3. Configure Firewall

```bash
# Set up UFW firewall
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# Configure fail2ban
systemctl enable fail2ban
systemctl start fail2ban
```

### 4. Install Docker

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker moveglobe

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version

# Log out and back in for group changes
exit
ssh moveglobe@your-server-ip
```

### 5. Clone and Configure Project

```bash
# Clone the repository
git clone https://github.com/your-username/moveglobe.git
cd moveglobe

# Create production .env file
cp .env.prod.example .env
vim .env

# Configure the following in .env:
# - DOMAIN_NAME=yourdomain.com
# - EMAIL=your-email@example.com
# - SESSION_SECRET (generate with: openssl rand -base64 32)
# - ADMIN_PASSWORD_HASH (generate with: npm run hash-password yourpassword)
# - DATABASE_URL (your Neon/Supabase URL or local postgres)
# - REDIS_PASSWORD (generate with: openssl rand -base64 32)
# - Other optional settings
```

### 6. Generate Password Hash

```bash
# Install Node.js locally to generate password hash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install dependencies
npm install

# Generate admin password hash
npm run hash-password your-secure-admin-password
# Copy the hash to your .env file as ADMIN_PASSWORD_HASH
```

### 7. Initialize SSL Certificates

```bash
# Make sure your domain is pointing to the server IP
# You can verify with: dig yourdomain.com

# Initialize SSL certificates
chmod +x scripts/init-ssl.sh
DOMAIN_NAME=yourdomain.com EMAIL=your-email@example.com ./scripts/init-ssl.sh
```

### 8. Deploy Application

```bash
# Build and start all services
docker-compose -f docker-compose.prod.yml up -d --build

# Check service status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Check health
curl https://yourdomain.com/api/health
```

### 9. Set Up DNS

In your domain registrar or DNS provider:

1. Create an A record:
   - Host: @ (or leave blank)
   - Value: your-server-ip
   - TTL: 3600

2. Create a www subdomain:
   - Host: www
   - Value: your-server-ip
   - TTL: 3600

3. Wait for DNS propagation (5-30 minutes)

### 10. Verify Deployment

1. Visit https://yourdomain.com - should show your app
2. Check HTTPS certificate - should show Let's Encrypt
3. Visit https://yourdomain.com/admin - should require login
4. Test API: https://yourdomain.com/api/health
5. Check security headers: https://securityheaders.com/?q=yourdomain.com

## Maintenance

### View Logs

```bash
# All services
docker-compose -f docker-compose.prod.yml logs -f

# Specific service
docker-compose -f docker-compose.prod.yml logs -f app
docker-compose -f docker-compose.prod.yml logs -f nginx
```

### Update Application

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose -f docker-compose.prod.yml up -d --build

# Or restart without rebuild
docker-compose -f docker-compose.prod.yml restart
```

### Backup Database

Backups are automatically created daily and stored in `./backups/`. To create manual backup:

```bash
# Manual backup
docker-compose -f docker-compose.prod.yml exec postgres pg_dump -U moveglobe moveglobe > backup_$(date +%Y%m%d_%H%M%S).sql
```

### SSL Certificate Renewal

Certificates are automatically renewed by Certbot. To manually renew:

```bash
docker-compose -f docker-compose.prod.yml exec certbot certbot renew
docker-compose -f docker-compose.prod.yml restart nginx
```

### Monitor Services

```bash
# Check service health
docker-compose -f docker-compose.prod.yml ps

# Check resource usage
docker stats

# Check disk space
df -h

# Check memory
free -h
```

## Security Checklist

- [ ] SSH key authentication only (no passwords)
- [ ] Firewall configured (UFW)
- [ ] Fail2ban installed and running
- [ ] HTTPS enforced with valid certificate
- [ ] Strong admin password with bcrypt hash
- [ ] Environment variables secured
- [ ] Database credentials secured
- [ ] Redis password set
- [ ] Regular backups configured
- [ ] Monitoring in place
- [ ] Rate limiting active
- [ ] Security headers verified

## Troubleshooting

### SSL Certificate Issues

```bash
# Check Certbot logs
docker-compose -f docker-compose.prod.yml logs certbot

# Manually request certificate
docker-compose -f docker-compose.prod.yml run --rm certbot certonly --webroot --webroot-path=/var/www/certbot -d yourdomain.com
```

### Application Not Starting

```bash
# Check app logs
docker-compose -f docker-compose.prod.yml logs app

# Check environment variables
docker-compose -f docker-compose.prod.yml exec app env

# Restart services
docker-compose -f docker-compose.prod.yml restart
```

### Database Connection Issues

```bash
# Test database connection
docker-compose -f docker-compose.prod.yml exec postgres psql -U moveglobe -d moveglobe

# Check database logs
docker-compose -f docker-compose.prod.yml logs postgres
```

### Performance Issues

```bash
# Check resource usage
docker stats
htop

# Check NGINX logs
docker-compose -f docker-compose.prod.yml exec nginx tail -f /var/log/nginx/access.log
```

## Additional Security Hardening (Optional)

### 1. Set up Cloudflare

- Use Cloudflare as CDN and DDoS protection
- Enable "Full (strict)" SSL mode
- Set up firewall rules
- Enable rate limiting

### 2. Install Security Tools

```bash
# Install security scanning tools
apt install -y rkhunter lynis

# Run security audit
lynis audit system
```

### 3. Set up Monitoring

- Install Prometheus + Grafana
- Set up Uptime monitoring (UptimeRobot, Pingdom)
- Configure log aggregation (ELK stack, Datadog)
- Set up alerts for downtime

### 4. Regular Updates

```bash
# Create update script
cat > /home/moveglobe/update.sh << 'EOF'
#!/bin/bash
apt update
apt upgrade -y
docker system prune -a -f
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
EOF

chmod +x /home/moveglobe/update.sh

# Add to crontab for weekly updates
crontab -e
# Add: 0 3 * * 0 /home/moveglobe/update.sh
```

## Support

For issues or questions:
- Check logs: `docker-compose -f docker-compose.prod.yml logs`
- Review this guide
- Check GitHub issues
- Contact support

Remember to keep your server and application updated regularly for security!