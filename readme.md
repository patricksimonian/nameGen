Word Gen
========
---
* ###version: 1.0
* ###created: July 10th 2017
* ###author: Patrick Simonian
* ###abstract: This small node program will generate a line-break spaced list of words generated from a seeded list of words and delimeters between the words. 

---
##To Use

Pass in your desired args into constructor and run program
with ***node name_gen.js***

Example:
 -seedlist: ["bio", "luma", "life", "sense", "essence"];
 -delimiterlist: [{delim: "", odds: 4}, {delim: " ", odds: 2}];
 -result: 
lumaessence 
essencebio
sense essence 
lumabio
senseluma
bioluma
bio luma
senselife 
bioessence
bioluma
lifeluma 
bio essence
life bio
biosense 
lifeluma
senseluma 
sense essence
essence life
essence luma
lumalife
lifeessence
bio life
lifesense



