import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function GeneralSettings() {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
        <p className="text-gray-600 text-sm">Update your company details and branding.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="company-name" className="text-gray-700">
              Company Name
            </Label>
            <Input
              id="company-name"
              defaultValue="iPlant Tech"
              className="mt-1 text-gray-900 border-gray-300"
            />
          </div>
          <div>
            <Label htmlFor="contact-email" className="text-gray-700">
              Contact Email
            </Label>
            <Input
              id="contact-email"
              defaultValue="contact@iplanttech.com"
              className="mt-1 text-gray-900 border-gray-300"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="address" className="text-gray-700">
              Address
            </Label>
            <Input
              id="address"
              defaultValue="123 Innovation Drive, Tech Valley, CA 94025"
              className="mt-1 text-gray-900 border-gray-300"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="company-description" className="text-gray-700">
              Company Description
            </Label>
            <Textarea
              id="company-description"
              defaultValue="Leading provider of smart indoor gardening solutions for modern homes and offices."
              className="mt-1 text-gray-900 border-gray-300"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">System Preferences</h3>
        <p className="text-gray-600 text-sm">Configure system-wide settings</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between md:col-span-2">
            <Label htmlFor="maintenance-mode" className="text-gray-700">
              Maintenance Mode
            </Label>
            <Switch id="maintenance-mode" />
          </div>
          <p className="text-gray-500 text-sm -mt-3 md:col-span-2">
            Temporarily disable public access for maintenance.
          </p>
          <div>
            <Label htmlFor="timezone" className="text-gray-700">
              Timezone
            </Label>
            <Input
              id="timezone"
              defaultValue="America/Los_Angeles"
              className="mt-1 text-gray-900 border-gray-300"
            />
          </div>
          <div>
            <Label htmlFor="default-currency" className="text-gray-700">
              Default Currency
            </Label>
            <Input
              id="default-currency"
              defaultValue="USD"
              className="mt-1 text-gray-900 border-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
