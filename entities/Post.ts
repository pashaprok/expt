import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import {
    MinLength,
    MaxLength,
    IsDate,
} from 'class-validator'
import { User } from './User'

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    @MinLength(10, {
        message: 'Title is too short',
    })
    @MaxLength(50, {
        message: 'Title is too long',
    })
    title: string;

    @Column({ type: 'varchar'})
    @MaxLength(500, {
        message: 'content is too long',
    })
    content: string;

    @Column({ type: "timestamp without time zone" })
    @IsDate()
    posted: Date;

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({name: 'userID', referencedColumnName: 'id'})
    userID: User;
}