# Modal UI Documentation

## Overview
This document lists all missing modals and UI components needed for the iPlantTech Admin Dashboard.

---

## 1. ORDERS PAGE

### Add New Order Modal
- **Purpose**: Create new customer orders
- **Fields**: Customer name, email, product, quantity, amount, status
- **Actions**: Save, Cancel

### Edit Order Modal  
- **Purpose**: Modify existing order details
- **Fields**: All order fields (editable)
- **Actions**: Update, Cancel

### View Order Details Modal
- **Purpose**: Display complete order information
- **Content**: Order details, customer info, payment status, shipping info
- **Actions**: Close, Edit, Delete

### Delete Order Modal
- **Purpose**: Confirm order deletion
- **Content**: Warning message, order ID
- **Actions**: Delete, Cancel

---

## 2. CUSTOMERS PAGE

### Add New Customer Modal
- **Purpose**: Register new customer
- **Fields**: Name, email, phone, address, preferences
- **Actions**: Save, Cancel

### Edit Customer Modal
- **Purpose**: Update customer information
- **Fields**: All customer fields (editable)
- **Actions**: Update, Cancel

### Assign Pod Modal
- **Purpose**: Assign smart pod to customer
- **Fields**: Customer, pod selection, assignment date
- **Actions**: Assign, Cancel

### Send Newsletter Modal
- **Purpose**: Send email campaigns
- **Fields**: Subject, message, recipient list, schedule
- **Actions**: Send, Save Draft, Cancel

---

## 3. WAITLIST PAGE

### Add Waitlist Member Modal
- **Purpose**: Manual waitlist entry
- **Fields**: Name, email, source, interests, notes
- **Actions**: Add, Cancel

### Convert to Customer Modal
- **Purpose**: Move from waitlist to customer
- **Fields**: Customer details, pod assignment
- **Actions**: Convert, Cancel

### Send Campaign Modal
- **Purpose**: Email marketing to waitlist
- **Fields**: Subject, message, filters, schedule
- **Actions**: Send, Cancel

---

## 4. SMART PODS PAGE

### Add New Pod Modal
- **Purpose**: Register new smart pod
- **Fields**: Model, serial number, batch, warranty info
- **Actions**: Add, Cancel

### Edit Pod Modal
- **Purpose**: Update pod information
- **Fields**: All pod fields (editable)
- **Actions**: Update, Cancel

### Maintenance Request Modal
- **Purpose**: Schedule pod maintenance
- **Fields**: Pod, issue description, priority, schedule
- **Actions**: Submit, Cancel

---

## 5. INVENTORY PAGE

### Add New Stock Modal
- **Purpose**: Add inventory items
- **Fields**: Model, quantity, batch, supplier, cost
- **Actions**: Add, Cancel

### Low Stock Alert Modal
- **Purpose**: Stock level notifications
- **Content**: Items below threshold, restock suggestions
- **Actions**: Order Stock, Dismiss

### Restock Request Modal
- **Purpose**: Order new inventory
- **Fields**: Items, quantities, supplier, delivery date
- **Actions**: Submit Order, Cancel

---

## 6. ADMIN USERS PAGE

### Add Admin User Modal
- **Purpose**: Create new admin account
- **Fields**: Name, email, role, permissions, password
- **Actions**: Create, Cancel

### Edit Admin User Modal
- **Purpose**: Update user details
- **Fields**: All user fields (editable)
- **Actions**: Update, Cancel

### Change Password Modal
- **Purpose**: Password management
- **Fields**: Current password, new password, confirm password
- **Actions**: Update, Cancel

### Role Assignment Modal
- **Purpose**: Assign user roles
- **Fields**: User, role selection, permissions
- **Actions**: Assign, Cancel

---

## 7. CONTACT FORM PAGE

### Reply to Message Modal
- **Purpose**: Respond to customer inquiries
- **Fields**: Reply message, status update, internal notes
- **Actions**: Send Reply, Save Draft, Cancel

### View Message Details Modal
- **Purpose**: Display full message information
- **Content**: Message content, customer info, history
- **Actions**: Close, Reply, Mark as Resolved

### Bulk Reply Modal
- **Purpose**: Send responses to multiple messages
- **Fields**: Template selection, message, filters
- **Actions**: Send, Cancel

---

## 8. E-BOOKS PAGE

### Add New E-Book Modal
- **Purpose**: Upload new e-book
- **Fields**: Title, description, file upload, category
- **Actions**: Upload, Cancel

### Edit E-Book Modal
- **Purpose**: Update e-book information
- **Fields**: All e-book fields (editable)
- **Actions**: Update, Cancel

### Download Analytics Modal
- **Purpose**: View detailed download statistics
- **Content**: Charts, user data, conversion metrics
- **Actions**: Export Data, Close

---

## 9. REPORTS PAGE

### Export Report Modal
- **Purpose**: Generate custom reports
- **Fields**: Report type, date range, filters, format
- **Actions**: Generate, Cancel

### Date Range Selector Modal
- **Purpose**: Custom date filtering
- **Fields**: Start date, end date, preset options
- **Actions**: Apply, Cancel

---

## 10. SETTINGS PAGE

### Profile Settings Modal
- **Purpose**: User profile management
- **Fields**: Name, email, avatar, preferences
- **Actions**: Save, Cancel

### Notification Preferences Modal
- **Purpose**: Email/SMS settings
- **Fields**: Notification types, frequency, channels
- **Actions**: Save, Cancel

### API Key Management Modal
- **Purpose**: Integration settings
- **Fields**: API keys, permissions, webhooks
- **Actions**: Generate Key, Revoke, Save

---

## Standard Modal Components

### Header
- Title
- Close button (X)

### Content Area
- Form fields or information display
- Proper spacing and typography

### Footer
- Primary action button (Save, Create, etc.)
- Secondary action button (Cancel, Close)
- Destructive action button (Delete) - when needed

### Form Fields
- Text inputs
- Dropdown selects
- Date pickers
- File uploads
- Text areas
- Checkboxes/Radio buttons

### Responsive Design
- Mobile-first approach
- Touch-friendly buttons
- Proper spacing
- Loading states

---

## Implementation Priority

### High Priority (MVP)
1. Add/Edit modals for Orders
2. Add/Edit modals for Customers
3. Add/Edit modals for Smart Pods
4. Basic CRUD modals for all pages

### Medium Priority
1. Bulk action modals
2. Analytics and report modals
3. Advanced filtering modals

### Low Priority
1. Advanced settings modals
2. Complex workflow modals
3. Integration-specific modals

---

## Design Guidelines

### Colors
- Primary: Green (#16a34a)
- Secondary: Gray (#6b7280)
- Danger: Red (#dc2626)
- Success: Green (#16a34a)

### Typography
- Headers: Font-semibold, text-gray-900
- Body: text-gray-600
- Labels: text-sm, font-medium

### Spacing
- Padding: p-4 md:p-6
- Gaps: gap-4
- Margins: mb-4

### Buttons
- Primary: bg-green-600 hover:bg-green-700
- Secondary: variant="outline"
- Danger: bg-red-600 hover:bg-red-700 