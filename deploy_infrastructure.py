#!/usr/bin/env python3
"""
Infrastructure setup for MoveGlobe deployment using Hetzner Cloud API
"""

import os
import sys
from hcloud import Client
from hcloud.firewalls.domain import FirewallRule

# Initialize Hetzner client
HCLOUD_TOKEN = os.environ.get('HETZNER_API_TOKEN')
if not HCLOUD_TOKEN:
    print("Error: HETZNER_API_TOKEN environment variable not set")
    sys.exit(1)

client = Client(token=HCLOUD_TOKEN)

# Server details
SERVER_ID = 66631999
SERVER_IP = "116.203.87.132"

def setup_ssh_key():
    """Add deployment SSH key to Hetzner"""
    print("Setting up SSH key...")
    
    # Read the public key
    with open(os.path.expanduser("~/.ssh/hetzner_deploy.pub"), "r") as f:
        public_key = f.read().strip()
    
    # Check if key already exists
    ssh_keys = client.ssh_keys.get_all()
    for key in ssh_keys:
        if key.public_key.strip() == public_key:
            print(f"SSH key already exists: {key.name} (ID: {key.id})")
            return key
    
    # Create new SSH key
    try:
        ssh_key = client.ssh_keys.create(
            name="moveglobe-deploy",
            public_key=public_key
        )
        print(f"Created SSH key: {ssh_key.name} (ID: {ssh_key.id})")
        return ssh_key
    except Exception as e:
        print(f"Error creating SSH key: {e}")
        return None

def setup_firewall():
    """Create and configure firewall for web server"""
    print("\nSetting up firewall...")
    
    # Check if firewall already exists
    firewalls = client.firewalls.get_all()
    for fw in firewalls:
        if fw.name == "moveglobe-firewall":
            print(f"Firewall already exists: {fw.name} (ID: {fw.id})")
            return fw
    
    # Define firewall rules
    rules = [
        # Allow SSH
        FirewallRule(
            direction="in",
            protocol="tcp",
            source_ips=["0.0.0.0/0", "::/0"],
            port="22"
        ),
        # Allow HTTP
        FirewallRule(
            direction="in",
            protocol="tcp",
            source_ips=["0.0.0.0/0", "::/0"],
            port="80"
        ),
        # Allow HTTPS
        FirewallRule(
            direction="in",
            protocol="tcp",
            source_ips=["0.0.0.0/0", "::/0"],
            port="443"
        ),
        # Allow Dokku SSH (port 2222)
        FirewallRule(
            direction="in",
            protocol="tcp",
            source_ips=["0.0.0.0/0", "::/0"],
            port="2222"
        ),
        # Allow Node.js app port (5000)
        FirewallRule(
            direction="in",
            protocol="tcp",
            source_ips=["0.0.0.0/0", "::/0"],
            port="5000"
        )
    ]
    
    try:
        # Create firewall
        response = client.firewalls.create(
            name="moveglobe-firewall",
            rules=rules
        )
        firewall = response.firewall
        print(f"Created firewall: {firewall.name} (ID: {firewall.id})")
        return firewall
    except Exception as e:
        print(f"Error creating firewall: {e}")
        return None

def apply_firewall_to_server(firewall):
    """Apply firewall to the server"""
    print(f"\nApplying firewall to server {SERVER_ID}...")
    
    try:
        # Get the server
        server = client.servers.get_by_id(SERVER_ID)
        if not server:
            print(f"Server {SERVER_ID} not found")
            return False
        
        # Apply firewall using the action
        action = client.firewalls.apply_to_resources(
            firewall,
            resources=[{"type": "server", "server": server}]
        )
        print(f"Firewall applied to server: {server.name}")
        return True
    except Exception as e:
        print(f"Error applying firewall: {e}")
        return False

def get_server_info():
    """Get current server information"""
    print(f"\nGetting server information...")
    
    try:
        server = client.servers.get_by_id(SERVER_ID)
        if server:
            print(f"Server: {server.name}")
            print(f"  ID: {server.id}")
            print(f"  Status: {server.status}")
            print(f"  IP: {server.public_net.ipv4.ip if server.public_net.ipv4 else 'No IPv4'}")
            print(f"  Type: {server.server_type.name}")
            print(f"  Datacenter: {server.datacenter.name}")
            
            # Check applied firewalls
            firewalls = client.firewalls.get_all()
            applied_firewalls = []
            for fw in firewalls:
                if fw.applied_to:
                    for resource in fw.applied_to:
                        if resource.type == "server" and resource.server.id == server.id:
                            applied_firewalls.append(fw.name)
            
            if applied_firewalls:
                print(f"  Firewalls: {', '.join(applied_firewalls)}")
            else:
                print("  Firewalls: None")
            
            return server
        else:
            print(f"Server {SERVER_ID} not found")
            return None
    except Exception as e:
        print(f"Error getting server info: {e}")
        return None

def main():
    """Main setup function"""
    print("=== MoveGlobe Infrastructure Setup ===\n")
    
    # Get server info
    server = get_server_info()
    if not server:
        print("\nError: Could not get server information")
        sys.exit(1)
    
    # Setup SSH key
    ssh_key = setup_ssh_key()
    
    # Setup firewall
    firewall = setup_firewall()
    
    # Apply firewall if created
    if firewall:
        apply_firewall_to_server(firewall)
    
    print("\n=== Infrastructure Setup Complete ===")
    print(f"\nNext steps:")
    print(f"1. SSH into the server: ssh -i ~/.ssh/hetzner_deploy root@{SERVER_IP}")
    print(f"2. Run the deployment script on the server")
    print(f"3. Configure your domain to point to {SERVER_IP}")

if __name__ == "__main__":
    main()