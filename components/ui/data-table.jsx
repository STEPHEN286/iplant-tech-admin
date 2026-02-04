"use client"

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import TablePagination from "./table-pagination"

export function DataTable({ columns, data , pagination, onPageChange}) {

  // console.log("DataTable pagination:", columns, data, pagination)
  // console.log("DataTable data:",  data)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  manualPagination: true,
    pageCount: pagination?.totalPages,
    state: {
      pagination: {
        pageIndex: pagination ? pagination.currentPage - 1 : 0, 
        pageSize: pagination ? pagination.limit : 10,
      },
    },
  })




  return (
    <div className="space-y-4 bg-white">
      {/* TABLE */}
      <div className="overflow-hidden rounded-md ">
        <Table className="bg-white  p-6 ">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className=" text-slate-400 border-b border-violet-100" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-gray-200 p-3"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="font-medium text-[15px] text-indigo-900 capitalize" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
       {/* {pagination && (
        <div className="flex items-center justify-between px-2">
          <p className="text-sm text-muted-foreground">
            Page {pagination.currentPage} of {pagination.totalPages}
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.hasPrevPage}
              onClick={() =>
                onPageChange(pagination.currentPage - 1)
              }
            >
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.hasNextPage}
              onClick={() =>
                onPageChange(pagination.currentPage + 1)
              }
            >
              Next
            </Button>
          </div>
        </div>
      )} */}
      <TablePagination 
        pagination={pagination}
        onPageChange={onPageChange}
      />
    </div>
  )
}
