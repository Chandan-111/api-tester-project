-- Create tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    total NUMERIC(10, 2) NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    department TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    year INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    grade TEXT,
    major TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Turn on Realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE users;
ALTER PUBLICATION supabase_realtime ADD TABLE products;
ALTER PUBLICATION supabase_realtime ADD TABLE orders;
ALTER PUBLICATION supabase_realtime ADD TABLE employees;
ALTER PUBLICATION supabase_realtime ADD TABLE books;
ALTER PUBLICATION supabase_realtime ADD TABLE students;
ALTER PUBLICATION supabase_realtime ADD TABLE tasks;

-- Insert sample data for users
INSERT INTO users (name, email) VALUES
('John Doe', 'john.doe@example.com'),
('Jane Smith', 'jane.smith@example.com'),
('Alice Johnson', 'alice.j@example.com'),
('Bob Brown', 'bob.b@example.com'),
('Charlie Davis', 'charlie.d@example.com'),
('Diana Evans', 'diana.e@example.com'),
('Ethan Foster', 'ethan.f@example.com'),
('Fiona Green', 'fiona.g@example.com'),
('George Harris', 'george.h@example.com'),
('Hannah Adams', 'hannah.a@example.com'),
('Ian Clark', 'ian.c@example.com'),
('Julia Lewis', 'julia.l@example.com'),
('Kevin Walker', 'kevin.w@example.com'),
('Laura Hall', 'laura.h@example.com'),
('Michael Young', 'michael.y@example.com');

-- Insert sample data for products
INSERT INTO products (name, price, description) VALUES
('Laptop Pro', 1299.99, 'High performance laptop'),
('Wireless Mouse', 49.99, 'Ergonomic wireless mouse'),
('Mechanical Keyboard', 89.99, 'RGB mechanical keyboard'),
('HD Monitor', 199.99, '27 inch 1080p monitor'),
('USB-C Hub', 29.99, '7-in-1 port expansion'),
('Smartphone', 799.99, 'Latest model smartphone'),
('Bluetooth Headphones', 149.99, 'Noise-cancelling headphones'),
('Tablet', 349.99, '10-inch screen tablet'),
('Webcam', 59.99, '1080p HD webcam'),
('External Hard Drive', 119.99, '2TB portable storage'),
('Gaming Chair', 199.99, 'Ergonomic gaming chair'),
('Smartwatch', 249.99, 'Fitness tracking watch'),
('Portable Charger', 39.99, '10000mAh power bank'),
('Desk Lamp', 24.99, 'LED desk lamp with USB port'),
('Backpack', 45.00, 'Water-resistant laptop backpack');

-- Insert sample data for orders (Linking to users)
INSERT INTO orders (user_id, total, status) VALUES
(1, 1349.98, 'completed'),
(2, 89.99, 'pending'),
(3, 199.99, 'shipped'),
(4, 349.99, 'completed'),
(5, 799.99, 'processing'),
(6, 149.99, 'shipped'),
(7, 29.99, 'completed'),
(8, 1299.99, 'pending'),
(9, 45.00, 'completed'),
(10, 59.99, 'shipped'),
(11, 249.99, 'processing'),
(12, 119.99, 'completed'),
(13, 24.99, 'pending'),
(14, 199.99, 'shipped'),
(15, 39.99, 'completed');

-- Insert sample data for employees
INSERT INTO employees (name, position, department) VALUES
('Sarah Palmer', 'Software Engineer', 'Engineering'),
('Tom Cruise', 'Sales Manager', 'Sales'),
('Emily Blunt', 'HR Specialist', 'Human Resources'),
('Chris Evans', 'Marketing Director', 'Marketing'),
('Natalie Portman', 'Data Analyst', 'Data Science'),
('Mark Ruffalo', 'Backend Developer', 'Engineering'),
('Scarlett Johansson', 'Product Manager', 'Product'),
('Jeremy Renner', 'QA Tester', 'Engineering'),
('Elizabeth Olsen', 'UX Designer', 'Design'),
('Paul Rudd', 'Customer Support', 'Support'),
('Brie Larson', 'Frontend Developer', 'Engineering'),
('Chadwick Boseman', 'Operations Manager', 'Operations'),
('Danai Gurira', 'Security Analyst', 'IT'),
('Tom Holland', 'Intern', 'Engineering'),
('Zendaya Coleman', 'Social Media Lead', 'Marketing');

-- Insert sample data for books
INSERT INTO books (title, author, year) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 1925),
('To Kill a Mockingbird', 'Harper Lee', 1960),
('1984', 'George Orwell', 1949),
('Pride and Prejudice', 'Jane Austen', 1813),
('The Catcher in the Rye', 'J.D. Salinger', 1951),
('The Hobbit', 'J.R.R. Tolkien', 1937),
('Fahrenheit 451', 'Ray Bradbury', 1953),
('Moby-Dick', 'Herman Melville', 1851),
('War and Peace', 'Leo Tolstoy', 1869),
('The Odyssey', 'Homer', -800),
('Jane Eyre', 'Charlotte Brontë', 1847),
('Brave New World', 'Aldous Huxley', 1932),
('The Lord of the Rings', 'J.R.R. Tolkien', 1954),
('Crime and Punishment', 'Fyodor Dostoevsky', 1866),
('The Alchemist', 'Paulo Coelho', 1988);

-- Insert sample data for students
INSERT INTO students (name, grade, major) VALUES
('Adam Sand', 'A', 'Computer Science'),
('Betty White', 'B+', 'Biology'),
('Carl Sagan', 'A-', 'Physics'),
('Doris Day', 'B', 'English Literature'),
('Edgar Poe', 'C+', 'Creative Writing'),
('Frida Kahlo', 'A', 'Art History'),
('Galileo Galilei', 'A+', 'Astronomy'),
('Helen Keller', 'A-', 'Sociology'),
('Isaac Newton', 'A', 'Mathematics'),
('Joan Arc', 'B+', 'History'),
('Karl Marx', 'B', 'Economics'),
('Lucy Ball', 'A-', 'Theater'),
('Marie Curie', 'A+', 'Chemistry'),
('Nikola Tesla', 'A', 'Electrical Engineering'),
('Oprah Winfrey', 'A', 'Communications');

-- Insert sample data for tasks
INSERT INTO tasks (title, completed) VALUES
('Finish project proposal', true),
('Buy groceries', false),
('Call mom', true),
('Schedule dentist appointment', false),
('Pay electricity bill', true),
('Read chapter 5', false),
('Update resume', false),
('Clean the garage', true),
('Reply to emails', false),
('Walk the dog', true),
('Plan weekend trip', false),
('Fix leaky faucet', true),
('Prepare presentation', false),
('Go for a run', true),
('Mow the lawn', false);
