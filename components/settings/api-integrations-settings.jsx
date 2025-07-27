import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function ApiIntegrationsSettings() {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">API & Integrations</h3>
        <p className="text-gray-600 text-sm">Manage API keys and third-party integrations</p>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="api-key" className="text-gray-700">
              API Key
            </Label>
            <div className="flex items-center gap-2 mt-1">
              <Input
                id="api-key"
                defaultValue="sk_live_xxxxxxxxxxxx"
                readOnly
                className="flex-1 text-gray-900 border-gray-300"
              />
              <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-200">
                Regenerate
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="webhook-url" className="text-gray-700">
              Webhook URL
            </Label>
            <Input
              id="webhook-url"
              defaultValue="https://api.iplanttech.com/webhooks"
              className="mt-1 text-gray-900 border-gray-300"
            />
          </div>
          <div>
            <Label htmlFor="stripe-public-key" className="text-gray-700">
              Stripe Public Key
            </Label>
            <Input
              id="stripe-public-key"
              defaultValue="pk_live_xxxxxxxxxxxx"
              readOnly
              className="mt-1 text-gray-900 border-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
