# 🚀 Super Simple MoveGlobe Deployment

Deploy your app in literally 2 minutes!

## Prerequisites
- A VPS with Ubuntu (any provider)
- Your domain pointed to the VPS IP
- SSH access to your VPS

## Deploy in One Command

From your local machine (where this code is):

```bash
./deploy.sh YOUR_VPS_IP
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
- **Domain**: `workwithmove.com`
- **Email**: For SSL certificates
- **Admin password**: To access /admin panel

Everything else is automatic!

## After Deployment

Your app will be available at:
- Main site: `https://yourdomain.com`
- Admin panel: `https://yourdomain.com/admin`
- Health check: `https://yourdomain.com/api/health`

## Useful Commands (on VPS)

```bash
# View logs
cd /opt/moveglobe
docker compose -f docker-compose.simple.yml logs -f

# Restart app
docker compose -f docker-compose.simple.yml restart

# Update app (after pushing changes)
# Run deploy.sh again from your local machine
```

## That's All! 🎉

No complex configuration. No manual SSL setup. No nginx configs. Just works!