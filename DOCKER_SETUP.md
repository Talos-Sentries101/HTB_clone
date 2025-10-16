# CyberLearn Docker Setup Guide

This guide will help you set up the Parrot OS Docker integration for the CyberLearn platform.

## Architecture Overview

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   React Web App │ ◄─────► │ Docker Bridge    │ ◄─────► │ Docker Daemon   │
│  (Port 8080)    │  HTTP   │   Server         │  Socket │ (Parrot OS)     │
│                 │         │  (Port 3001)     │         │                 │
└─────────────────┘         └──────────────────┘         └─────────────────┘
```

**Why do we need the bridge server?**
Web browsers cannot directly communicate with Docker due to security restrictions. The bridge server acts as a middleware that:
1. Receives HTTP requests from your web app
2. Translates them to Docker API calls
3. Manages container lifecycle
4. Returns container information to the web app

## Prerequisites

✅ **Docker Desktop** (Windows/Mac) or **Docker Engine** (Linux)
✅ **Node.js** (v14 or higher)
✅ **npm** or **yarn**

## Step 1: Install Docker

### Windows/Mac
Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Linux
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```
Log out and back in for group changes to take effect.

### Verify Docker Installation
```bash
docker --version
docker ps
```

## Step 2: Build the Parrot OS Docker Image

From the project root directory:

```bash
# Option 1: Build from Dockerfile (recommended for customization)
docker build -t parrotsec/security:latest -f Dockerfile .

# Option 2: Pull official Parrot OS image
docker pull parrotsec/security:latest
```

Building may take 5-10 minutes depending on your internet connection.

### Verify the Image
```bash
docker images | grep parrot
```

You should see `parrotsec/security` in the list.

## Step 3: Set Up the Docker Bridge Server

1. Navigate to the bridge directory:
   ```bash
   cd docker-bridge
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the bridge server:
   ```bash
   npm start
   ```

You should see:
```
============================================================
🐳 Docker Bridge Server Running
============================================================
Server:     http://localhost:3001
Health:     http://localhost:3001/api/health
============================================================

✅ Ready to accept container requests from the web app
```

**Keep this terminal open** - the bridge server needs to run while you use the app.

## Step 4: Start the React Application

In a **new terminal window**, from the project root:

```bash
npm install    # First time only
npm run dev
```

The app will open at `http://localhost:8080`

## Step 5: Test the Integration

1. Open the app at `http://localhost:8080`
2. Navigate to the **Dashboard** page
3. Click the **"Spawn Environment"** button
4. You should see:
   - A loading spinner while the container spawns
   - "Active" status with a green indicator
   - Instance ID and Target IP displayed
   - A terminal interface showing Parrot OS

5. Test the controls:
   - **Reset**: Restarts the container
   - **Full Screen**: Opens terminal in full screen (UI only)
   - **Terminate**: Stops and removes the container

## Troubleshooting

### ❌ "Failed to spawn environment. Make sure Docker bridge is running on port 3001"

**Solution:**
- Make sure the Docker bridge server is running (`npm start` in `docker-bridge/`)
- Check that Docker Desktop/Engine is running
- Verify no other service is using port 3001

### ❌ "Cannot connect to Docker daemon"

**Solution:**
- Start Docker Desktop (Windows/Mac)
- Or start Docker service: `sudo systemctl start docker` (Linux)
- On Linux, ensure your user is in the docker group: `sudo usermod -aG docker $USER`

### ❌ "Image not found: parrotsec/security:latest"

**Solution:**
```bash
docker pull parrotsec/security:latest
# OR
docker build -t parrotsec/security:latest -f Dockerfile .
```

### ❌ CORS Errors in Browser Console

**Solution:**
- Make sure the bridge server is running on port 3001
- The bridge server has CORS enabled for all origins during development

### ❌ Container spawns but doesn't respond

**Solution:**
- Check container logs: `docker logs <container-id>`
- Restart Docker Desktop/Engine
- Try rebuilding the image

## Development Workflow

### Daily Use

1. **Terminal 1**: Start Docker bridge
   ```bash
   cd docker-bridge
   npm start
   ```

2. **Terminal 2**: Start React app
   ```bash
   npm run dev
   ```

3. Use the app at `http://localhost:8080`

### Clean Up Containers

View running containers:
```bash
docker ps
```

Stop all Parrot OS containers:
```bash
docker ps -a | grep parrot | awk '{print $1}' | xargs docker stop
```

Remove all stopped containers:
```bash
docker container prune -f
```

## Production Deployment

⚠️ **Important**: This setup is for **local development only**. 

For production deployment, you need:
1. A proper backend server (not just a local bridge)
2. Authentication and authorization
3. Container orchestration (Kubernetes, Docker Swarm)
4. Resource limits and quotas per user
5. Network isolation between containers
6. Proper security policies

The current bridge server **should never be exposed to the internet** as it provides unrestricted Docker access.

## Container Management

### View Active Containers
```bash
# From command line
docker ps

# From API
curl http://localhost:3001/api/docker/containers
```

### Manual Container Control
```bash
# Stop a container
docker stop <container-id>

# Remove a container
docker rm <container-id>

# View container logs
docker logs <container-id>

# Execute command in container
docker exec -it <container-id> /bin/bash
```

## Customizing the Parrot OS Environment

Edit the `Dockerfile` to add more tools:

```dockerfile
RUN apt-get update && apt-get install -y \
    your-tool-here \
    another-tool \
    && rm -rf /var/lib/apt/lists/*
```

Then rebuild:
```bash
docker build -t parrotsec/security:latest -f Dockerfile .
```

## Need Help?

- Check Docker logs: `docker logs <container-id>`
- Check bridge server logs in the terminal
- Check browser console for errors (F12)
- Verify Docker is running: `docker ps`
- Test bridge health: `curl http://localhost:3001/api/health`
