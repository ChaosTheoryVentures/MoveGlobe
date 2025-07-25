# 🚀 Super Simple MoveGlobe Deployment

Deploy your app in literally 5 minutes!

## Prerequisites
- A VPS with Ubuntu (any provider)
- Your domain pointed to the VPS IP
- SSH access to your VPS

## Step-by-Step Deployment

### 1. Extract Your Code
```bash
# If you have a .zip file
unzip moveglobe.zip
cd moveglobe  # or whatever folder it extracted to
```

### 2. Deploy with One Command
From inside the MoveGlobe folder (where you can see package.json):
```bash
./deploy.sh YOUR_VPS_IP
```

Example:
```bash
./deploy.sh 192.168.1.100
```

That's it! The script will:
1. Upload your code
2. Install Docker
3. Ask for your domain, email, and admin password
4. Auto-generate all other passwords
5. Get SSL certificates automatically
6. Start everything

## What You'll Be Asked

During deployment, you'll only need to provide:
- **Domain**: `workwithmove.com` (or your domain)
- **Email**: For SSL certificates
- **Admin password**: To access /admin panel

Everything else is automatic!

## After Deployment

Your app will be available at:
- Main site: `https://yourdomain.com`
- Admin panel: `https://yourdomain.com/admin`
- Health check: `https://yourdomain.com/api/health`

## Troubleshooting

**"Permission denied" error?**
```bash
chmod +x deploy.sh
./deploy.sh YOUR_VPS_IP
```

**"Command not found" error?**
Make sure you're in the MoveGlobe directory:
```bash
ls  # Should show package.json, deploy.sh, etc.
```

**SSH connection failed?**
```bash
# Test SSH first
ssh root@YOUR_VPS_IP

# If using non-root user
./deploy.sh YOUR_VPS_IP username
```

## Useful Commands (on VPS)

After deployment, if you SSH into your VPS:
```bash
# View logs
cd /opt/moveglobe
docker compose -f docker-compose.simple.yml logs -f

# Restart app
docker compose -f docker-compose.simple.yml restart

# Stop app
docker compose -f docker-compose.simple.yml down

# Start app
docker compose -f docker-compose.simple.yml up -d
```

## Update Your App

To deploy updates:
1. Make changes to your code
2. Run `./deploy.sh YOUR_VPS_IP` again
3. It will update everything automatically

## That's All! 🎉

No complex configuration. No manual SSL setup. No nginx configs. Just works!