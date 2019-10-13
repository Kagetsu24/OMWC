import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from './Country';
import { Round } from './rounds/Round';
import { User } from './User';

@Entity()
export class Team extends BaseEntity {

    static findOneWithUsers(countryId: number) {
        return this.findOne({ where: { countryId }, relations: ['users'] });
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ default: false })
    isCompeting!: boolean;

    @Column()
    countryId!: number;

    @ManyToOne((type) => Country)
    country!: Country;

    @Column({ nullable: true })
    captainId?: number | null;

    @ManyToOne((type) => User)
    captain!: User;

    @Column({ nullable: true })
    eliminationRoundId?: number | null;

    @ManyToOne((type) => Round)
    eliminationRound!: Round;

    @OneToMany((type) => User, (user) => user.team)
    users!: User[];
}