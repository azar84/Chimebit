import React, { useState } from 'react';
import { AdminLayout } from '../layout/AdminLayout';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Softphone } from './Softphone';
import { Phone, History, Users, Settings } from 'lucide-react';

interface TwilioCredentials {
  accountSid: string;
  accessToken: string;
  apiKey: string;
}

interface PhoneManagerProps {
  navigationItems?: any[];
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export const PhoneManager: React.FC<PhoneManagerProps> = ({
  navigationItems,
  activeSection,
  onSectionChange
}) => {
  const [credentials, setCredentials] = useState<TwilioCredentials>({
    accountSid: '',
    accessToken: '',
    apiKey: ''
  });
  const [callHistory, setCallHistory] = useState<Array<{
    id: string;
    callSid: string;
    phoneNumber: string;
    direction: 'inbound' | 'outbound';
    status: string;
    duration: number;
    timestamp: Date;
  }>>([]);

  const handleSaveCredentials = (newCredentials: TwilioCredentials) => {
    setCredentials(newCredentials);
  };

  const handleCallStart = (callSid: string) => {
    console.log('Call started:', callSid);
    // In a real app, you'd track this in your backend
  };

  const handleCallEnd = (callSid: string) => {
    console.log('Call ended:', callSid);
    // In a real app, you'd update call history in your backend
  };

  const handleCallStatusChange = (status: string) => {
    console.log('Call status changed:', status);
  };

  const isConfigured = credentials.accountSid && credentials.accessToken;

  return (
    <AdminLayout 
      title="Phone Manager" 
      subtitle="Manage phone calls and Twilio settings"
      navigationItems={navigationItems}
      activeSection={activeSection}
      onSectionChange={onSectionChange}
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Badge variant={isConfigured ? 'success' : 'warning'}>
              {isConfigured ? 'Configured' : 'Not Configured'}
            </Badge>
            <span className="text-sm text-gray-600">
              {isConfigured ? 'Twilio is properly configured' : 'Configure Twilio in Settings'}
            </span>
          </div>
          <Button
            variant="outline"
            leftIcon={<Settings className="w-4 h-4" />}
            onClick={() => onSectionChange?.('settings')}
          >
            Go to Settings
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Softphone */}
          <div className="xl:col-span-1">
            <div className="flex justify-center">
              <Softphone
                accountSid={credentials.accountSid}
                accessToken={credentials.accessToken}
                apiKey={credentials.apiKey}
                onCallStart={handleCallStart}
                onCallEnd={handleCallEnd}
                onCallStatusChange={handleCallStatusChange}
              />
            </div>
          </div>

          {/* Call History & Stats */}
          <div className="xl:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {callHistory.length}
                  </p>
                  <p className="text-sm text-gray-600">Total Calls</p>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {callHistory.filter(call => call.status === 'completed').length}
                  </p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {Math.round(callHistory.reduce((total, call) => total + call.duration, 0) / 60)}
                  </p>
                  <p className="text-sm text-gray-600">Total Minutes</p>
                </div>
              </Card>
            </div>

            {/* Call History */}
            <Card title="Recent Calls">
              {callHistory.length === 0 ? (
                <div className="text-center py-8">
                  <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No call history yet</p>
                  <p className="text-sm text-gray-400">Make your first call to see history here</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Phone Number</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Direction</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Duration</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {callHistory.map((call) => (
                        <tr key={call.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="font-medium text-gray-900">{call.phoneNumber}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={call.direction === 'inbound' ? 'info' : 'primary'}>
                              {call.direction}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge 
                              variant={
                                call.status === 'completed' ? 'success' : 
                                call.status === 'failed' ? 'error' : 'warning'
                              }
                            >
                              {call.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {Math.floor(call.duration / 60)}:{(call.duration % 60).toString().padStart(2, '0')}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {call.timestamp.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Configuration Warning */}
        {!isConfigured && (
          <Card className="bg-yellow-50 border-yellow-200">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                Twilio Configuration Required
              </h3>
              <p className="text-yellow-700 mb-4">
                To use the softphone, you need to configure your Twilio credentials. 
                Click "Twilio Settings" above to add your Account SID and Access Token.
              </p>
              <div className="text-sm text-yellow-600">
                <p><strong>You'll need:</strong></p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Twilio Account SID (from your Twilio Console)</li>
                  <li>Access Token (generated from your Twilio Console)</li>
                  <li>A Twilio phone number for making calls</li>
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}; 