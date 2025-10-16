import { useState } from 'react';
import { Terminal, Power, RefreshCw, Maximize2 } from 'lucide-react';
import { toast } from 'sonner';

interface PwnBoxProps {
  challengeId: string;
  challengeTitle: string;
}

interface ContainerInfo {
  containerId: string;
  instanceId: string;
  targetIp: string;
}

export function PwnBox({ challengeId }: PwnBoxProps) {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [containerInfo, setContainerInfo] = useState<ContainerInfo | null>(null);

  const handleSpawn = async () => {
    setIsLoading(true);
    
    try {
      // Call local Docker API bridge
      const response = await fetch('http://localhost:3001/api/docker/spawn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          challengeId,
          image: 'parrotsec/security:latest'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to spawn container');
      }

      const data = await response.json();
      setContainerInfo({
        containerId: data.containerId,
        instanceId: `pwn-${challengeId}-${Date.now()}`,
        targetIp: data.ipAddress || '192.168.1.100'
      });
      setIsActive(true);
      toast.success('Parrot OS environment spawned successfully!');
    } catch (error) {
      console.error('Error spawning container:', error);
      toast.error('Failed to spawn environment. Make sure Docker bridge is running on port 3001.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTerminate = async () => {
    if (!containerInfo) return;
    
    setIsLoading(true);
    try {
      await fetch('http://localhost:3001/api/docker/terminate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          containerId: containerInfo.containerId
        }),
      });
      
      setIsActive(false);
      setContainerInfo(null);
      toast.success('Environment terminated successfully!');
    } catch (error) {
      console.error('Error terminating container:', error);
      toast.error('Failed to terminate environment');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    if (!containerInfo) return;
    
    setIsLoading(true);
    try {
      await fetch('http://localhost:3001/api/docker/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          containerId: containerInfo.containerId
        }),
      });
      toast.success('Environment reset successfully!');
    } catch (error) {
      console.error('Error resetting container:', error);
      toast.error('Failed to reset environment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Terminal className="w-6 h-6 text-red-500" />
          <div>
            <h3 className="text-white font-semibold">Parrot OS Environment</h3>
            <p className="text-gray-400 text-sm">Linux Penetration Testing Distribution</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isActive && (
            <span className="flex items-center gap-2 text-green-500 text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Active
            </span>
          )}
        </div>
      </div>

      {!isActive ? (
        <div className="text-center py-12">
          <div className="mb-4">
            <div className="w-20 h-20 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Terminal className="w-10 h-10 text-gray-600" />
            </div>
            <h4 className="text-white font-medium mb-2">No Active Environment</h4>
            <p className="text-gray-400 text-sm mb-6">
              Spawn a Parrot OS instance to start practicing
            </p>
          </div>
          <button
            onClick={handleSpawn}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Spawning Instance...
              </>
            ) : (
              <>
                <Power className="w-5 h-5" />
                Spawn Environment
              </>
            )}
          </button>
        </div>
      ) : (
        <div>
          <div className="bg-black rounded-lg p-4 mb-4 border border-gray-800">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-gray-400 text-sm ml-2">root@parrot:~#</span>
            </div>
            <div className="font-mono text-sm text-green-400 space-y-1">
              <p>Parrot Security 5.3 (Electro Ara) [TTY1]</p>
              <p className="text-gray-500">Last login: {new Date().toLocaleString()}</p>
              <p className="mt-4 text-white">
                root@parrot:~# <span className="animate-pulse">_</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-800 rounded-lg p-3">
              <p className="text-gray-400 text-xs mb-1">Instance ID</p>
              <p className="text-white font-mono text-sm">{containerInfo?.instanceId}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-3">
              <p className="text-gray-400 text-xs mb-1">Target IP</p>
              <p className="text-white font-mono text-sm">{containerInfo?.targetIp}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleReset}
              disabled={isLoading}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Reset
            </button>
            <button
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Maximize2 className="w-4 h-4" />
              Full Screen
            </button>
            <button
              onClick={handleTerminate}
              disabled={isLoading}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Power className="w-4 h-4" />
              Terminate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
