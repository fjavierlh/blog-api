import { OffensiveWord } from '../entities/offensive-word.entity';
import { IdVO } from '../vos/id.vo';

export interface OffensiveWordRepository {
    
    save(offensiveWord: OffensiveWord): Promise<void>;
    
    delete(idOffensiveWord: IdVO): Promise<void>;
    
    showAll(): Promise<OffensiveWord[]>;

    findById(idOffensiveWord: IdVO): Promise<OffensiveWord|null>;

    update(idOffensiveWord: IdVO, offensiveWord: OffensiveWord): Promise<OffensiveWord>;

}