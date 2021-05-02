const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('../config.js');
const dbUrl = process.env.dbUrl || config.dbUrl || 'mongodb://localhost/courseContent';
const dbName = process.env.dbName || config.dbName;

mongoose.connect(dbUrl, {dbName: dbName});

const elementSchema = mongoose.Schema({
  _id: Number,
  kind: String,
  title: String,
  sectionSequence: Number,
  videoUrl: String,
  videoPreview: Boolean,
  thumbnailUrl: String,
  summary: String,
  elementLength: Date,
  numQuestions: Number
}, {versionKey: false});

const sectionSchema = mongoose.Schema({
  _id: Number,
  title: String,
  sectionLength: Date,
  lectures: Number,
  exercises: Number,
  quizzes: Number,
  articles: Number,
  courseSequence: Number,
  elements: [elementSchema]
}, { versionKey: false });

const courseSchema = mongoose.Schema({
  _id: Number,
  title: String,
  totalSections: Number,
  totalLectures: Number,
  totalExercises: Number,
  totalArticles: Number,
  totalQuizzes: Number,
  courseLength: Date,
  updatedAt: Date,
  sections: [sectionSchema]
}, { versionKey: false });

const Course = mongoose.model('Course', courseSchema);

module.exports.findCourse = async id => {
  id = Number(id);

  return await Course.find({courseId: id}).exec();
<<<<<<< HEAD

};

module.exports.findSection = async id => {

  return await Course.aggregate()
    .unwind('sections')
    .match({ 'sections.sectionId': id })
    .exec();

};

module.exports.findElement = async id => {

  return await Course.aggregate()
    .match({'sections.elements.elementId': id})
    .unwind('sections')
    .unwind('sections.elements')
    .match({ 'sections.elements.elementId': id })
    .exec();

=======
>>>>>>> e9a95d4e26a6fb584e9f13c855eb2382ffe40c2c
};