const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}
async function comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Internet_store'
};

async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Подключено к базе данных MySQL');
        return connection;
    } catch (error) {
        console.error('Ошибка подключения к базе данных:', error);
        throw error;
    }
}

app.post('/register', async (req, res) => {
    const { username, phone, email, password } = req.body;

    if (!username || !phone || !email || !password) {
        return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
    }

    let connection;
    try {
        connection = await connectToDatabase();
        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length > 0) {
            return res.status(409).json({ message: 'Пользователь с таким email уже существует' });
        }

        const hashedPassword = await hashPassword(password);
        console.log('Hashed Password:', hashedPassword); 

        const insertUserQuery = 'INSERT INTO users (username, email, password, phone) VALUES (?, ?, ?, ?)';
        await connection.execute(insertUserQuery, [username, email, hashedPassword, phone]);
        res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        res.status(500).json({ message: 'Ошибка сервера. Попробуйте позже.', error: error.message });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});




app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Введите email и пароль' });
    }

    let connection;
    try {
        connection = await connectToDatabase();
        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Неверный email или пароль' });
        }

        const user = rows[0];
        const passwordMatch = await comparePassword(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Неверный email или пароль' });
        }

        // Возвращаем информацию о пользователе
        res.status(200).json({
            message: 'Авторизация успешна',
            user: {
                id: user.id,
                name: user.username,
                email: user.email,
                phone: user.phone,
            }
        });
    } catch (error) {
        console.error('Ошибка при авторизации:', error);
        res.status(500).json({ message: 'Ошибка сервера. Попробуйте позже.' });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});





app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});

