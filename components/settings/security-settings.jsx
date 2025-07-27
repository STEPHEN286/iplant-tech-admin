import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SecuritySettings() {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
        <p className="text-gray-600 text-sm">Configure security and access controls</p>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="session-timeout" className="text-gray-700">
              Session Timeout (minutes)
            </Label>
            <Input id="session-timeout" defaultValue="120" className="mt-1 text-gray-900 border-gray-300" />
          </div>
          <div>
            <Label htmlFor="minimum-password-length" className="text-gray-700">
              Minimum Password Length
            </Label>
            <Input
              id="minimum-password-length"
              defaultValue="8"
              className="mt-1 text-gray-900 border-gray-300"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="two-factor-authentication" className="text-gray-700">
              Two-Factor Authentication
            </Label>
            <Switch id="two-factor-authentication" defaultChecked />
          </div>
          <p className="text-gray-500 text-sm -mt-3">Require 2FA for all admin accounts</p>
          <div className="flex items-center justify-between">
            <Label htmlFor="ip-whitelist" className="text-gray-700">
              IP Whitelist
            </Label>
            <Switch id="ip-whitelist" />
          </div>
          <p className="text-gray-500 text-sm -mt-3">Restrict admin access to specific IP addresses</p>
        </div>
      </div>
    </div>
  )
}
