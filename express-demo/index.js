const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'Course 1' },
    { id: 2, name: 'Course 2' },
    { id: 3, name: 'Course 3' },
];

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    var course = courses.find(c => c.id === +req.params.id);
    if (!course)
        return res.status(404).send('The course with the given ID was not fund');
    
    const { error } = validateCourse(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    course.name = req.body.name;
    res.send(course); 
});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

app.delete('/api/courses/:id', (req, res) => {
    var course = courses.find(c => c.id === +req.params.id);
    if (!course)
        return res.status(404).send('The course with the given ID was not fund');
    
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    
    res.send(course); 
});

app.get('/api/courses/:id', (req, res) => {
    var course = courses.find(c => c.id === +req.params.id);
    if (!course)
        return res.status(404).send('The course with the given ID was not fund');
    
    res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});


const port = process.env.PORT || 8585;

app.listen(port, () => console.log(`Listenning on port ${port}`));