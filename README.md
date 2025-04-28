
  <img src="https://github.com/M0RTUM/travas/blob/master/images/Travas.png?raw=true">

![](https://img.shields.io/github/stars/M0RTUM/travas) ![](https://img.shields.io/github/last-commit/M0RTUM/travas)

Travas
===

Implementation of a simple website for storing documents such as: air tickets, train tickets, hotel reservations, excursion entries. The project was created as part of the "PROD" Olympiad in industrial programming. There is integration with AI to obtain information about attractions in the city being visited, and a simple authentication system based on query parameters has been implemented.

Installation
===
```
git clone https://github.com/M0RTUM/travas.git 
cd travas\prod
pip install -r requirements.txt
cd front
npm install
```

You also need to create a **front\src\private.js** file with the following content:

####Javascript　
```javascript
export const teamMembers = [
  {
    name: 'NAME',
    description: 'DESCRIPTION',
    image: 'PATH TO IMAGE',
  },
];

export const teamContacts = [
  { name: 'NAME', telegram: '@ACCOUNT' }, //telegram account
];

export const faqs = [
  {
    question: 'QUESTION',
    answer: 'ANSWER'
  },
];

```
Run
===
```
python app.py
cd front
npm run dev
```

TODO
===
- [ ] Expand the statistics section
- [ ] Implement mailing list
- [ ] Fix a bug with duplicate results in input forms
- [ ] Fix the architecture
    - [ ] Remove unused files and dependencies
    - [ ] Make the code clearer and simpler
    - [ ] Add user input validation
