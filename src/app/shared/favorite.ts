import { Book } from './book';
import { User } from './user';

export class Favorite {
    _id: string;
    user: User;
    books: Book[];
    createdAt: string;
    updatedAt: string;
}
