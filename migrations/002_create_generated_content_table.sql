DROP TABLE IF EXISTS generated_content;

CREATE TABLE generated_content (
    id SERIAL PRIMARY KEY,
    key UUID NOT NULL UNIQUE,
    hero TEXT NOT NULL,
    description TEXT NOT NULL,
    cta TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);