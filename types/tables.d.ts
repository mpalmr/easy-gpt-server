import type { Knex } from 'knex';

type WriteRecord<T> = Omit<T, 'id' | 'createdAt'>;

declare module 'knex/types/tables' {
  interface UsersTable {
    readonly id: string;
    readonly email: string;
    passwordHash: string;
    readonly createdAt: Date;
  }

  interface UserVerificationsTable {
    readonly id: string;
    readonly userId: string;
    verifiedAt?: Date;
    readonly createdAt: Date;
  }

  interface ConversationsTable {
    readonly id: string;
    readonly userId: string;
    label: string;
    readonly createdAt: Date;
  }

  interface Tables {
    users: Knex.CompositeTableType<
    UsersTable,
    WriteRecord<UsersTable>,
    Omit<WriteRecord<UsersTable, 'email'>>
    >;

    userVerifications: Knex.CompositeTableType<
    UserVerificationsTable,
    WriteRecord<UserVerificationsTable>,
    Omit<WriteRecord<UserVerificationsTable>, 'userId'>
    >;

    conversations: Knex.CompositeTableType<
    ConversationsTable,
    WriteRecord<ConversationsTable>,
    Omit<WriteRecord<ConversationsTable>, 'userId'>
    >;
  }
}
