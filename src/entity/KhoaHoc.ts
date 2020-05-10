import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class KhoaHoc {
    @PrimaryGeneratedColumn()
    maKhoaHoc: Number;

    @Column()
    tenKhoaHoc: String;

    @Column()
    moTa: String;

    @Column()
    luotXem: Number;

    @Column()
    danhGia: Number;

    @Column()
    hinhAnh: String;

    @Column()
    ngayTao: Date;

    @Column()
    maDanhMuc: String;

    @Column()
    taiKhoanNguoiTao: String;
}