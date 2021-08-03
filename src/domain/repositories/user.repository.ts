import { User } from '../entities/user.entity';
import { EmailVO } from '../vos/auth-user/email.vo';

export interface UserRepository {

    saveUser(user: User): Promise<void>;

    getUserByEmail(email: EmailVO): Promise<User|null>;

    updateUserByEmail(email: EmailVO, updatedUser: User): Promise<void|null>;

    deleteUser(email: EmailVO): Promise<void|null>;

}