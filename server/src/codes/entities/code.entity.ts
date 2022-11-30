import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('code')
export class Code {
  @PrimaryColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: true })
  @Index({ unique: true })
  shortcode_uuid: string;

  @Column({ length: 1000 })
  redirect_url: string;

  @Column({ default: true })
  active: boolean;
}
