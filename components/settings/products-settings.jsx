import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ProductsSettings() {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Product Settings</h3>
        <p className="text-gray-600 text-sm">Configure product-related settings</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="default-pod-warranty" className="text-gray-700">
              Default Pod Warranty (months)
            </Label>
            <Input
              id="default-pod-warranty"
              defaultValue="24"
              className="mt-1 text-gray-900 border-gray-300"
            />
          </div>
          <div>
            <Label htmlFor="default-shipping-cost" className="text-gray-700">
              Default Shipping Cost
            </Label>
            <Input
              id="default-shipping-cost"
              defaultValue="$29.99"
              className="mt-1 text-gray-900 border-gray-300"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="return-policy" className="text-gray-700">
              Return Policy
            </Label>
            <Textarea
              id="return-policy"
              defaultValue="30-day return policy. Products must be in original condition with all accessories included."
              className="mt-1 bg-gray-100 text-gray-900 border-gray-300"
            />
          </div>
          <div>
            <Label htmlFor="low-stock-alert-threshold" className="text-gray-700">
              Low Stock Alert Threshold
            </Label>
            <Input
              id="low-stock-alert-threshold"
              defaultValue="10"
              className="mt-1 text-gray-900 border-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
