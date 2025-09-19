"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { UserPlus, Edit, Send, CheckCircle, Trash2 } from "lucide-react"

export function AddWaitlistMemberModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Waitlist Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Waitlist Member</DialogTitle>
          <DialogDescription>
            Manually add a new member to the waitlist.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Label htmlFor="member-name">Full Name</Label>
            <Input id="member-name" placeholder="Enter member name" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="member-email">Email Address</Label>
            <Input id="member-email" type="email" placeholder="member@example.com" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="member-source">Source</Label>
            <Select>
              <SelectTrigger id="member-source">
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="social">Social Media</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
                <SelectItem value="manual">Manual Entry</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="member-interests">Interests</Label>
            <Textarea id="member-interests" placeholder="Enter member interests" />
          </div>
          <div className="flex items-center gap-2">
            <Switch id="marketing" />
            <Label htmlFor="marketing">Opt-in to marketing emails</Label>
          </div>
        </div>
        <DialogFooter className="flex justify-between p-2">
          <DialogClose asChild>
            <Button variant="outline" className="w-1/2 mr-2">Cancel</Button>
          </DialogClose>
          <Button className="bg-green-600 hover:bg-green-700 w-1/2 text-white">Add Member</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function EditWaitlistMemberModal({ member }) {
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
          <DialogTitle>Edit Waitlist Member</DialogTitle>
          <DialogDescription>
            Update information for this waitlist member.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Label htmlFor="edit-name">Full Name</Label>
            <Input id="edit-name" defaultValue={member?.name || ""} />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="edit-email">Email Address</Label>
            <Input id="edit-email" type="email" defaultValue={member?.email || ""} />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="edit-source">Source</Label>
            <Select defaultValue={member?.source || "website"}>
              <SelectTrigger id="edit-source">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="social">Social Media</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
                <SelectItem value="manual">Manual Entry</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="edit-status">Status</Label>
            <Select defaultValue={member?.status || "active"}>
              <SelectTrigger id="edit-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="edit-interests">Interests</Label>
            <Textarea id="edit-interests" defaultValue={member?.interests || ""} />
          </div>
          <div className="flex items-center gap-2">
            <Switch id="edit-marketing" defaultChecked />
            <Label htmlFor="edit-marketing">Opt-in to marketing emails</Label>
          </div>
        </div>
        <DialogFooter className="flex justify-between p-2">
          <DialogClose asChild>
            <Button variant="outline" className="w-1/2 mr-2">Cancel</Button>
          </DialogClose>
          <Button className="bg-green-600 hover:bg-green-700 w-1/2 text-white">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function ConvertToCustomerModal({ member }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-green-600 border-green-300 hover:bg-green-50"
        >
          <CheckCircle className="h-4 w-4 mr-1" />
          Convert
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Convert to Customer</DialogTitle>
          <DialogDescription>
            Convert this waitlist member to a full customer account.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Label htmlFor="convert-email">Email Address</Label>
            <Input id="convert-email" type="email" defaultValue={member?.email || ""} readOnly className="bg-gray-50" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="convert-name">Full Name</Label>
            <Input id="convert-name" defaultValue={member?.name || ""} />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="convert-phone">Phone Number</Label>
            <Input id="convert-phone" placeholder="Enter phone number" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="convert-address">Address</Label>
            <Textarea id="convert-address" placeholder="Enter address" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="convert-notes">Conversion Notes</Label>
            <Textarea id="convert-notes" placeholder="Add any notes about this conversion" />
          </div>
          <div className="flex items-center gap-2">
            <Switch id="assign-pod" />
            <Label htmlFor="assign-pod">Assign a Smart Pod during conversion</Label>
          </div>
        </div>
        <DialogFooter className="flex justify-between p-2">
          <DialogClose asChild>
            <Button variant="outline" className="w-1/2 mr-2">Cancel</Button>
          </DialogClose>
          <Button className="bg-green-600 hover:bg-green-700 w-1/2 text-white">Convert to Customer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function SendWaitlistCampaignModal() {
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
          <DialogTitle>Send Waitlist Campaign</DialogTitle>
          <DialogDescription>
            Create and send a campaign to your waitlist members.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Label htmlFor="campaign-name">Campaign Name</Label>
            <Input id="campaign-name" placeholder="Enter campaign name" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="subject">Email Subject</Label>
            <Input id="subject" placeholder="Enter email subject" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="recipient-group">Recipient Group</Label>
            <Select>
              <SelectTrigger id="recipient-group">
                <SelectValue placeholder="Select recipient group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Waitlist Members</SelectItem>
                <SelectItem value="active">Active Members</SelectItem>
                <SelectItem value="recent">Recent Signups (Last 30 Days)</SelectItem>
                <SelectItem value="not-contacted">Not Yet Contacted</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="message">Email Content</Label>
            <Textarea id="message" placeholder="Compose your email message" className="min-h-[150px]" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="schedule">Schedule Send</Label>
            <div className="flex gap-2">
              <Input id="schedule-date" type="date" className="w-1/2" />
              <Input id="schedule-time" type="time" className="w-1/2" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="test-email" />
            <Label htmlFor="test-email">Send test email first</Label>
          </div>
        </div>
        <DialogFooter className="flex justify-between p-2">
          <DialogClose asChild>
            <Button variant="outline" className="w-1/2 mr-2">Cancel</Button>
          </DialogClose>
          <Button className="bg-green-600 hover:bg-green-700 w-1/2 text-white">Send Campaign</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DeleteWaitlistMemberModal({ member }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-red-600 border-red-300 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Remove
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Remove Waitlist Member</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this member from the waitlist?
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Label htmlFor="delete-email">Email Address</Label>
            <Input id="delete-email" type="email" defaultValue={member?.email || ""} readOnly className="bg-gray-50" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="delete-reason">Reason (Optional)</Label>
            <Select>
              <SelectTrigger id="delete-reason">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="duplicate">Duplicate Entry</SelectItem>
                <SelectItem value="converted">Already Converted</SelectItem>
                <SelectItem value="requested">User Requested</SelectItem>
                <SelectItem value="invalid">Invalid Information</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="delete-notes">Additional Notes</Label>
            <Textarea id="delete-notes" placeholder="Add any additional notes" />
          </div>
        </div>
        <DialogFooter className="flex justify-between p-2">
          <DialogClose asChild>
            <Button variant="outline" className="w-1/2 mr-2">Cancel</Button>
          </DialogClose>
          <Button className="bg-red-600 hover:bg-red-700 w-1/2 text-white">Remove Member</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}