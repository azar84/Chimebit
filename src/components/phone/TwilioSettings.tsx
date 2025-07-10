import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Settings, Save, Eye, EyeOff } from 'lucide-react';

interface TwilioSettingsProps {
  accountSid: string;
  accessToken: string;
  apiKey: string;
  onSave: (credentials: { accountSid: string; accessToken: string; apiKey: string }) => void;
}

export const TwilioSettings: React.FC<TwilioSettingsProps> = ({
  accountSid,
  accessToken,
  apiKey,
  onSave
}) => {
  const [credentials, setCredentials] = useState({
    accountSid: accountSid || '',
    accessToken: accessToken || '',
    apiKey: apiKey || ''
  });

  const [showSecrets, setShowSecrets] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSave = async () => {
    if (!credentials.accountSid || !credentials.accessToken) {
      setMessage({ type: 'error', text: 'Account SID and Access Token are required' });
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      // In a real app, you'd save these securely (e.g., to backend)
      onSave(credentials);
      setMessage({ type: 'success', text: 'Twilio credentials saved successfully!' });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save credentials' });
    } finally {
      setIsSaving(false);
    }
  };

  const toggleSecrets = () => {
    setShowSecrets(!showSecrets);
  };

  return (
    <Card title="Twilio Settings" className="w-full max-w-lg">
      <div className="space-y-6">
        {/* Status Message */}
        {message && (
          <div className={`p-3 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <p className={`text-sm ${
              message.type === 'success' ? 'text-green-600' : 'text-red-600'
            }`}>
              {message.text}
            </p>
          </div>
        )}

        {/* Account SID */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Account SID
          </label>
          <Input
            type="text"
            placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            value={credentials.accountSid}
            onChange={(value) => setCredentials(prev => ({ ...prev, accountSid: value }))}
            leftIcon={<Settings className="w-4 h-4" />}
          />
          <p className="text-xs text-gray-500">
            Your Twilio Account SID (starts with "AC")
          </p>
        </div>

        {/* Access Token */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Access Token
          </label>
          <div className="relative">
            <Input
              type={showSecrets ? "text" : "password"}
              placeholder="Enter your access token"
              value={credentials.accessToken}
              onChange={(value) => setCredentials(prev => ({ ...prev, accessToken: value }))}
              leftIcon={<Settings className="w-4 h-4" />}
            />
            <button
              type="button"
              onClick={toggleSecrets}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showSecrets ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-xs text-gray-500">
            Your Twilio Access Token (generated from your console)
          </p>
        </div>

        {/* API Key (Optional) */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            API Key (Optional)
          </label>
          <div className="relative">
            <Input
              type={showSecrets ? "text" : "password"}
              placeholder="Enter your API key"
              value={credentials.apiKey}
              onChange={(value) => setCredentials(prev => ({ ...prev, apiKey: value }))}
              leftIcon={<Settings className="w-4 h-4" />}
            />
            <button
              type="button"
              onClick={toggleSecrets}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showSecrets ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-xs text-gray-500">
            Your Twilio API Key (for additional API access)
          </p>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={isSaving || !credentials.accountSid || !credentials.accessToken}
            leftIcon={<Save className="w-4 h-4" />}
          >
            {isSaving ? 'Saving...' : 'Save Credentials'}
          </Button>
        </div>

        {/* Security Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-600">
            <strong>Security Note:</strong> In a production environment, these credentials should be stored securely 
            on your backend server, not in the frontend. This is for development/testing purposes only.
          </p>
        </div>
      </div>
    </Card>
  );
}; 