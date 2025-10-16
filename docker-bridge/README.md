# Docker Bridge Server

This is a local API server that bridges your React web application with the Docker daemon to spawn Parrot OS containers.

## Prerequisites

1. **Docker Desktop** or **Docker Engine** installed and running
2. **Node.js** (v14 or higher) installed

## Installation

1. Navigate to this directory:
   ```bash
   cd docker-bridge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Bridge Server

Start the server with:
```bash
npm start
```

The server will run on `http://localhost:3001`

You should see output like:
```
============================================================
🐳 Docker Bridge Server Running
============================================================
Server:     http://localhost:3001
Health:     http://localhost:3001/api/health
============================================================

✅ Ready to accept container requests from the web app
📝 Make sure Docker daemon is running
```

## How It Works

1. The React app sends requests to `http://localhost:3001/api/docker/*`
2. The bridge server communicates with Docker daemon
3. Docker spawns/manages Parrot OS containers
4. Container info is sent back to the React app

## API Endpoints

- `POST /api/docker/spawn` - Spawn a new Parrot OS container
- `POST /api/docker/terminate` - Stop and remove a container
- `POST /api/docker/reset` - Restart a container
- `GET /api/docker/containers` - List all active containers
- `GET /api/health` - Check if the server is running

## Building the Parrot OS Image

Before spawning containers, you need to build the Docker image:

```bash
# From the project root directory
docker build -t parrotsec/security:latest -f Dockerfile .
```

Or pull the official image:
```bash
docker pull parrotsec/security:latest
```

## Usage Flow

1. Start the bridge server: `npm start`
2. Start your React app: `npm run dev` (from project root)
3. Click "Spawn Environment" in the web app
4. The bridge server creates a Docker container
5. Container info is displayed in the UI

## Troubleshooting

**Error: Cannot connect to Docker daemon**
- Make sure Docker Desktop/Engine is running
- On Linux, you might need: `sudo usermod -aG docker $USER` (then log out/in)

**Error: CORS issues**
- Make sure the bridge server is running on port 3001
- Check that your React app is making requests to `http://localhost:3001`

**Error: Image not found**
- Build the Dockerfile: `docker build -t parrotsec/security:latest -f Dockerfile .`
- Or pull the official image: `docker pull parrotsec/security:latest`

## Security Notes

⚠️ This bridge server is meant for **local development only**. Do not expose it to the internet as it provides direct access to your Docker daemon.
