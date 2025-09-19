"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { PlusCircle, Edit, Send, UserPlus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

export function AddCustomerModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Customer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
          <DialogDescription>
            Register a new customer to the system.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="customer-name" className="text-right">
              Customer Name
            </Label>
            <Input
              id="customer-name"
              placeholder="Enter customer name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="customer-email" className="text-right">
              Email
            </Label>
            <Input
              id="customer-email"
              type="email"
              placeholder="Enter email address"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="customer-phone" className="text-right">
              Phone
            </Label>
            <Input
              id="customer-phone"
              placeholder="Enter phone number"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="customer-address" className="text-right">
              Address
            </Label>
            <textarea
              id="customer-address"
              placeholder="Enter address"
              className="min-h-[80px] flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="customer-source" className="text-right">
              Source
            </Label>
            <div>
              <select 
                id="customer-source" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select source</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Social Media">Social Media</option>
                <option value="Google Ad">Google Ad</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between p-2">
          <DialogClose asChild>
            <Button variant="outline" className="w-1/2 mr-2">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-green-600 hover:bg-green-700 w-1/2 text-white">
            Add Customer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function EditCustomerModal({ customer }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-blue-600 border-blue-300 hover:bg-blue-50"
        >
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogDescription>
            Update customer information.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-customer-name" className="text-right">
              Customer Name
            </Label>
            <Input
              id="edit-customer-name"
              defaultValue={customer?.name || "John Doe"}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-customer-email" className="text-right">
              Email
            </Label>
            <Input
              id="edit-customer-email"
              type="email"
              defaultValue={customer?.email || "john.doe@email.com"}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-customer-phone" className="text-right">
              Phone
            </Label>
            <Input
              id="edit-customer-phone"
              defaultValue={customer?.phone || "+1 (555) 123-4567"}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-customer-address" className="text-right">
              Address
            </Label>
            <textarea
              id="edit-customer-address"
              defaultValue="123 Main St, Anytown, USA"
              className="min-h-[80px] flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-customer-source" className="text-right">
              Source
            </Label>
            <div>
              <select 
                id="edit-customer-source" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue="Website"
              >
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Social Media">Social Media</option>
                <option value="Google Ad">Google Ad</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="customer-status" className="text-right">
              Active
            </Label>
            <div className="flex items-center space-x-2">
              <Switch id="customer-status" defaultChecked />
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between p-2">
          <DialogClose asChild>
            <Button variant="outline" className="w-1/2 mr-2">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-green-600 hover:bg-green-700 w-1/2 text-white">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function AssignPodModal({ customer }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-green-600 border-green-300 hover:bg-green-50"
        >
          <PlusCircle className="h-4 w-4 mr-1" />
          Assign Pod
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Assign Pod</DialogTitle>
          <DialogDescription>
            Assign a smart pod to this customer.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="customer-id" className="text-right">
              Customer
            </Label>
            <Input
              id="customer-id"
              defaultValue={customer?.name || "Selected Customer"}
              readOnly
              className="bg-gray-50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="pod-selection" className="text-right">
              Select Pod
            </Label>
            <div>
              <select 
                id="pod-selection" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select a pod</option>
                <option value="SP-2023-0042">SP-2023-0042 (PlantPal Pro)</option>
                <option value="SP-2023-0043">SP-2023-0043 (PlantPal Mini)</option>
                <option value="SP-2023-0044">SP-2023-0044 (PlantPal Pro+)</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="assignment-date" className="text-right">
              Assignment Date
            </Label>
            <Input
              id="assignment-date"
              type="date"
              defaultValue={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="assignment-notes" className="text-right">
              Notes
            </Label>
            <textarea
              id="assignment-notes"
              placeholder="Add any notes about this assignment"
              className="min-h-[80px] flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
        <DialogFooter className="flex justify-between p-2">
          <DialogClose asChild>
            <Button variant="outline" className="w-1/2 mr-2">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-green-600 hover:bg-green-700 w-1/2 text-white">
            Assign Pod
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function SendNewsletterModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200">
          <Send className="h-4 w-4 mr-2" />
          Send Campaign
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Send Newsletter</DialogTitle>
          <DialogDescription>
            Send an email campaign to your customers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="newsletter-subject" className="text-right">
              Subject
            </Label>
            <Input
              id="newsletter-subject"
              placeholder="Enter email subject"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="newsletter-message" className="text-right">
              Message
            </Label>
            <textarea
              id="newsletter-message"
              placeholder="Enter your message"
              className="min-h-[150px] flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="recipient-list" className="text-right">
              Recipients
            </Label>
            <div>
              <select 
                id="recipient-list" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="all">All Customers</option>
                <option value="active">Active Customers</option>
                <option value="inactive">Inactive Customers</option>
                <option value="recent">Recent Customers (30 days)</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="schedule-date" className="text-right">
              Schedule (Optional)
            </Label>
            <Input
              id="schedule-date"
              type="datetime-local"
            />
          </div>
        </div>
        <DialogFooter className="flex justify-between p-2">
          <DialogClose asChild>
            <Button variant="outline" className="w-1/2 mr-2">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-green-600 hover:bg-green-700 w-1/2 text-white">
            Send Newsletter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}