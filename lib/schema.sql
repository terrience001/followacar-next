CREATE TABLE IF NOT EXISTS rooms (
  id         VARCHAR(6)   NOT NULL PRIMARY KEY,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS participants (
  room_id    VARCHAR(6)    NOT NULL,
  name       VARCHAR(20)   NOT NULL,
  lat        NUMERIC(10,7),
  lng        NUMERIC(10,7),
  updated_at TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  PRIMARY KEY (room_id, name)
);

CREATE TABLE IF NOT EXISTS messages (
  id         SERIAL PRIMARY KEY,
  room_id    VARCHAR(6)   NOT NULL,
  name       VARCHAR(20)  NOT NULL,
  content    TEXT         NOT NULL,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS signals (
  id         SERIAL PRIMARY KEY,
  room_id    VARCHAR(6)   NOT NULL,
  from_name  VARCHAR(20)  NOT NULL,
  to_name    VARCHAR(20)  NOT NULL,
  data       TEXT         NOT NULL,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS destination (
  room_id    VARCHAR(6)    NOT NULL PRIMARY KEY,
  lat        NUMERIC(10,7) NOT NULL,
  lng        NUMERIC(10,7) NOT NULL,
  label      VARCHAR(100)  NOT NULL DEFAULT '目的地',
  updated_at TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS avatars (
  name       VARCHAR(20)  NOT NULL PRIMARY KEY,
  data       TEXT         NOT NULL,
  updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
