import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function NotificationsSettings() {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
        <p className="text-gray-600 text-sm">Configure how you receive notifications</p>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications" className="text-gray-700">
              Email Notifications
            </Label>
            <Switch id="email-notifications" defaultChecked />
          </div>
          <p className="text-gray-500 text-sm -mt-3">Receive notifications via email</p>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications" className="text-gray-700">
              Push Notifications
            </Label>
            <Switch id="push-notifications" />
          </div>
          <p className="text-gray-500 text-sm -mt-3">Receive push notifications in your browser</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Email Templates</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="welcome-email-subject" className="text-gray-700">
              Welcome Email Subject
            </Label>
            <Input
              id="welcome-email-subject"
              defaultValue="Welcome to iPlant Tech!"
              className="mt-1 text-gray-900 border-gray-300"
            />
          </div>
          <div>
            <Label htmlFor="order-confirmation-subject" className="text-gray-700">
              Order Confirmation Subject
            </Label>
            <Input
              id="order-confirmation-subject"
              defaultValue="Your Smart Pod Order Confirmation"
              className="mt-1 text-gray-900 border-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
