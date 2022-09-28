# Visitor Tracker

## Pre History
Due to **GDPR** being a thing, and **Google Analytics** No longer being GDPR compliant, we have to look for something else.
What Google Analytics did wrong, were the amount of personal information they store, which in return let them to be banned in multiple EU Countries.

## Description
So what this Component does, are simply storing 3 things about the user.
  1. What project the user visited (Need to change the name within the object)
  2. Country the user visited from.
  3. When a new entry within the database were created. 

It also utilise localstorage, which main purpose are to see if you already visited the page or if it is the first time.
First time, then key **hasVisited** are set to *yes* and entry will be recorded in the table.
If not the first time, then nothing will happen.
  - This to make sure we get unique hits.

### Note: Unique visitors and ways to bypass it.
Users CAN visit from incognito mode, or simply clear localstorage from their developer tool (f12).
This will make them into another unique user, and create another entry.
  - But it is highly unlikely that someone will do such a thing.

### Access key
Another thing that may fail, are the access key.
Should not fail if set up correctly, within the project.
Otherwise just add it as you would in a axios request.

### Axios call.
The way it is written, can differ from project to project.
Look into your projects method of axios, and just fix it accordingly.

## Imlpementation
Simply copy this folder into component folder of your project.
Rename the project, in data to the project you copied it into.
Then just import it into **App.vue** and let it run its course.