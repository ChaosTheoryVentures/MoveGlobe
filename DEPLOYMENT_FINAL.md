# MoveGlobe Deployment - Final Steps

## ✅ Infrastructure Setup Complete

### What has been done:
1. **SSH Key Added**: `moveglobe-deploy` (ID: 100240779) - Added to Hetzner account
2. **Firewall Created**: `moveglobe-firewall` (ID: 2275594) - Applied to server with rules:
   - SSH (port 22)
   - HTTP (port 80)
   - HTTPS (port 443)
   - Dokku SSH (port 2222)
   - Node.js App (port 5000)

### Server Details:
- **Name**: ubuntu-4gb-nbg1-5
- **IP**: 116.203.87.132
- **Type**: cx22 (2 vCPU, 4GB RAM)
- **Location**: Nuremberg, Germany (nbg1-dc3)

## 🚀 Deployment Steps

### Step 1: Copy deployment script to server
```bash
# From your local machine (this codespace)
scp -i ~/.ssh/hetzner_deploy deploy_on_server.sh root@116.203.87.132:/root/
```

### Step 2: SSH into the server
```bash
ssh -i ~/.ssh/hetzner_deploy root@116.203.87.132
```

### Step 3: Run the deployment script
```bash
# On the server
chmod +x /root/deploy_on_server.sh
/root/deploy_on_server.sh
```

### Step 4: Add your SSH key to Dokku
```bash
# On the server
cat ~/.ssh/authorized_keys | dokku ssh-keys:add admin
```

### Step 5: Add Dokku git remote (from your local machine)
```bash
# Back in your codespace
cd /workspaces/MoveGlobe
git remote add dokku dokku@116.203.87.132:moveglobe
```

### Step 6: Deploy the application
```bash
# From your codespace
git push dokku main
```

## 📝 Post-Deployment Configuration

### Configure a real domain (after DNS setup):
```bash
# On the server
dokku domains:set moveglobe yourdomain.com
dokku domains:set moveglobe www.yourdomain.com
```

### Enable SSL with Let's Encrypt:
```bash
# On the server
dokku letsencrypt:set moveglobe email your-email@example.com
dokku letsencrypt:enable moveglobe
dokku letsencrypt:cron-job --add
```

### Database setup (if needed):
```bash
# On the server
dokku postgres:create moveglobe-db
dokku postgres:link moveglobe-db moveglobe
```

## 🔍 Monitoring Commands

```bash
# Check app status
dokku ps:report moveglobe

# View logs
dokku logs moveglobe -t

# Check configuration
dokku config moveglobe

# Restart app
dokku ps:restart moveglobe
```

## 🔐 Security Notes

- Firewall is configured and active
- fail2ban will be installed by the script
- SSL/TLS will be enabled after domain configuration
- Regular system updates are recommended

## 📱 Temporary Access

Until you configure a domain, the app will be accessible at:
- http://moveglobe.116.203.87.132.nip.io (after deployment)