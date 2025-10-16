# Dockerfile for Parrot OS Security Environment
FROM parrotsec/security:latest

# Set working directory
WORKDIR /root

# Update and install additional tools
RUN apt-get update && apt-get install -y \
    nmap \
    metasploit-framework \
    burpsuite \
    wireshark \
    john \
    hashcat \
    aircrack-ng \
    sqlmap \
    nikto \
    hydra \
    net-tools \
    iputils-ping \
    curl \
    wget \
    vim \
    git \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive
ENV TERM=xterm-256color

# Expose common ports
EXPOSE 22 80 443 4444 8080

# Keep container running
CMD ["/bin/bash"]
