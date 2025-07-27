"use client"

import ApiIntegrationsSettings from "@/components/settings/api-integrations-settings"
import GeneralSettings from "@/components/settings/general-settings"
import NotificationsSettings from "@/components/settings/notification-settings"
import ProductsSettings from "@/components/settings/products-settings"
import SecuritySettings from "@/components/settings/security-settings"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div className="grid gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <p className="text-gray-600">Manage your application settings and preferences</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">Save All Changes</Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gray-100 text-gray-900 border-b border-gray-200">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="api-integrations">API & Integrations</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationsSettings />
        </TabsContent>
        <TabsContent value="products">
          <ProductsSettings />
        </TabsContent>
        <TabsContent value="api-integrations">
          <ApiIntegrationsSettings />
        </TabsContent>
        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
