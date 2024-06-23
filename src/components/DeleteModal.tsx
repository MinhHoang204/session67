import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
export default function DeleteModal(open,onClose, onConfirm) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xác Nhận Xóa</DialogTitle>
      <DialogContent>
        <DialogContentText>Bạn có chắc chắn muốn xóa thông tin này không?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={onConfirm}>Xóa</Button>
      </DialogActions>
    </Dialog>
  )
}
