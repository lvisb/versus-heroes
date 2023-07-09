CREATE TABLE IF NOT EXISTS characters (
  char_id SERIAL PRIMARY KEY,
  author_id UUID REFERENCES auth.users (id),
  char_type enum_char_type NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  attributes JSONB NOT NULL,
  strenghts VARCHAR(100)[] DEFAULT '{}',
  weaknesses VARCHAR(100)[] DEFAULT '{}',
  related_heros INT[] DEFAULT '{}',
  related_villains INT[] DEFAULT '{}',
  views INT DEFAULT 0,
  is_active BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_characters_author_id ON characters (author_id);
CREATE INDEX idx_characters_char_type ON characters (char_type);
CREATE INDEX idx_characters_name ON characters (name);
CREATE INDEX idx_characters_related_heros ON characters (related_heros);
CREATE INDEX idx_characters_related_villains ON characters (related_villains);
CREATE INDEX idx_characters_is_active ON characters (is_active);
CREATE INDEX idx_characters_is_deleted ON characters (is_deleted);
CREATE INDEX idx_characters_created_at ON characters (created_at);
CREATE INDEX idx_characters_updated_at ON characters (updated_at);

