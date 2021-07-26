import { OffensiveWord } from '../entities/offensive-word.entity';
import { IdVO } from '../vos/id.vo';

export interface OffensiveWordRepository {
    
    save(offensiveWord: OffensiveWord): void;
    
    delete(idOffensiveWord: IdVO): void;
    
    showAll(): Promise<OffensiveWord[]>;

    showById(idOffensiveWord: IdVO): Promise<OffensiveWord>;

    update(idOffensiveWord: IdVO, offensiveWord: OffensiveWord): Promise<OffensiveWord>;

}