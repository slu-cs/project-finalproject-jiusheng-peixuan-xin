// Script for setting up a database.
const mongoose = require('mongoose');
const connect = require('./db');
const Course = require('./models/course');
const Section = require('./models/section');

// Connect to the database
connect();

// Model a collection of courses
const courses = [
  new Course({_id: 'CS140', title: 'Introduction to Computer Programming', description: 'An introduction to programming using a high-level language. Assumes no prior knowledge of programming, and focuses on essential skills. Students learn to create programs ranging from practical utilities to simple games.'}),
  new Course({_id: 'CS219', title: 'Techniques of Computer Science', prereqs: ['CS140'], description: 'A thorough grounding in a high-level programming language. Topics include object-oriented programming, inheritance, arrays, and recursion.',}),
  new Course({_id: 'CS220', title: 'Computer Organization', prereqs: ['CS219'], description: 'An in-depth look at the underlying organization and architecture of modern computer systems. Topics include data representation, the organization of CPUs including caches and the memory hierarchy, digital circuits, machine language, and an introduction to assembly language programming.'}),
  new Course({_id: 'CS256', title: 'Data Structures', prereqs: ['CS219'], description: 'An overview of the essential strategies for the organization, retrieval and processing of data. Topics include arrays, lists, stacks, queues, maps, and trees, as well as an introduction to algorithm analysis.'}),
  new Course({_id: 'CS362', title: 'Algorithm Analysis', prereqs: ['CS256'], description: 'An investigation of core techniques for designing and analyzing algorithms for computational problem-solving. Introduces well-known algorithms for common types of problems, and teaches students to evaluate algorithm efficiency.'}),
  new Course({_id: 'CS364', title: 'Programming Languages', prereqs: ['CS220', 'CS256'], description: 'Addresses several advanced topics in programming: the process of code interpretation, the principles behind the design of programming languages, and the paradigms of functional and concurrent programming.'})
];

// Model a collection of sections
const sections = [
  new Section({course: 'CS140', day: 'M/W', time: '8:50 AM', instructor: 'Shafique Chaudhry'}),
  new Section({course: 'CS140', day: 'T/Th', time: '8:30 AM', instructor: 'Lisa Torrey'}),
  new Section({course: 'CS140', day: 'T/Th', time: '12:40 PM', instructor: 'Lisa Torrey'}),
  new Section({course: 'CS219', day: 'T/Th', time: '10:10 AM', instructor: 'Choong-Soo Lee'}),
  new Section({course: 'CS219', day: 'T/Th', time: '2:20 PM', instructor: 'Choong-Soo Lee'}),
  new Section({course: 'CS220', day: 'M/W', time: '2:30 PM', instructor: 'Ed Harcourt'}),
  new Section({course: 'CS364', day: 'M/W', time: '10:30 AM', instructor: 'Ed Harcourt'})
];

// Reset the database
mongoose.connection.dropDatabase()
  .then(() => Promise.all(courses.map(course => course.save())))
  .then(() => Promise.all(sections.map(section => section.save())))
  .then(() => mongoose.connection.close())
  .then(() => console.log('Database is ready.'))
  .catch(error => console.error(error.stack));
