#!/usr/bin/env python3
"""Apply firewall to server using Hetzner API"""

import os
from hcloud import Client

# Initialize client
client = Client(token=os.environ.get('HETZNER_API_TOKEN'))

# Get the firewall
firewall = None
for fw in client.firewalls.get_all():
    if fw.name == 'moveglobe-firewall':
        firewall = fw
        break

if not firewall:
    print("Firewall not found")
    exit(1)

# Get the server
server = client.servers.get_by_id(66631999)
if not server:
    print("Server not found")
    exit(1)

# Apply firewall using the API directly
try:
    # Use the action endpoint directly
    action = firewall.apply_to_resources(
        resources=[{"type": "server", "server": {"id": server.id}}]
    )
    print(f"Firewall {firewall.name} applied to server {server.name}")
    print(f"Action: {action}")
except Exception as e:
    print(f"Error: {e}")
    # Try alternative method
    try:
        from hcloud.firewalls.domain import FirewallResource
        resource = FirewallResource(type="server", server=server)
        action = client.firewalls.apply_to_resources(firewall, [resource])
        print(f"Applied using alternative method")
    except Exception as e2:
        print(f"Alternative method also failed: {e2}")