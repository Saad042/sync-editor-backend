const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { WebSocket } = require('ws');
const wss = require('../ws');
const Doc = require('../models/doc');

exports.doc_list = asyncHandler(async (req, res) => {
  const allDocs = await Doc.find().sort().exec();
  res.json(allDocs);
});

exports.doc_validator = [
  body('mood').trim().notEmpty().withMessage('This field is required').escape(),
  body('dialogue')
    .trim()
    .notEmpty()
    .withMessage('This field is required')
    .escape(),
];

exports.doc_create = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    res.json(errors);
  } else {
    const { mood, dialogue } = req.body;
    const doc = new Doc({
      mood,
      dialogue,
    });

    await doc.save();
    res.status(201);
    res.json(doc);
  }
});

exports.doc_detail = asyncHandler(async (req, res, next) => {
  const doc = await Doc.findById(req.params.id).exec();

  if (doc === null) {
    const err = new Error('Doc not found');
    err.status = 404;
    return next(err);
  }

  res.json(doc);
});

exports.doc_update = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    res.json(errors);
  } else {
    const { mood, dialogue } = req.body;
    const id = req.params.id;
    const doc = new Doc({
      _id: id,
      mood,
      dialogue,
    });

    const updatedDoc = await Doc.findByIdAndUpdate(id, doc, {
      returnDocument: 'after',
    });

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(updatedDoc));
      }
    });

    res.json(updatedDoc);
  }
});

exports.doc_delete_post = asyncHandler(async (req, res, next) => {
  const doc = await Doc.findById(req.params.id).exec();

  if (doc === null) {
    const err = new Error('Doc not found');
    err.status = 404;
    return next(err);
  }
  await Doc.findByIdAndDelete(req.params.id).exec();
  res.status(200).json();
});
