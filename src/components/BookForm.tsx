import React from 'react'
import { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
interface BookFormProps {
    open: boolean;
    onClose: () => void;
    onSave: (book: any) => void;
}
export default function BookForm(open, onClose, onSave) {
    const [book, setBook] = useState({ title: '', borrower: '', borrowDate: '', returnDate: '', status: 'Chưa trả' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (!book.title || !book.borrower || !book.borrowDate || !book.returnDate) {
            alert("Tất cả các trường không được phép để trống");
            return;
        }
        const currentDate = new Date().toISOString().split('T')[0];
        if (book.borrowDate < currentDate || book.returnDate < currentDate) {
            alert("Ngày mượn và ngày trả không được bé hơn ngày hiện tại");
            return;
        }
        onSave(book);
        onClose();
    };
  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Thêm Thông Tin Mượn Trả Sách</DialogTitle>
        <DialogContent>
            <TextField label="Tên sách" name="title" value={book.title} onChange={handleChange} fullWidth />
            <TextField label="Người mượn" name="borrower" value={book.borrower} onChange={handleChange} fullWidth />
            <TextField type="date" label="Ngày mượn" name="borrowDate" value={book.borrowDate} onChange={handleChange} fullWidth />
            <TextField type="date" label="Ngày trả" name="returnDate" value={book.returnDate} onChange={handleChange} fullWidth />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Hủy</Button>
            <Button onClick={handleSave}>Thêm</Button>
        </DialogActions>
    </Dialog>
  )
}
