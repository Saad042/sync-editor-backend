const doc_handler = require('../handlers/docHandler');

exports.doc_list = doc_handler.doc_list;

exports.doc_create = [doc_handler.doc_validator, doc_handler.doc_create];

exports.doc_detail = doc_handler.doc_detail;

exports.doc_update = [doc_handler.doc_validator, doc_handler.doc_update];

exports.doc_delete = doc_handler.doc_delete_post;
