export namespace db {
  export enum CharType {
    HERO = 'hero',
    VILLAIN = 'villain',
  }

  export namespace functions {
    export const emailExists = `fn_email_exists`
  }

  export namespace characters {
    export const tableName = 'characters'
  }
}
