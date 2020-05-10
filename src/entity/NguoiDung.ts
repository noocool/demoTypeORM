import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()

export class NguoiDung {
    @PrimaryColumn()
    taiKhoan: String;

    @Column()
    matKhau: String;

    @Column()
    hoTen: String;
    
    @Column()
    soDT: String;

    @Column()
    email: String;
}