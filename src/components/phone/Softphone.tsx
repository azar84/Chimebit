import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Dialpad } from './Dialpad';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing
} from 'lucide-react';

interface SoftphoneProps {
  accountSid?: string;
  accessToken?: string;
  apiKey?: string;
  onCallStart?: (callSid: string) => void;
  onCallEnd?: (callSid: string) => void;
  onCallStatusChange?: (status: string) => void;
}

interface CallState {
  isConnected: boolean;
  isMuted: boolean;
  isSpeakerOn: boolean;
  currentCallSid?: string;
  phoneNumber: string;
  callStatus: 'idle' | 'connecting' | 'connected' | 'disconnected' | 'error';
  callDuration: number;
}

export const Softphone: React.FC<SoftphoneProps> = ({
  accountSid,
  accessToken,
  apiKey,
  onCallStart,
  onCallEnd,
  onCallStatusChange
}) => {
  const [callState, setCallState] = useState<CallState>({
    isConnected: false,
    isMuted: false,
    isSpeakerOn: false,
    phoneNumber: '',
    callStatus: 'idle',
    callDuration: 0
  });

  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const deviceRef = useRef<any>(null);
  const callRef = useRef<any>(null);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Twilio Device
  useEffect(() => {
    if (!accountSid || !accessToken) {
      setError('Twilio credentials not configured');
      return;
    }

    const initializeTwilio = async () => {
      try {
        // Load Twilio Voice SDK v2
        const { Device } = await import('@twilio/voice-sdk');
        
        deviceRef.current = new Device(accessToken, {
          logLevel: 'debug'
        });

        // Set up event listeners
        deviceRef.current.on('ready', () => {
          console.log('Twilio Device ready');
          setIsInitialized(true);
          setError(null);
        });

        deviceRef.current.on('error', (error: any) => {
          console.error('Twilio Device error:', error);
          setError(`Device error: ${error.message}`);
          setCallState(prev => ({ ...prev, callStatus: 'error' }));
        });

        deviceRef.current.on('connect', (connection: any) => {
          console.log('Call connected:', connection);
          callRef.current = connection;
          setCallState(prev => ({
            ...prev,
            isConnected: true,
            callStatus: 'connected',
            currentCallSid: connection.parameters.CallSid
          }));
          onCallStart?.(connection.parameters.CallSid);
          startCallTimer();
        });

        deviceRef.current.on('disconnect', (connection: any) => {
          console.log('Call disconnected:', connection);
          setCallState(prev => ({
            ...prev,
            isConnected: false,
            callStatus: 'disconnected',
            currentCallSid: undefined
          }));
          onCallEnd?.(connection.parameters.CallSid);
          stopCallTimer();
          callRef.current = null;
        });

        deviceRef.current.on('incoming', (connection: any) => {
          console.log('Incoming call:', connection);
          callRef.current = connection;
          setCallState(prev => ({
            ...prev,
            callStatus: 'connecting',
            currentCallSid: connection.parameters.CallSid
          }));
          onCallStatusChange?.('incoming');
        });

        deviceRef.current.register();
      } catch (err) {
        console.error('Failed to initialize Twilio:', err);
        setError('Failed to initialize Twilio Device');
      }
    };

    initializeTwilio();

    return () => {
      if (deviceRef.current) {
        deviceRef.current.destroy();
      }
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    };
  }, [accountSid, accessToken, onCallStart, onCallEnd, onCallStatusChange]);

  const startCallTimer = () => {
    durationIntervalRef.current = setInterval(() => {
      setCallState(prev => ({
        ...prev,
        callDuration: prev.callDuration + 1
      }));
    }, 1000);
  };

  const stopCallTimer = () => {
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }
    setCallState(prev => ({ ...prev, callDuration: 0 }));
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMakeCall = () => {
    if (!callState.phoneNumber.trim()) {
      setError('Please enter a phone number');
      return;
    }

    if (!isInitialized || !deviceRef.current) {
      setError('Device not initialized');
      return;
    }

    try {
      setCallState(prev => ({ ...prev, callStatus: 'connecting' }));
      onCallStatusChange?.('connecting');
      
      const params = {
        To: callState.phoneNumber,
        From: '+1234567890' // This should come from your Twilio number
      };

      deviceRef.current.connect(params);
    } catch (err) {
      console.error('Failed to make call:', err);
      setError('Failed to make call');
      setCallState(prev => ({ ...prev, callStatus: 'error' }));
    }
  };

  const handleEndCall = () => {
    if (callRef.current) {
      callRef.current.disconnect();
    }
  };

  const handleMuteToggle = () => {
    if (callRef.current) {
      if (callState.isMuted) {
        callRef.current.mute(false);
      } else {
        callRef.current.mute(true);
      }
      setCallState(prev => ({ ...prev, isMuted: !prev.isMuted }));
    }
  };

  const handleSpeakerToggle = () => {
    setCallState(prev => ({ ...prev, isSpeakerOn: !prev.isSpeakerOn }));
    // Note: Speaker control might need additional implementation
    // depending on browser capabilities
  };

  const handleAcceptCall = () => {
    if (callRef.current) {
      callRef.current.accept();
    }
  };

  const handleRejectCall = () => {
    if (callRef.current) {
      callRef.current.reject();
    }
  };

  const getStatusBadgeVariant = () => {
    switch (callState.callStatus) {
      case 'connected': return 'success';
      case 'connecting': return 'warning';
      case 'error': return 'error';
      case 'disconnected': return 'secondary';
      default: return 'info';
    }
  };

  return (
    <Card title="Softphone" className="w-full max-w-lg">
      <div className="space-y-6">
        {/* Status Display */}
        <div className="text-center">
          <Badge variant={getStatusBadgeVariant()} size="lg">
            {callState.callStatus.toUpperCase()}
          </Badge>
          {callState.isConnected && (
            <p className="text-sm text-gray-600 mt-2">
              Duration: {formatDuration(callState.callDuration)}
            </p>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Phone Number Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <Input
            type="tel"
            placeholder="+1234567890"
            value={callState.phoneNumber}
            onChange={(value) => setCallState(prev => ({ ...prev, phoneNumber: value }))}
            disabled={callState.isConnected}
            leftIcon={<Phone className="w-4 h-4" />}
          />
        </div>

        {/* Dialpad */}
        {!callState.isConnected && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Dialpad
            </label>
            <Dialpad
              onNumberPress={(number) => {
                if (number === '+') {
                  setCallState(prev => ({ ...prev, phoneNumber: prev.phoneNumber + '+' }));
                } else {
                  setCallState(prev => ({ ...prev, phoneNumber: prev.phoneNumber + number }));
                }
              }}
              onDelete={() => {
                setCallState(prev => ({ 
                  ...prev, 
                  phoneNumber: prev.phoneNumber.slice(0, -1) 
                }));
              }}
              onCall={handleMakeCall}
              disabled={!isInitialized || !callState.phoneNumber.trim()}
            />
          </div>
        )}

        {/* Call Controls (for incoming calls) */}
        {callState.callStatus === 'connecting' && !callState.isConnected && (
          <div className="flex justify-center space-x-4">
            <Button
              variant="success"
              size="lg"
              onClick={handleAcceptCall}
              leftIcon={<PhoneIncoming className="w-5 h-5" />}
            >
              Accept
            </Button>
            <Button
              variant="destructive"
              size="lg"
              onClick={handleRejectCall}
              leftIcon={<PhoneOutgoing className="w-5 h-5" />}
            >
              Reject
            </Button>
          </div>
        )}

        {/* Call Controls (when connected) */}
        {callState.isConnected && (
          <div className="space-y-4">
            <div className="flex justify-center space-x-4">
              <Button
                variant="destructive"
                size="lg"
                onClick={handleEndCall}
                leftIcon={<PhoneOff className="w-5 h-5" />}
              >
                End Call
              </Button>
            </div>
            <div className="flex justify-center space-x-4">
              <Button
                variant={callState.isMuted ? "destructive" : "outline"}
                size="sm"
                onClick={handleMuteToggle}
                leftIcon={callState.isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              >
                {callState.isMuted ? 'Unmute' : 'Mute'}
              </Button>
              <Button
                variant={callState.isSpeakerOn ? "primary" : "outline"}
                size="sm"
                onClick={handleSpeakerToggle}
                leftIcon={callState.isSpeakerOn ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              >
                {callState.isSpeakerOn ? 'Speaker Off' : 'Speaker On'}
              </Button>
            </div>
          </div>
        )}

        {/* Call Info */}
        {callState.currentCallSid && (
          <div className="text-xs text-gray-500 text-center">
            Call SID: {callState.currentCallSid}
          </div>
        )}
      </div>
    </Card>
  );
}; 