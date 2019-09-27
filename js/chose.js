var data1 = [
  {
    text: 'Level k (没有学习过英语)',
    value: 0
  }, {
    text: 'Level 1 (学习过 1 年英语）',
    value: 1
  },
  {
    text: 'Level 2 (学习过 2 年英语）',
    value: 2
  },
  {
    text: 'Level 3 (学习过 3 年英语）',
    value: 3
  },
  {
    text: 'Level 4 (学习过 4 年英语）',
    value: 4
  },
  {
    text: 'Level 5 (学习过 5 年英语）',
    value: 5
  },
  {
    text: 'Level 6 (学习过 6 年英语）',
    value: 6
  },
];




var picker1El = document.getElementById('picker1');
var select = document.getElementById('select');
var picker1 = new Picker({
  data: [data1]
});

picker1.on('picker.select', function (selectedVal, selectedIndex) {
  select.innerText = data1[selectedIndex[0]].text;
  select.classList.remove('color-c');
});

picker1.on('picker.change', function (index, selectedIndex) {
  console.log(index);
});

picker1.on('picker.valuechange', function (selectedVal, selectedIndex) {
  grade = String(selectedVal[0])
  console.log(selectedVal);
});



picker1El.addEventListener('click', function () {
  picker1.show();
});