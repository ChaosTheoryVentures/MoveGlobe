# MoveGlobe Deployment Instructions

## Current Situation

Your Hetzner server is configured with:
- **IP**: 116.203.87.132
- **Firewall**: ✅ Configured and active (ports 22, 80, 443, 2222, 5000)
- **SSH Access**: Requires the "erik" SSH key (ID: 30089070)

## Option 1: If you have SSH access (with the erik key)

Run this from your local machine or any machine with the erik SSH key:

```bash
# Make the script executable
chmod +x deploy_locally.sh

# Run the deployment setup
./deploy_locally.sh

# After setup completes, deploy your app
git push dokku main
```

## Option 2: Manual deployment steps

1. **SSH into your server** (requires erik SSH key):
   ```bash
   ssh root@116.203.87.132
   ```

2. **Run these commands on the server**:
   ```bash
   # Update system
   apt-get update && apt-get upgrade -y

   # Install Dokku
   wget -qO- https://packagecloud.io/dokku/dokku/gpgkey | apt-key add -
   echo "deb https://packagecloud.io/dokku/dokku/ubuntu/ focal main" > /etc/apt/sources.list.d/dokku.list
   apt-get update
   DOKKU_TAG=v0.34.8 apt-get install -y dokku

   # Install plugins
   dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git

   # Create app
   dokku apps:create moveglobe

   # Set environment
   dokku config:set moveglobe NODE_ENV=production PORT=5000
   ```

3. **Add your SSH key to Dokku** (from the server):
   ```bash
   # Add your public key
   echo "YOUR_PUBLIC_SSH_KEY" | dokku ssh-keys:add admin
   ```

4. **From your local machine**, add git remote and deploy:
   ```bash
   cd /workspaces/MoveGlobe
   git remote add dokku dokku@116.203.87.132:moveglobe
   git push dokku main
   ```

## Option 3: Add deployment key to server

If you want to use the deployment key we created:

1. **From a machine with erik SSH key**, add the deployment key:
   ```bash
   ssh root@116.203.87.132 'echo "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKvrsJK8dTAgqgZ63mPWwy3AoVRKUdTfLm0uI32krNHZ moveglobe-deploy" >> ~/.ssh/authorized_keys'
   ```

2. Then you can use the deployment key:
   ```bash
   ssh -i ~/.ssh/hetzner_deploy root@116.203.87.132
   ```

## Important Notes

- The server firewall is already configured and active
- The server has 4GB RAM and 2 vCPUs (suitable for Node.js apps)
- Dokku will handle nginx configuration automatically
- SSL can be enabled after deployment with Let's Encrypt

## After Deployment

Access your app at:
- Temporary: http://moveglobe.116.203.87.132.nip.io
- With domain: http://yourdomain.com (after DNS configuration)

## Need Help?

The complete deployment script is in `deploy_on_server.sh` which includes:
- System updates
- Dokku installation
- Security configuration (fail2ban, ufw)
- App creation and configuration