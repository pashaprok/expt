import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne} from 'typeorm'
import {Post} from "./Post";
import {City} from "./City";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @OneToMany(() => Post, post => post.userID)
    @JoinColumn({name: 'posts', referencedColumnName: 'id'})
    posts: Post[];

    @ManyToOne(() => City)
    @JoinColumn({name: 'cityID', referencedColumnName: 'id'})
    cityID: City;

    toJSON() {
        const obj: any = { ...this }

        delete obj.password;

        return obj;
    }
}