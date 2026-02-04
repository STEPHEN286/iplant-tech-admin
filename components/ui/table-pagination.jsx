import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function TablePagination({ pagination, onPageChange }) {
  if (!pagination) return null

  const {
    currentPage,
    totalPages,
    hasPrevPage,
    hasNextPage,
  } = pagination

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-between px-2 py-4 border-t border-gray-200">
      <p className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </p>

      <Pagination>
        <PaginationContent>
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                hasPrevPage && onPageChange(currentPage - 1)
              }
              aria-disabled={!hasPrevPage}
              className={
                !hasPrevPage ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {/* Page Numbers */}
          {pages.map(page => (
            <PaginationItem key={page}>
              <PaginationLink
              className={page === currentPage ? "bg-red-500 text-white" : ""}
                isActive={page === currentPage}
                onClick={() => onPageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Optional ellipsis */}
          {totalPages > 5 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                hasNextPage && onPageChange(currentPage + 1)
              }
              aria-disabled={!hasNextPage}
              className={
                !hasNextPage ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
