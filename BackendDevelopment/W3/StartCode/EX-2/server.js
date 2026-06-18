// server.js
import express from 'express';
import courses from './course.js';
const app = express();
const PORT = 3000;

// Middleware: parse URL encoded form data and log requests
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
});

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;

    const filteredCourses = courses.filter((course) => {
        if (course.department.toLowerCase() !== dept.toLowerCase()) {
            return false;
        }
        if (level && course.level.toLowerCase() !== level.toLowerCase()) {
            return false;
        }
        if (semester && course.semester.toLowerCase() !== semester.toLowerCase()) {
            return false;
        }
        if (minCredits && Number(course.credits) < Number(minCredits)) {
            return false;
        }
        if (maxCredits && Number(course.credits) > Number(maxCredits)) {
            return false;
        }
        if (instructor && !course.instructor.toLowerCase().includes(instructor.toLowerCase())) {
            return false;
        }
        return true;
    });

    res.json(filteredCourses);
});

app.post('/departments/:dept/courses', (req, res) => {
    const { dept } = req.params;
    const { id, title, level, credits, instructor, semester } = req.body;

    if (!id || !title || !level || !credits || !instructor || !semester) {
        return res.status(400).json({ error: 'Please provide id, title, level, credits, instructor, and semester.' });
    }

    const newCourse = {
        id,
        title,
        department: dept,
        level,
        credits: Number(credits),
        instructor,
        semester,
    };

    courses.push(newCourse);
    res.status(201).json(newCourse);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
