DROP TABLE IF EXISTS testimonials;

CREATE TABLE testimonials (
    id SERIAL PRIMARY KEY,
    content_key UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    jobtitle VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (content_key) REFERENCES generated_content(key)
);