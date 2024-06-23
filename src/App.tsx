import React from 'react'
import Job from './components/Job'
import { useState } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import DeleteModal from './components/DeleteModal';
import FilterOptions from './components/FilterOptions';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Button } from '@mui/material';
export default function App() {
  const [books, setBooks] = useLocalStorage<any[]>('books', []);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editBook, setEditBook] = useState<any>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteBook, setDeleteBook] = useState<any>(null);
    const [filterStatus, setFilterStatus] = useState('');

    const handleAddBook = () => {
        setIsFormOpen(true);
        setIsEdit(false);
        setEditBook(null);
    };

    const handleSaveBook = (book: any) => {
        if (isEdit && editBook) {
            setBooks(books.map(b => (b === editBook ? book : b)));
        } else {
            setBooks([...books, book]);
        }
    };

    const handleEditBook = (book: any) => {
        setIsFormOpen(true);
        setIsEdit(true);
        setEditBook(book);
    };

    const handleDeleteBook = (book: any) => {
        setIsDeleteModalOpen(true);
        setDeleteBook(book);
    };

    const confirmDeleteBook = () => {
        setBooks(books.filter(b => b !== deleteBook));
        setIsDeleteModalOpen(false);
        setDeleteBook(null);
    };

    const handleStatusChange = (book: any, status: string) => {
        setBooks(books.map(b => (b === book ? { ...b, status } : b)));
    };

    const handleFilterChange = (status: string) => {
        setFilterStatus(status);
    };

    const filteredBooks = filterStatus ? books.filter(b => b.status === filterStatus) : books;

  return (
    <div>App
      <Job></Job>
      <div>
          <Button onClick={handleAddBook}>Thêm thông tin</Button>
          <FilterOptions filterStatus={filterStatus} onFilterChange={handleFilterChange} />
          <BookList
              books={filteredBooks}
              onEdit={handleEditBook}
              onDelete={handleDeleteBook}
              onStatusChange={handleStatusChange}
          />
          <BookForm open={isFormOpen} onClose={() => setIsFormOpen(false)} onSave={handleSaveBook} />
          <DeleteModal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDeleteBook} />
      </div>
    </div>
  )
}
