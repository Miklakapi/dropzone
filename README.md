# dropzone

![license](https://img.shields.io/badge/license-MIT-blue)
![linux](https://img.shields.io/badge/os-Linux-green)
![language](https://img.shields.io/badge/language-JavaScript-yellow)
![language](https://img.shields.io/badge/language-jQuery-informational)
![version](https://img.shields.io/badge/version-1.0.0-success)
![status](https://img.shields.io/badge/status-production-green)

A simple module for creating a dropzone that does not send Ajax data, but stores it in an input.

## Table of Contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)

## General info
A simple module written in Jquery. Makes it easier to create a dropzone. It is based on transferring files to input and not sending them immediately with Ajax. Provides the ability to manipulate the content of input: Adding and Removing selected files. With it, you can hide the input and style the given HTML element to be a dropzone.

<p align="center" width="100%">
    <img width="75%" src="https://github.com/Miklakapi/dropzone/blob/master/README_IMAGES/Dropzone.png"> 
</p>

## Technologies
Project is created with:

* JavaScript
* JQuery 3.6.0

## Setup
Initialize dropzone:
```js
import { initDropzones } from './dropzone.js';

// dropzone - The class of the dropzone
// fileLimit - File limit (-1 = no limit)
initDropzones('dropzone', fileLimit);
```
An example template:
```html
<!-- 
    data-target - Input id
    "dropzone-on" (constant name)- Information that input uses a dropzone
    "dropzone" - The class that is passed to the js function
    "placeholder" (constant name) - The object that holds the temporary dropzone content
 -->
<input multiple type="file" id="main-files" class="dropzone-on">
<div class="dropzone" data-target="main-files">
    <div class="placeholder">Drag and Drop</div>
</div>
```

## Features
- Assign new files to input by dragging and dropping or using a file explorer window.
- Show files as html objects.
- Display of file name and size.
- Limiting the number of files.
- Delete files by clicking on it.
- Adding multiple independent dropzones.

## Status
The project's development has been completed.
