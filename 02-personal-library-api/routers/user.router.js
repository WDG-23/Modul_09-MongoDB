import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getOneUser,
  updateOneUser,
  deleteUser,
  addBookToReadingList,
  updateBookStatus,
  deleteBookFromReadingList,
} from '../controllers/user.controllers.js';

const userRouter = Router();

userRouter.post('/', createUser);
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getOneUser);
userRouter.put('/:id', updateOneUser);
userRouter.delete('/:id', deleteUser);

userRouter.post('/:id/books', addBookToReadingList);
userRouter.put('/:id/books/:bookId', updateBookStatus);
userRouter.delete('/:id/books/:bookId', deleteBookFromReadingList);

export default userRouter;
