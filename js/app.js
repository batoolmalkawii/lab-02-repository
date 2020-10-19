'use strict';

function Horns(horns) {
  this.image = horns.image_url;
  this.title = horns.title;
  this.description = horns.description;
  this.keyword = horns.keyword;
  this.horns = horns.horns;
}

Horns.prototype.render = function () {
  let newOption = $('<option></option>').text(this.keyword);
  $('select').append(newOption);
  let hornsClone = $('#photo-template').clone();
  hornsClone.find('h2').text(this.title);
  hornsClone.find('img').attr('src', this.image);
  hornsClone.find('p').text(this.description);
  hornsClone.attr('class', this.keyword);
  hornsClone.attr('id', this.keyword);
  $('main').append(hornsClone);
};

const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};

$.ajax('data/page-1.json', ajaxSettings).then((data) => {
  data.forEach(hornsObj => {
    let horns = new Horns(hornsObj);
    horns.render();
  });
});

$(document).ready(function(){
  $('select').on('change', function(){
    let selected = this.value;
    $('section').hide();
    $(`.${selected}`).show();
  });
});

