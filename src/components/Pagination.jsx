export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`cursor-pointer px-3 py-1 border rounded ${
          currentPage === 1
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        이전
      </button>

      <div className="flex space-x-1">
        {Array.from({ length: Math.max(totalPages, 1) }, (_, i) => i + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`cursor-pointer px-3 py-1 border rounded ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`cursor-pointer px-3 py-1 border rounded ${
          currentPage === totalPages
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        다음
      </button>
    </div>
  );
}
