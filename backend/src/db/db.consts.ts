export namespace db {
  export enum CharType {
    HERO = 'hero',
    VILLAIN = 'villain',
    BOTH = 'both',
  }

  export namespace functions {
    export const emailExists = `fn_email_exists`
  }

  export namespace auth {
    export const schema = 'auth'

    export namespace users {
      export const tableName = 'users'
    }
  }

  export namespace characters {
    export const tableName = 'characters'
  }

  export namespace charactersImg {
    export const tableName = 'characters_img'
  }
}
