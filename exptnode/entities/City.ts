import {Entity, Column, PrimaryColumn} from 'typeorm'

@Entity()
export class City {
    @PrimaryColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false})
    name: string;

    @Column({ type: 'varchar', nullable: true})
    state: string;

    @Column({ type: 'varchar', nullable: false })
    country: string;

    @Column({ type: 'double precision', nullable: false })
    loncoord: string;

    @Column({ type: 'double precision', nullable: false })
    latcoord: string;
}