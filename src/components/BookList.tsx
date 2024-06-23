import { Button } from '@mui/material'
interface BookListProps {
  books: any[];
  onEdit: (book: any) => void;
  onDelete: (book: any) => void;
  onStatusChange: (book: any, status: string) => void;
}
export default function BookList(books, onEdit, onDelete, onStatusChange) {
  return (
    <table>
        <thead>
            <tr>
              <th>Tên sách</th>
              <th>Người mượn</th>
              <th>Ngày mượn</th>
              <th>Ngày trả</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
        </thead>
        <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                  <td>{book.title}</td>
                  <td>{book.borrower}</td>
                  <td>{book.borrowDate}</td>
                  <td>{book.returnDate}</td>
                  <td>
                      <select value={book.status} onChange={(e) => onStatusChange(book, e.target.value)}>
                          <option value="Chưa trả">Chưa trả</option>
                          <option value="Đã trả">Đã trả</option>
                      </select>
                  </td>
                  <td>
                      <Button onClick={() => onEdit(book)}>Sửa</Button>
                        <Button onClick={() => onDelete(book)}>Xóa</Button>
                  </td>
              </tr>
            ))}
        </tbody>
    </table>
  )
}
