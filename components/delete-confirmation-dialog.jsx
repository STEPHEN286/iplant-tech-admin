"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {  Loader2,  TriangleAlert, XIcon } from "lucide-react"

export function DeleteConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone. This will permanently delete the item.",
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false,
  itemName,
  variant = "destructive"
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="!flex  !justify-between items-center gap-2">
            <TriangleAlert className="h-5 w-5 text-red-500" />
            <Button variant="ghost" size="icon" className="p-0" onClick={onOpenChange}>
              <XIcon className="h-4 w-4" />
            </Button>
          </AlertDialogTitle>
          <AlertDialogTitle className="text-xs md:text-base text-left">
          {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs md:text-sm text-left">
            {description}
            {/* {itemName && (
              <span className="block mt-2 font-medium text-foreground">
                "{itemName}"
              </span>
            )} */}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:!flex  sm:!justify-start sm:!border-t py-3">
          <AlertDialogCancel asChild>
            <Button variant="outline" disabled={isLoading}>
              {cancelText}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant={variant}
              onClick={onConfirm}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {confirmText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// Hook for managing delete confirmation state
export function useDeleteConfirmation() {
  const [isOpen, setIsOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)

  const openDeleteDialog = (item) => {
    setItemToDelete(item)
    setIsOpen(true)
  }

  const closeDeleteDialog = () => {
    setIsOpen(false)
    setItemToDelete(null)
  }

  return {
    isOpen,
    itemToDelete,
    openDeleteDialog,
    closeDeleteDialog,
  }
}
